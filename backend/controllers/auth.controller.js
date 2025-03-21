import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const singUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(name, email, password);
        if (!name || !email || !password)
            return res.status(400).json({ error: "Fields can not be empty" });
        if (password.length < 6)
            return res.status(400).json({ error: "Password is too short" });
        const userExists = await User.findOne({ email });
        if (userExists)
            return res
                .status(400)
                .json({ error: "User with this email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const avatar = `https://avatar.iran.liara.run/username?username=${name}`;
        const user = new User({
            name,
            email,
            password: hashedPassword,
            avatar,
        });

        if (user) {
            generateToken(user.id, res);
            await user.save();
            return res.status(201).json(user);
        } else {
            return res.status(401).json({ error: "User was not found" });
        }
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in signUp controller: ", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "Fields can not be ampty" });

        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(404)
                .json({ error: "User with this email was not found" });

        const matchPasswords = await bcrypt.compare(password, user.password);
        if (!matchPasswords)
            return res.status(400).json({ error: "Password is incorrent" });

        generateToken(user.id, res);
        return res.status(200).json(user);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in logIn controller: ", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};

export const logOut = async (req, res) => {
    try {
        const userId = req.user;
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully." });
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in logIn controller: ", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};

export const getMe = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) return res.status(400).json({ error: "User id not provided" });
        const user = await User.findById(id).populate({
            path: "liked",
            model: "House",
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.status(200).json(user);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in getMe controller: ", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};
