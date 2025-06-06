const fa = {
  common: {
    app_name: 'لرن‌پرو',
    change_lang: 'تغییر زبان',
    theme_toggle: 'تغییر تم',
  
  },
     navbar: {
    Pages:[
      {title: 'دوره ها' , path: '/Courses'},
      {title: 'مقاله ها' , path: '/blogs'},
    ],
    settings: [
      {title: 'تنظیمات' , path: '/settings'},
      {title: 'پروفایل' , path: '/profile'},
    ],
  },
   cardBox: {
    Courses : 'دوره ها'
  },
  pages: {
    home: {
      welcome: ' به لرن‌پرو خوش آمدید تنها راه افراد هوشمند',
       Details : 'تو میتونی هر چیزی که لازم داری رو در سریع ترین زمان ممکن یادبگیری' ,
       Search : 'چه دوره ای نیاز داری ؟'
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
