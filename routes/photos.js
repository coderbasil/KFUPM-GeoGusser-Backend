import { Router } from "express";
import Photo from "../models/Photo.js";

const router = Router();

/**
 * GET /api/photos/random
 * Returns one random photo document.
 * Response:
 *   {
 *     id:     "6633…",
 *     url:    "https://s3.amazonaws.com/…",
 *     coord:  { x: 325, y: 447 }
 *   }
 */
router.get("/random", async (_req, res) => {
  try {
    const [photo] = await Photo.aggregate([{ $sample: { size: 1 } }]);
    if (!photo) return res.status(404).json({ error: "No photos found" });

    res.json({
      id: photo._id,
      url: photo.url,
      coord: photo.coord,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
