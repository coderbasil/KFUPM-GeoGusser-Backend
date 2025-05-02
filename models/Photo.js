import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    coord: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Photo", PhotoSchema);
