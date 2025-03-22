import User from '../models/user.model.js';

export const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
}

export const updateDoctor = async (req, res) => {
    console.log("req.body Entering", req.body);
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Remove password from update data if it exists
        if (updateData.password) {
            delete updateData.password;
        }

        const updatedDoctor = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({
            message: 'Doctor updated successfully',
            doctor: updatedDoctor
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating doctor',
            error: error.message 
        });
    }
}