import { Course } from '@/types/course'
import { lang } from '@/localization'
import axios from 'axios'

const API_BASE_URL = '/api'

// Course data with bilingual support
const getCourseData = () => {
  const isPersian = lang === 'fa'

  return [
    {
      id: 1,
      slug: 'react-comprehensive',
      title: isPersian ? 'آموزش جامع React' : 'Comprehensive React Course',
      teacher: isPersian ? 'سجاد احمدی' : 'Sajad Ahmadi',
      description: isPersian ? 'آموزش کامل React از پایه تا پیشرفته با پروژه‌های عملی' : 'Complete React course from beginner to advanced with real projects',
      image_url: '/assets/images/cardBox/js.jpg',
      lessons: [
        {
          id: 1,
          title: isPersian ? 'معرفی دوره React' : 'React Course Introduction',
          description: isPersian ? 'مروری بر دوره React و مفاهیم پایه' : 'Overview of React course and basic concepts',
          duration: '12:45', free: true, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 2,
          title: isPersian ? 'JSX و کامپوننت‌ها' : 'JSX and Components',
          description: isPersian ? 'آموزش کامل JSX و ساخت کامپوننت‌های React' : 'Complete guide to JSX and building React components',
          duration: '18:30', free: false, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'
        },
        {
          id: 3,
          title: isPersian ? 'State و Props' : 'State and Props',
          description: isPersian ? 'مدیریت state و کار با props در React' : 'Managing state and working with props in React',
          duration: '22:15', free: false, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4'
        }
      ]
    },
    {
      id: 2,
      slug: 'typescript-guide',
      title: isPersian ? 'آموزش TypeScript' : 'TypeScript Guide',
      teacher: isPersian ? 'محمد محمدی' : 'Mohammad Mohammadi',
      description: isPersian ? 'آموزش کامل TypeScript برای توسعه‌دهندگان حرفه‌ای' : 'Complete TypeScript course for professional developers',
      image_url: '/assets/images/cardBox/js.jpg',
      lessons: [
        {
          id: 1,
          title: isPersian ? 'شروع کار با TypeScript' : 'Getting Started with TypeScript',
          description: isPersian ? 'نصب و راه‌اندازی TypeScript' : 'Installing and setting up TypeScript',
          duration: '08:12', free: true, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4'
        },
        {
          id: 2,
          title: isPersian ? 'انواع داده‌ای پایه' : 'Basic Data Types',
          description: isPersian ? 'آموزش انواع داده‌ای در TypeScript' : 'Learning data types in TypeScript',
          duration: '12:30', free: true, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_2mb.mp4'
        },
        {
          id: 3,
          title: isPersian ? 'Interface و Generic' : 'Interface and Generics',
          description: isPersian ? 'کار با Interface و Generic Types' : 'Working with Interface and Generic Types',
          duration: '18:45', free: false, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_5mb.mp4'
        }
      ]
    },
    {
      id: 3,
      slug: 'javascript-fundamentals',
      title: isPersian ? 'آموزش جاوااسکریپت' : 'JavaScript Fundamentals',
      teacher: isPersian ? 'علی رضایی' : 'Ali Rezaei',
      description: isPersian ? 'آموزش جامع جاوااسکریپت از پایه تا پیشرفته' : 'Complete JavaScript course from basics to advanced',
      image_url: '/assets/images/cardBox/js.jpg',
      lessons: [
        {
          id: 1,
          title: isPersian ? 'متغیرها و انواع داده' : 'Variables and Data Types',
          description: isPersian ? 'آموزش کامل متغیرها و انواع داده در JavaScript' : 'Complete guide to variables and data types in JavaScript',
          duration: '14:20', free: true, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_854x480_1mb.mp4'
        },
        {
          id: 2,
          title: isPersian ? 'توابع و Scope' : 'Functions and Scope',
          description: isPersian ? 'آموزش توابع، پارامترها و مفهوم Scope' : 'Learning functions, parameters and scope concept',
          duration: '16:30', free: false, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_854x480_2mb.mp4'
        }
      ]
    },
    {
      id: 4,
      slug: 'python-programming',
      title: isPersian ? 'آموزش پایتون' : 'Python Programming',
      teacher: isPersian ? 'مریم احمدی' : 'Maryam Ahmadi',
      description: isPersian ? 'آموزش برنامه‌نویسی پایتون برای همه سطوح' : 'Python programming course for all levels',
      image_url: '/assets/images/cardBox/Python.jpg',
      lessons: [
        {
          id: 1,
          title: isPersian ? 'شروع برنامه‌نویسی پایتون' : 'Python Programming Basics',
          description: isPersian ? 'نصب Python و اجرای اولین برنامه' : 'Installing Python and running first program',
          duration: '11:15', free: true, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_1mb.mp4'
        },
        {
          id: 2,
          title: isPersian ? 'متغیرها و عملیات' : 'Variables and Operations',
          description: isPersian ? 'کار با متغیرها و عملیات ریاضی در پایتون' : 'Working with variables and mathematical operations in Python',
          duration: '19:40', free: false, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_2mb.mp4'
        }
      ]
    },
    {
      id: 5,
      slug: 'html-css-basics',
      title: isPersian ? 'آموزش HTML و CSS' : 'HTML & CSS Basics',
      teacher: isPersian ? 'رضا کریمی' : 'Reza Karimi',
      description: isPersian ? 'آموزش طراحی وب با HTML و CSS' : 'Web design course with HTML and CSS',
      image_url: '/assets/images/cardBox/HTML.jpg',
      lessons: [
        {
          id: 1,
          title: isPersian ? 'ساختار پایه HTML' : 'Basic HTML Structure',
          description: isPersian ? 'یادگیری تگ‌های پایه و ساختار صفحات وب' : 'Learning basic tags and web page structure',
          duration: '13:25', free: true, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4'
        },
        {
          id: 2,
          title: isPersian ? 'CSS و طراحی وب' : 'CSS and Web Design',
          description: isPersian ? 'آموزش CSS برای استایل‌دهی صفحات وب' : 'Learning CSS for styling web pages',
          duration: '17:50', free: false, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_2mb.mp4'
        }
      ]
    },
    {
      id: 6,
      slug: 'tailwind-css',
      title: isPersian ? 'آموزش Tailwind CSS' : 'Tailwind CSS Course',
      teacher: isPersian ? 'فاطمه حسینی' : 'Fateme Hosseini',
      description: isPersian ? 'طراحی سریع و مدرن با Tailwind CSS' : 'Fast and modern design with Tailwind CSS',
      image_url: '/assets/images/cardBox/tailwind.jpg',
      lessons: [
        {
          id: 1,
          title: isPersian ? 'معرفی Tailwind CSS' : 'Introduction to Tailwind CSS',
          description: isPersian ? 'نصب و راه‌اندازی Tailwind CSS' : 'Installing and setting up Tailwind CSS',
          duration: '09:30', free: true, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_854x480_1mb.mp4'
        },
        {
          id: 2,
          title: isPersian ? 'کلاس‌های کاربردی' : 'Utility Classes',
          description: isPersian ? 'آموزش کلاس‌های کاربردی Tailwind' : 'Learning Tailwind utility classes',
          duration: '21:15', free: false, videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_854x480_2mb.mp4'
        }
      ]
    }
  ]
}

// Get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Backend not available, using bilingual mock data')
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED' || error.response?.status === 404) {
        return getCourseData()
      }
    }
    console.error('Error fetching courses:', error)
    throw new Error('Failed to fetch courses')
  }
}

// Get course by slug
export const getCourseBySlug = async (slug: string): Promise<Course> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/slug/${slug}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED' || error.response?.status === 404) {
        const courses = getCourseData()
        const course = courses.find(c => c.slug === slug)
        if (course) {
          return course
        }
        throw new Error(`Course with slug "${slug}" not found`)
      }
    }
    console.error('Error fetching course by slug:', error)
    throw new Error('Failed to fetch course')
  }
}

// Get course by ID
export const getCourseById = async (id: number): Promise<Course> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/${id}`)
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching course by ID:', error)
    throw new Error('Failed to fetch course')
  }
}

// Create new course
export const createCourse = async (courseData: Partial<Course>): Promise<Course> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/courses`, courseData)
    return response.data
  } catch (error: unknown) {
    console.error('Error creating course:', error)
    throw new Error('Failed to create course')
  }
}
