const en = {
  common: {
    app_name: 'LearnPro',
    change_lang: 'Change Language',
    theme_toggle: 'Toggle Theme',
  },
  navbar: {
    Pages: [
      { title: 'Courses', path: '/Courses' },
      { title: 'Blogs', path: '/blogs' },
    ],
    settings: [
      { title: 'Settings', path: '/settings' },
      { title: 'Profile', path: '/profile' },
    ],
  },

  cardBox: {
    Courses: 'Courses',
    cardData: [
      {
        id: 1,
        title: 'JavaScript',
        description:
          'Complete JavaScript course from beginner to advanced with real-world projects',
        img: 'src/assets/images/cardBox/js.jpg',
      },
      {
        id: 2,
        title: 'Java',
        description: 'Object-oriented Java programming for building robust applications',
        img: 'src/assets/images/cardBox/java.jpg',
      },
      {
        id: 3,
        title: 'Python',
        description:
          'Learn Python from scratch with practical projects in automation and data science',
        img: 'src/assets/images/cardBox/python.jpg',
      },
      {
        id: 4,
        title: 'HTML',
        description: 'Understand the structure of web pages using HTML and semantic tags',
        img: 'src/assets/images/cardBox/html.jpg',
      },
      {
        id: 5,
        title: 'CSS',
        description: 'Professional styling with CSS, Flexbox, and Grid layout techniques',
        img: 'src/assets/images/cardBox/css.jpg',
      },
      {
        id: 6,
        title: 'Tailwind CSS',
        description: 'Build beautiful UIs fast with the utility-first Tailwind CSS framework',
        img: 'src/assets/images/cardBox/tailwind.jpg',
      },
    ],
  },
  roadMap : {
    title :' your Roadmap',
  } ,
  pages: {
    home: {
      welcome: 'Welcome to LearnPro the only way for smart people',
      Details: 'you can learn anyting you want as fast you can',
      Search: 'What are you looking for ?  ',
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
