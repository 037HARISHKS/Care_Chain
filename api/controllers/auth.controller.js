import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res, role) => {
    console.log(req.body);
    const { name, email, password, phone, address, profilePicture, emergencyContact, dateOfBirth, gender, insuranceDetails } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ 
            name, email, role, password: hashedPassword, phone, address, 
            profilePicture, emergencyContact, dateOfBirth, gender, insuranceDetails
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const patientRegister = (req, res) => registerUser(req, res, 'patient');
export const doctorRegister = (req, res) => registerUser(req, res, 'doctor');
export const adminRegister = (req, res) => registerUser(req, res, 'admin');

const loginUser = async (req, res, role) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture
            }, 
            token 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const patientLogin = async(req, res) =>
{
    console.log("HI:",req.body);
    loginUser(req, res, 'patient');
}
export const doctorLogin = (req, res) => loginUser(req, res, 'doctor');
export const adminLogin = (req, res) => loginUser(req, res, 'admin');


export const showUsers = async (req, res) => {
    try {
        const users = await User.find({role:'doctor'});
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
