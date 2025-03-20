import Application from '../models/application.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

// Create new appointment application
export const createAppointment = async (req, res) => {
    try {
        const {
            doctorId,
            problem,
            symptoms,
            medicalHistory,
            preferredDate,
            preferredTime,
            priority,
            notes,
            attachments
        } = req.body;

        // Validate doctor exists
        const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Create appointment application
        const appointment = await Application.create({
            patientId: req.user.id, // From auth middleware
            doctorId,
            problem,
            symptoms: Array.isArray(symptoms) ? symptoms : [symptoms],
            medicalHistory,
            preferredDate: new Date(preferredDate),
            preferredTime,
            priority: priority || 'medium',
            notes,
            attachments: attachments || [],
            notifications: [{
                type: 'submitted',
                message: 'Application submitted successfully'
            }]
        });

        res.status(201).json({
            message: 'Appointment application created successfully',
            appointment
        });

    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({
            message: 'Error creating appointment',
            error: error.message
        });
    }
};

// Get all appointments (with filtering)
export const getAppointments = async (req, res) => {
    try {
        const {
            status,
            priority,
            startDate,
            endDate,
            page = 1,
            limit = 10
        } = req.query;

        // Build query
        const query = {};
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (startDate || endDate) {
            query.preferredDate = {};
            if (startDate) query.preferredDate.$gte = new Date(startDate);
            if (endDate) query.preferredDate.$lte = new Date(endDate);
        }

        // Execute query with pagination
        const appointments = await Application.find(query)
            .populate('patientId', 'name email')
            .populate('doctorId', 'name specialization')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        // Get total count
        const total = await Application.countDocuments(query);

        res.status(200).json({
            appointments,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page: parseInt(page),
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching appointments',
            error: error.message
        });
    }
};

// Get specific appointment by ID
export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Application.findById(req.params.id)
            .populate('patientId', 'name email phone')
            .populate('doctorId', 'name specialization consultationFee')
            .populate('reviewedBy', 'name');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(appointment);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching appointment',
            error: error.message
        });
    }
};

// Update appointment
export const updateAppointment = async (req, res) => {
    try {
        const appointment = await Application.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if appointment can be updated
        if (appointment.status !== 'pending') {
            return res.status(400).json({
                message: 'Cannot update appointment that is not pending'
            });
        }

        // Update fields
        const updatedAppointment = await Application.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updatedAt: Date.now()
            },
            { new: true }
        );

        res.status(200).json(updatedAppointment);

    } catch (error) {
        res.status(500).json({
            message: 'Error updating appointment',
            error: error.message
        });
    }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Application.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Only allow deletion of pending appointments
        if (appointment.status !== 'pending') {
            return res.status(400).json({
                message: 'Cannot delete appointment that is not pending'
            });
        }

        await appointment.remove();
        res.status(200).json({ message: 'Appointment deleted successfully' });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting appointment',
            error: error.message
        });
    }
};

// Get doctor's appointments
export const getAppointmentsByDoctor = async (req, res) => {
    try {
        const { status, date } = req.query;
        const query = { doctorId: req.user.id };

        if (status) query.status = status;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.preferredDate = { $gte: startDate, $lt: endDate };
        }

        const appointments = await Application.find(query)
            .populate('patientId', 'name email phone')
            .sort({ preferredDate: 1, preferredTime: 1 });

        res.status(200).json(appointments);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching doctor appointments',
            error: error.message
        });
    }
};

// Get patient's appointment history
export const getPatientHistory = async (req, res) => {
    try {
        const appointments = await Application.find({ patientId: req.user.id })
            .populate('doctorId', 'name specialization')
            .sort({ createdAt: -1 });

        res.status(200).json(appointments);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching patient history',
            error: error.message
        });
    }
};

// Approve appointment
export const approveAppointment = async (req, res) => {
    try {
        const appointment = await Application.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.doctorId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await appointment.approve(req.user.id);
        
        res.status(200).json({
            message: 'Appointment approved successfully',
            appointment
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error approving appointment',
            error: error.message
        });
    }
};

// Reject appointment
export const rejectAppointment = async (req, res) => {
    try {
        const { reason } = req.body;
        if (!reason) {
            return res.status(400).json({ message: 'Rejection reason is required' });
        }

        const appointment = await Application.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.doctorId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await appointment.reject(req.user.id, reason);
        
        res.status(200).json({
            message: 'Appointment rejected successfully',
            appointment
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error rejecting appointment',
            error: error.message
        });
    }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Application.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if user is authorized to cancel
        if (appointment.patientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Check if appointment can be cancelled
        if (!appointment.canBeCancelled()) {
            return res.status(400).json({
                message: 'Appointment cannot be cancelled'
            });
        }

        appointment.status = 'cancelled';
        appointment.notifications.push({
            type: 'cancelled',
            message: 'Appointment cancelled by patient'
        });
        await appointment.save();

        res.status(200).json({
            message: 'Appointment cancelled successfully',
            appointment
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error cancelling appointment',
            error: error.message
        });
    }
};

// Get doctor's schedule
export const getDoctorSchedule = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const query = {
            doctorId: req.user.id,
            status: { $in: ['approved', 'pending'] }
        };

        if (startDate && endDate) {
            query.preferredDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const schedule = await Application.find(query)
            .select('preferredDate preferredTime status patientId')
            .populate('patientId', 'name')
            .sort({ preferredDate: 1, preferredTime: 1 });

        res.status(200).json(schedule);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching doctor schedule',
            error: error.message
        });
    }
};
