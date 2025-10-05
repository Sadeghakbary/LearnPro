import pool from "../db.js";

console.log("Creating database tables...");

// Create users table
try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      role VARCHAR(50) DEFAULT 'user',
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP
    )
  `);
  console.log("Users table created or already exists.");
} catch (err) {
  console.error("Error creating users table:", err);
}

// Create courses table
try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      teacher VARCHAR(255) NOT NULL,
      description TEXT,
      image_url VARCHAR(500),
      price DECIMAL(10,2) DEFAULT 0,
      level VARCHAR(50) DEFAULT 'beginner',
      duration VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Courses table created or already exists.");
} catch (err) {
  console.error("Error creating courses table:", err);
}

// Create lessons table
try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lessons (
      id SERIAL PRIMARY KEY,
      course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      duration VARCHAR(50),
      video_url VARCHAR(500),
      free BOOLEAN DEFAULT false,
      order_index INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Lessons table created or already exists.");
} catch (err) {
  console.error("Error creating lessons table:", err);
}

// Create indexes for better performance
try {
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
    CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
    CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(course_id, order_index);
  `);
  console.log("Database indexes created.");
} catch (err) {
  console.error("Error creating indexes:", err);
}

export const getAllCourses = async () => {
  const { rows } = await pool.query(`
    SELECT
      c.*,
      COALESCE(json_agg(
        json_build_object(
          'id', l.id,
          'title', l.title,
          'description', l.description,
          'duration', l.duration,
          'videoUrl', l.video_url,
          'free', l.free
        ) ORDER BY l.order_index
      ) FILTER (WHERE l.id IS NOT NULL), '[]') as lessons
    FROM courses c
    LEFT JOIN lessons l ON c.id = l.course_id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `);
  return rows;
};

export const getCourseById = async (id) => {
  const { rows } = await pool.query(`
    SELECT
      c.*,
      COALESCE(json_agg(
        json_build_object(
          'id', l.id,
          'title', l.title,
          'description', l.description,
          'duration', l.duration,
          'videoUrl', l.video_url,
          'free', l.free
        ) ORDER BY l.order_index
      ) FILTER (WHERE l.id IS NOT NULL), '[]') as lessons
    FROM courses c
    LEFT JOIN lessons l ON c.id = l.course_id
    WHERE c.id = $1
    GROUP BY c.id
  `, [id]);
  return rows[0];
};

export const getCourseBySlug = async (slug) => {
  const { rows } = await pool.query(`
    SELECT
      c.*,
      COALESCE(json_agg(
        json_build_object(
          'id', l.id,
          'title', l.title,
          'description', l.description,
          'duration', l.duration,
          'videoUrl', l.video_url,
          'free', l.free
        ) ORDER BY l.order_index
      ) FILTER (WHERE l.id IS NOT NULL), '[]') as lessons
    FROM courses c
    LEFT JOIN lessons l ON c.id = l.course_id
    WHERE c.slug = $1
    GROUP BY c.id
  `, [slug]);
  return rows[0];
};

export const createCourse = async (courseData) => {
  const { title, teacher, description, image_url, price, level, duration, slug } = courseData;
  const { rows } = await pool.query(`
    INSERT INTO courses (title, teacher, description, image_url, price, level, duration, slug)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `, [title, teacher, description, image_url, price || 0, level || 'beginner', duration, slug]);
  return rows[0];
};

export const createLesson = async (lessonData) => {
  const { course_id, title, description, duration, video_url, free, order_index } = lessonData;
  const { rows } = await pool.query(`
    INSERT INTO lessons (course_id, title, description, duration, video_url, free, order_index)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `, [course_id, title, description, duration, video_url, free || false, order_index || 0]);
  return rows[0];
};

