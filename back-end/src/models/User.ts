import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    timestamps: true,
  }
);

export const UserRepository = mongoose.model("User", userSchema);
