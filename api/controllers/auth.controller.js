import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const registerUser = async (req, res, role) => {
//     console.log(req.body);
//     console.log("registerUser called with role:", role);
//     const { name, email, password, phone, address, profilePicture, emergencyContact, dateOfBirth, gender, insuranceDetails } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         //const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({ 
//             name, email, role, password, phone, address, 
//             profilePicture, emergencyContact, dateOfBirth, gender, insuranceDetails
//         });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         console.log("User created:", user);
//         res.status(201).json({ user, token });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// export const patientRegister = (req, res) => registerUser(req, res, 'patient');
// export const doctorRegister = (req, res) => registerUser(req, res, 'doctor');
// export const adminRegister = (req, res) => registerUser(req, res, 'admin');

const registerUser = async (req, res, role) => {
    console.log("Registration request for role:", role);
    
    try {
        // First check if user exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Validate required fields for doctor registration
        if (role === 'doctor') {
            const requiredFields = [
                'name', 
                'email', 
                'password',
                'phone',
                'dateOfBirth',
                'gender',
                'specialization',
                'experience',
                'license',
                'consultationFee'
            ];

            const missingFields = requiredFields.filter(field => !req.body[field]);
            if (missingFields.length > 0) {
                return res.status(400).json({
                    message: 'Missing required fields',
                    fields: missingFields
                });
            }

            // Validate license object structure
            if (!req.body.license?.number || !req.body.license?.expiryDate) {
                return res.status(400).json({
                    message: 'Invalid license information. Number and expiry date are required.'
                });
            }

            // Validate education array
            if (!Array.isArray(req.body.education) || req.body.education.length === 0) {
                return res.status(400).json({
                    message: 'At least one education entry is required'
                });
            }

            // Validate each education entry
            const invalidEducation = req.body.education.some(edu => 
                !edu.degree || !edu.institution || !edu.year
            );
            if (invalidEducation) {
                return res.status(400).json({
                    message: 'Each education entry must include degree, institution, and year'
                });
            }
        }

        // Create base user data object
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: role,
            phone: req.body.phone,
            dateOfBirth: new Date(req.body.dateOfBirth),
            gender: req.body.gender,
            address: req.body.address || {},
            profilePicture: req.body.profilePicture || '',
            emergencyContact: req.body.emergencyContact || {},
            status: req.body.status || 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Add doctor-specific fields
        if (role === 'doctor') {
            Object.assign(userData, {
                specialization: req.body.specialization,
                experience: Number(req.body.experience),
                license: {
                    number: req.body.license.number,
                    expiryDate: new Date(req.body.license.expiryDate),
                    verificationStatus: req.body.license.verificationStatus || 'pending'
                },
                consultationFee: Number(req.body.consultationFee),
                education: req.body.education.map(edu => ({
                    degree: edu.degree,
                    institution: edu.institution,
                    year: Number(edu.year)
                })),
                ratings: [],
                averageRating: 0
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        userData.password = hashedPassword;

        // Create new user
        const user = await User.create(userData);

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Remove sensitive information before sending response
        const userResponse = user.toObject();
        delete userResponse.password;

        console.log("Doctor created successfully:", {
            id: user._id,
            name: user.name,
            email: user.email
        });

        res.status(201).json({
            message: 'Registration successful',
            user: userResponse,
            token
        });

    } catch (error) {
        console.error("Registration error:", error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Registration APIs
export const patientRegister = (req, res) => registerUser(req, res, 'patient');
export const doctorRegister = (req, res) => registerUser(req, res, 'doctor');
export const adminRegister = (req, res) => registerUser(req, res, 'admin');


const loginUser = async (req, res, role) => {
    const { email, password } = req.body;
    console.log(password);

    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== role) {
            return res.status(403).json({ message: 'Invalid role for this login' });
        }

        // Ensure both password and stored hash are strings
        const plainTextPassword = String(password).trim();
        const storedHash = String(user.password);

        console.log("Debug password info:", {
            inputPassword: plainTextPassword,
            storedHash: storedHash
        });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ 
                message: 'Invalid credentials',
                debug: process.env.NODE_ENV === 'development' ? {
                    passwordLength: plainTextPassword.length,
                    hashLength: storedHash.length
                } : undefined
            });
        }


        // if (password !== user.password) {
        //     return res.status(400).json({ message: 'Invalid credentials' });
        // }

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
        console.error("Login error:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const patientLogin = async (req, res) => {
    await loginUser(req, res, 'patient');
};

export const doctorLogin = async (req, res) => {
    await loginUser(req, res, 'doctor');
};

export const adminLogin = async (req, res) => {
    await loginUser(req, res, 'admin');
};

export const showDoctors = async (req, res) => {
    try {
        const users = await User.find({role:'doctor'});
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const showPatients = async (req, res) => {
    try {
        const users = await User.find({role:'patient'});
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

