import express from "express";
import { getVideosByCourse, createVideo } from "../models/videoModel.js";

const router = express.Router();

router.get("/:courseId", async (req, res) => {
  try {
    const videos = await getVideosByCourse(req.params.courseId);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت ویدئوها" });
  }
});

router.post("/", async (req, res) => {
  const { title, url, courseId } = req.body;
  try {
    const video = await createVideo(title, url, courseId);
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: "خطا در ایجاد ویدئو" });
  }
});

export default router;
