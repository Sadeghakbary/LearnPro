
const en = {
  common: {
    app_name: 'LearnPro',
    change_lang: 'Change Language',
    theme_toggle: 'Toggle Theme',
  },
  navbar: {
    pages:[
      {Title: 'Courses' , path: '/Courses'},
      {Title: 'Blogs' , path: '/blogs'},
    ],
    settings: [
      {title: 'Settings' , path: '/settings'},
      {title: 'Profile' , path: '/profile'},
    ],
  },
 
  pages: {
    home: {
      welcome: 'Welcome to LearnPro the only way for smart people',
      Details : 'you can learn anyting you want as fast you can'
    },
    courses: {
      title: 'Courses List',
      description: 'Here you can browse various courses.',
      no_courses: 'No courses available.',
    },
    course_detail: {
      back_to_courses: 'Back to Courses',
      lessons: 'Lessons',
      description: 'Description',
    },
    lesson_page: {
      next: 'Next Lesson',
      previous: 'Previous Lesson',
      content: 'Lesson Content',
    },
  },
  validation: {
    requireds: {
      name: 'Name is required',
      email: 'Email is required',
    },
  },
  ui: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    select_language: 'Select Language',
  },
  Language: {
    changeLanguage: 'change Language',
  },
}

export default en
