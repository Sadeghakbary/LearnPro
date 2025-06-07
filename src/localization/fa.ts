const fa = {
  common: {
    app_name: 'لرن‌پرو',
    change_lang: 'تغییر زبان',
    theme_toggle: 'تغییر تم',
  },
  navbar: {
    Pages: [
      { title: 'دوره ها', path: '/Courses' },
      { title: 'مقاله ها', path: '/blogs' },
    ],
    settings: [
      { title: 'تنظیمات', path: '/settings' },
      { title: 'پروفایل', path: '/profile' },
    ],
  },
  cardBox: {
    Courses: 'دوره‌ها',
    cardData: [
      {
        id: 1,
        title: 'جاوااسکریپت',
        description: 'آموزش کامل JavaScript از پایه تا پیشرفته با پروژه‌های واقعی',
        img: 'src/assets/images/cardBox/js.jpg',
      },
      {
        id: 2,
        title: 'جاوا',
        description: 'یادگیری اصولی Java و شی‌ءگرایی برای توسعه نرم‌افزارهای کاربردی',
        img: 'src/assets/images/cardBox/java.jpg',
      },
      {
        id: 3,
        title: 'پایتون',
        description: 'مقدماتی تا پیشرفته Python، همراه با پروژه‌های داده‌کاوی و اتوماسیون',
        img: 'src/assets/images/cardBox/python.jpg',
      },
      {
        id: 4,
        title: 'HTML',
        description: 'آشنایی با ساختار صفحات وب با HTML و مفاهیم تگ‌ها',
        img: 'src/assets/images/cardBox/html.jpg',
      },
      {
        id: 5,
        title: 'CSS',
        description: 'استایل‌دهی حرفه‌ای به صفحات وب با CSS و Flexbox/GRID',
        img: 'src/assets/images/cardBox/css.jpg',
      },
      {
        id: 6,
        title: 'Tailwind CSS',
        description: 'طراحی سریع رابط کاربری با فریم‌ورک utility-first به نام Tailwind',
        img: 'src/assets/images/cardBox/tailwind.jpg',
      },
    ],
  },

  pages: {
    home: {
      welcome: ' به لرن‌پرو خوش آمدید تنها راه افراد هوشمند',
      Details: 'تو میتونی هر چیزی که لازم داری رو در سریع ترین زمان ممکن یادبگیری',
      Search: 'چه دوره ای نیاز داری ؟',
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
