import mongoose, { model } from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    liked: [{ type: mongoose.Types.ObjectId, model: "House", default: []}],
    avatar: { type: String, required: true}
}, { timestamps: true});

export const User = mongoose.model("User", userSchema)