import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: String,
    userName: String,
  },
  {
    timestamps: true,
  }
);

export const PhotoRepository = mongoose.model("Photo", photoSchema);
