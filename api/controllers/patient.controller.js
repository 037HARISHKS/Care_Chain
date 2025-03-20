import Patient from '../models/user.model.js';

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({role: 'patient'});
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}