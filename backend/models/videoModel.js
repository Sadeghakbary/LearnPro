import pool from "../db.js";

await pool.query(`
  CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE
  )
`);

export const getVideosByCourse = async (courseId) => {
  const { rows } = await pool.query(
    "SELECT * FROM videos WHERE course_id = $1",
    [courseId]
  );
  return rows;
};

export const createVideo = async (title, url, courseId) => {
  const { rows } = await pool.query(
    "INSERT INTO videos (title, url, course_id) VALUES ($1, $2, $3) RETURNING *",
    [title, url, courseId]
  );
  return rows[0];
};
