import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import cookie from 'cookie-parser'

export const register = async (req, res) => {
    try {
        const { fullname, phone, role, email, password } = req.body;
        // console.log("user:", req.body)
        if (!fullname || !phone || !role || !email || !password) {
            return res.status(400).json({
                message: "something is missing",
                succes: false
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist",
                succes: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            role,
            password: hashPassword,
            phone
        })
        return res.status(201).json({ message: 'Acoount created successfully' });
    } catch (error) {
        console.log('Registration error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
export const home = async (req, res) => {
    try {

        return res.json({ message: "hello 👋👋❤️" })
    } catch (error) {
        console.log(error)
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is Missing",
                succes: false
            })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "user not exist or invalid email or password",
                succes: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "invalid email or password",
                succes: false
            })
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: "user not exist with current role",
                succes: false
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRETE_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullname: user.fullname,
            phone: user.phone,
            password: user.password,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, samesite: 'strict' }).json({
            message: `welcome back ${user.fullname}`,
            succes: true,
            user
        })

    } catch (error) {
        console.error('login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const logOut = async (req, res) => {
    try {
        return res.cookie('token', " ", { maxAge: 0 }).json({
            message: "Logout Succesfully",
            succes: true
        })

    } catch (error) {
        return res.status(400).json({
            message: "Error in logout",
            succes: false
        })
    }
}