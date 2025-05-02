import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import photos from "./routes/photos.js";

const app = express();
const PORT = 5000;
const MONGO_URI = "";

app.use(cors());
app.use(express.json());

app.use("/api/photos", photos);

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "kfupm_guess",
    });
    console.log("✅ MongoDB connected");

    app.listen(PORT, () =>
      console.log(`🚀 API listening at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
