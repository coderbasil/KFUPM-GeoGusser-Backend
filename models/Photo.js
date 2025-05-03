import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    coord: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    diff: { type: String, required: false },
    locationN: { type: String, require: false },
    photographer: { type: String, required: false },
    status: { type: String, required: true, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Photo", PhotoSchema);
