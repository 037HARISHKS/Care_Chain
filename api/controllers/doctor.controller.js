import User from '../models/user.model.js';

export const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
}