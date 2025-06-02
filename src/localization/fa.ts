const fa = {
  common: {
    app_name: 'لرن‌پرو',
    change_lang: 'تغییر زبان',
    theme_toggle: 'تغییر تم',
  
  },
     navbar: {
    pages:[
      {Title: 'دوره ها' , path: '/Courses'},
      {Title: 'مقاله ها' , path: '/blogs'},
    ],
    settings: [
      {title: 'تنظیمات' , path: '/settings'},
      {title: 'پروفایل' , path: '/profile'},
    ],
  },
  menu: {
    home: 'خانه',
    courses: 'دوره‌ها',
    about: 'درباره ما',
    contact: 'تماس با ما',
  },
  pages: {
    home: {
      welcome: 'به لرن‌پرو خوش آمدید',
      explore_courses: 'مشاهده دوره‌ها',
    },
    courses: {
      title: 'لیست دوره‌ها',
      description: 'در اینجا می‌توانید دوره‌های مختلف را مشاهده کنید.',
      no_courses: 'دوره‌ای موجود نیست.',
    },
    course_detail: {
      back_to_courses: 'بازگشت به دوره‌ها',
      lessons: 'درس‌ها',
      description: 'توضیحات',
    },
    lesson_page: {
      next: 'درس بعدی',
      previous: 'درس قبلی',
      content: 'محتوای درس',
    },
  },
  validation: {
    requireds: {
      name: 'وارد کردن نام الزامی است',
      email: 'وارد کردن ایمیل الزامی است',
    },
  },
  ui: {
    loading: 'در حال بارگذاری...',
    error: 'خطایی رخ داده است',
    retry: 'تلاش مجدد',
    select_language: 'انتخاب زبان',
  },
  Language: {
    changeLanguage: ' تغییر زبان',
  },
}

export default fa
