import { Router } from "express";
import Photo from "../models/Photo.js";

const router = Router();

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

router.post("/", async (req, res) => {
  try {
    const { url, coord } = req.body;

    // basic validation
    if (!url || !coord?.x || !coord?.y)
      return res.status(400).json({ error: "url and coord {x,y} required" });

    const doc = await Photo.create({ url, coord });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
