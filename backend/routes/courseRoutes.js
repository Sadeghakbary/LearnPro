import express from "express";
import { getAllCourses, getCourseById, getCourseBySlug, createCourse, createLesson } from "../models/courseModel.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "خطا در دریافت دوره‌ها" });
  }
});

// Get course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "دوره یافت نشد" });
    }
    res.json(course);
  } catch (err) {
    console.error("Error fetching course by ID:", err);
    res.status(500).json({ error: "خطا در دریافت دوره" });
  }
});

// Get course by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const course = await getCourseBySlug(req.params.slug);
    if (!course) {
      return res.status(404).json({ error: "دوره یافت نشد" });
    }
    res.json(course);
  } catch (err) {
    console.error("Error fetching course by slug:", err);
    res.status(500).json({ error: "خطا در دریافت دوره" });
  }
});

// Create new course
router.post("/", async (req, res) => {
  try {
    const courseData = req.body;
    const course = await createCourse(courseData);
    res.status(201).json(course);
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ error: "خطا در ایجاد دوره" });
  }
});

// Create lesson for a course
router.post("/:courseId/lessons", async (req, res) => {
  try {
    const lessonData = {
      ...req.body,
      course_id: req.params.courseId
    };
    const lesson = await createLesson(lessonData);
    res.status(201).json(lesson);
  } catch (err) {
    console.error("Error creating lesson:", err);
    res.status(500).json({ error: "خطا در ایجاد درس" });
  }
});

export default router;
