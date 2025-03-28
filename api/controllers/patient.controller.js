import Application from '../models/application.model.js';
import Patient from '../models/user.model.js';

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({role: 'patient'});
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getPatientByApplicationId = async (req, res) => {
    try {
        const application = await Application.findOne({_id: req.params.id}).populate('patientId');
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