export const seedSampleData = async () => {
  try {
    // Check if data already exists
    const { rows } = await pool.query("SELECT COUNT(*) as count FROM courses");
    if (parseInt(rows[0].count) > 0) {
      console.log("Sample data already exists, skipping seed.");
      return;
    }

    console.log("Seeding sample course data...");

    // Create sample courses matching the mock data
    const courses = [
      {
        title: "آموزش جامع React",
        slug: "react-comprehensive",
        teacher: "سجاد احمدی",
        description: "آموزش کامل React از پایه تا پیشرفته",
        image_url: "/assets/images/cardBox/js.jpg",
        price: 149.99,
        level: "intermediate",
        duration: "45 hours"
      },
      {
        title: "آموزش TypeScript",
        slug: "typescript-guide",
        teacher: "محمد محمدی",
        description: "آموزش کامل TypeScript برای توسعه‌دهندگان",
        image_url: "/assets/images/cardBox/js.jpg",
        price: 119.99,
        level: "intermediate",
        duration: "35 hours"
      },
      {
        title: "آموزش جاوااسکریپت",
        slug: "javascript-fundamentals",
        teacher: "علی رضایی",
        description: "آموزش جامع جاوااسکریپت از پایه",
        image_url: "/assets/images/cardBox/js.jpg",
        price: 99.99,
        level: "beginner",
        duration: "40 hours"
      },
      {
        title: "آموزش پایتون",
        slug: "python-programming",
        teacher: "مریم احمدی",
        description: "آموزش برنامه‌نویسی پایتون برای همه سطوح",
        image_url: "/assets/images/cardBox/Python.jpg",
        price: 89.99,
        level: "beginner",
        duration: "35 hours"
      },
      {
        title: "آموزش HTML و CSS",
        slug: "html-css-basics",
        teacher: "رضا کریمی",
        description: "آموزش طراحی وب با HTML و CSS",
        image_url: "/assets/images/cardBox/HTML.jpg",
        price: 79.99,
        level: "beginner",
        duration: "25 hours"
      },
      {
        title: "آموزش Tailwind CSS",
        slug: "tailwind-css",
        teacher: "فاطمه حسینی",
        description: "طراحی سریع و مدرن با Tailwind CSS",
        image_url: "/assets/images/cardBox/tailwind.jpg",
        price: 69.99,
        level: "beginner",
        duration: "20 hours"
      }
    ];

    for (const course of courses) {
      const createdCourse = await createCourse(course);

      // Create sample lessons for each course
      const lessonTemplates = {
        "react-comprehensive": [
          { title: "معرفی دوره", description: "مروری بر دوره و تنظیمات اولیه", duration: "10:23", free: true },
          { title: "شروع با JSX", description: "آشنایی با JSX و ساختار کامپوننت‌ها", duration: "15:40", free: false },
          { title: "کامپوننت‌ها", description: "ساخت و مدیریت کامپوننت‌های React", duration: "20:15", free: false }
        ],
        "typescript-guide": [
          { title: "آشنایی با TypeScript", description: "معرفی TypeScript و مزایای آن", duration: "08:12", free: true },
          { title: "انواع داده‌ای", description: "کار با انواع داده‌ای در TypeScript", duration: "12:30", free: true },
          { title: "Interface و Type", description: "استفاده از Interface و Type Aliases", duration: "18:45", free: false }
        ],
        "javascript-fundamentals": [
          { title: "متغیرها و ثابت‌ها", description: "آشنایی با var، let و const", duration: "14:20", free: true },
          { title: "توابع", description: "ساخت و استفاده از توابع در JS", duration: "16:30", free: false }
        ],
        "python-programming": [
          { title: "شروع برنامه‌نویسی", description: "نصب Python و اولین برنامه", duration: "11:15", free: true },
          { title: "کار با داده‌ها", description: "انواع داده‌ای و عملیات پایه", duration: "19:40", free: false }
        ],
        "html-css-basics": [
          { title: "ساختار HTML", description: "تگ‌ها و ساختار صفحات وب", duration: "13:25", free: true },
          { title: "استایل‌دهی با CSS", description: "استفاده از CSS برای طراحی", duration: "17:50", free: false }
        ],
        "tailwind-css": [
          { title: "شروع کار با Tailwind", description: "نصب و تنظیمات اولیه", duration: "09:30", free: true },
          { title: "کامپوننت‌های کاربردی", description: "ساخت کامپوننت‌های responsive", duration: "21:15", free: false }
        ]
      };

      const lessons = lessonTemplates[createdCourse.slug] || [
        { title: "معرفی", description: "معرفی دوره", duration: "10 min", free: true }
      ];

      lessons.forEach((lesson, index) => {
        createLesson({
          course_id: createdCourse.id,
          title: lesson.title,
          description: lesson.description,
          duration: lesson.duration,
          video_url: `/videos/${createdCourse.slug}-lesson-${index + 1}.mp4`,
          free: lesson.free,
          order_index: index + 1
        });
      });

      for (const lesson of lessons) {
        await createLesson(lesson);
      }
    }

    console.log("Sample data seeded successfully!");
  } catch (err) {
    console.error("Error seeding sample data:", err);
  }
};

// User management functions
export const createUser = async (userData) => {
  const { email, password_hash, first_name, last_name, role } = userData;
  const { rows } = await pool.query(`
    INSERT INTO users (email, password_hash, first_name, last_name, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, first_name, last_name, role, created_at
  `, [email, password_hash, first_name, last_name, role || 'user']);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const { rows } = await pool.query(`
    SELECT id, email, password_hash, first_name, last_name, role, is_active, created_at, last_login
    FROM users WHERE email = $1
  `, [email]);
  return rows[0];
};

export const getUserById = async (id) => {
  const { rows } = await pool.query(`
    SELECT id, email, first_name, last_name, role, is_active, created_at, last_login
    FROM users WHERE id = $1
  `, [id]);
  return rows[0];
};

export const updateUserLastLogin = async (id) => {
  await pool.query(`
    UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1
  `, [id]);
};

export const getAllUsers = async () => {
  const { rows } = await pool.query(`
    SELECT id, email, first_name, last_name, role, is_active, created_at, last_login
    FROM users ORDER BY created_at DESC
  `);
  return rows;
};

export const updateUserRole = async (id, role) => {
  const { rows } = await pool.query(`
    UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2
    RETURNING id, email, first_name, last_name, role
  `, [role, id]);
  return rows[0];
};

export const seedAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await getUserByEmail('admin@learnpro.com');
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    // Create admin user
    const bcrypt = await import('bcrypt');
    const saltRounds = 10;
    const adminPassword = 'admin123'; // You should change this
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    const adminUser = await createUser({
      email: 'admin@learnpro.com',
      password_hash: hashedPassword,
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin'
    });

    console.log("Admin user created successfully:", adminUser.email);
    console.log("Admin login credentials:");
    console.log("Email: admin@learnpro.com");
    console.log("Password: admin123");
    console.log("⚠️  Please change the default password after first login!");

  } catch (err) {
    console.error("Error creating admin user:", err);
  }
};

// Seed data on module load
seedSampleData();
seedAdminUser();
