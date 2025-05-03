import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import photos from "./routes/photos.js";
import upload from "./routes/upload.js";

const app = express();
const PORT = 5000;
const MONGO_URI =
  "mongodb+srv://bsuli1424:bsuli1424@cluster0.tjdau4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

app.use("/api/photos", photos);
app.use("/api/upload", upload);

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
