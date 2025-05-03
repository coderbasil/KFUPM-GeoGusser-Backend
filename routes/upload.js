import express from "express";
import multer from "multer";
import { PassThrough } from "stream";
import { google } from "googleapis";
import Photo from "../models/Photo.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const auth = new google.auth.GoogleAuth({
  keyFile: "config/service-account.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});
const drive = google.drive({ version: "v3", auth });

router.post("/photos", upload.single("photo"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No photo file received." });
    }
    const { difficulty, locationName, x, y } = req.body;
    if (!x || !y) {
      return res.status(400).json({ error: "Missing coordinates." });
    }

    const stream = new PassThrough();
    stream.end(req.file.buffer);

    const driveResponse = await drive.files.create(
      {
        requestBody: {
          name: req.file.originalname,
          parents: [process.env.DRIVE_FOLDER_ID],
          mimeType: req.file.mimetype,
        },
        media: {
          mimeType: req.file.mimetype,
          body: stream,
        },
        fields: "id",
      },
      { maxBodyLength: Infinity, maxContentLength: Infinity }
    );

    const fileId = driveResponse.data.id;

    await drive.permissions.create({
      fileId,
      requestBody: { role: "reader", type: "anyone" },
    });

    const publicUrl = `https://drive.google.com/uc?id=${fileId}`;

    const photoDoc = await Photo.create({
      url: publicUrl,
      coord: { x: Number(x), y: Number(y) },
      diff: difficulty,
      photographer: req.user?.username || "unknown",
      status: "pending",
    });

    res.status(201).json(photoDoc);
  } catch (err) {
    next(err);
  }
});

export default router;
