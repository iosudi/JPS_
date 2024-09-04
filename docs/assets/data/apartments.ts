// Array of objects representing each apartment card
export const apartments = [
  {
    image: './assets/imgs/popular-apartments/1.png',
    title: 'شقة مميزة',
    location: '6 اكتوبر',
    price: 'EGP 1000',
    duration: '/يوم',
    host: 'عادل سعودي',
    bath: 1,
    bed: 4,
    rooms: 2,
    months: 'شهرين',
  },
  {
    image: './assets/imgs/popular-apartments/2.png',
    title: 'شقة رائعة',
    location: 'المعادي',
    price: 'EGP 1200',
    duration: '/يوم',
    host: 'محمد علي',
    bath: 2,
    bed: 3,
    rooms: 3,
    months: 'شهر واحد',
  },
  {
    image: './assets/imgs/popular-apartments/3.png',
    title: 'شقة فاخرة',
    location: 'الزمالك',
    price: 'EGP 1500',
    duration: '/يوم',
    host: 'هشام المصري',
    bath: 2,
    bed: 5,
    rooms: 4,
    months: 'ثلاثة أشهر',
  },
  {
    image: './assets/imgs/popular-apartments/4.png',
    title: 'شقة اقتصادية',
    location: 'مدينة نصر',
    price: 'EGP 800',
    duration: '/يوم',
    host: 'يوسف حسن',
    bath: 1,
    bed: 2,
    rooms: 2,
    months: 'شهرين',
  },
];

export const districts = [
  {
    name: 'اكتوبر',
    description: 'عش كالمحليين',
    imgSrc: './assets/imgs/popular-districts/1.png',
    apartments: [
      {
        imageSrc: './assets/imgs/popular-apartments/1.png',
        hostName: 'كيرلس عادل',
        description: 'شقة مخدومة بالكامل',
        location: 'اكتوبر',
        bathrooms: 1,
        bedrooms: 4,
        doors: 3,
        duration: 'شهرين',
        rating: 4.8,
        reviewsCount: 22,
        pricePerDay: '3,088 EGP',
      },
    ],
  },

  {
    name: 'العاصمة',
    description: 'عش كالمحليين',
    imgSrc: './assets/imgs/popular-districts/2.png',
    apartments: [],
  },

  {
    name: 'الشيخ زايد',
    description: 'الرفاهية والأناقة',
    imgSrc: './assets/imgs/popular-districts/3.png',
    apartments: [
      {
        imageSrc: './assets/imgs/popular-apartments/3.png',
        hostName: 'محمود سامي',
        description: 'شقة في قلب المدينة',
        location: 'الهرم',
        bathrooms: 1,
        bedrooms: 2,
        doors: 1,
        duration: 'أسبوع',
        rating: 4.2,
        reviewsCount: 30,
        pricePerDay: '1,800 EGP',
      },
      {
        imageSrc: './assets/imgs/popular-apartments/3.png',
        hostName: 'محمود سامي',
        description: 'شقة في قلب المدينة',
        location: 'الهرم',
        bathrooms: 1,
        bedrooms: 2,
        doors: 1,
        duration: 'أسبوع',
        rating: 4.2,
        reviewsCount: 30,
        pricePerDay: '1,800 EGP',
      },
    ],
  },

  {
    name: 'التجمع 5',
    description: 'الراحة والهدوء',
    imgSrc: './assets/imgs/popular-districts/4.png',
    apartments: [
      {
        imageSrc: './assets/imgs/popular-apartments/4.png',
        hostName: 'سارة محمد',
        description: 'شقة فاخرة بإطلالة',
        location: 'مدينة نصر',
        bathrooms: 2,
        bedrooms: 5,
        doors: 4,
        duration: 'شهرين',
        rating: 4.9,
        reviewsCount: 10,
        pricePerDay: '4,000 EGP',
      },
      {
        imageSrc: './assets/imgs/popular-apartments/4.png',
        hostName: 'سارة محمد',
        description: 'شقة فاخرة بإطلالة',
        location: 'مدينة نصر',
        bathrooms: 2,
        bedrooms: 5,
        doors: 4,
        duration: 'شهرين',
        rating: 4.9,
        reviewsCount: 10,
        pricePerDay: '4,000 EGP',
      },
      {
        imageSrc: './assets/imgs/popular-apartments/1.png',
        hostName: 'أحمد يوسف',
        description: 'شقة مريحة وعصرية',
        location: 'المعادي',
        bathrooms: 1,
        bedrooms: 2,
        doors: 2,
        duration: 'أسبوعين',
        rating: 4.7,
        reviewsCount: 25,
        pricePerDay: '2,200 EGP',
      },
    ],
  },

  {
    name: 'التجمع 5',
    description: 'الراحة والهدوء',
    imgSrc: './assets/imgs/popular-districts/4.png',
    apartments: [],
  },

  {
    name: 'التجمع 5',
    description: 'الراحة والهدوء',
    imgSrc: './assets/imgs/popular-districts/4.png',
    apartments: [
      {
        imageSrc: './assets/imgs/popular-apartments/4.png',
        hostName: 'سارة محمد',
        description: 'شقة فاخرة بإطلالة',
        location: 'مدينة نصر',
        bathrooms: 2,
        bedrooms: 5,
        doors: 4,
        duration: 'شهرين',
        rating: 4.9,
        reviewsCount: 10,
        pricePerDay: '4,000 EGP',
      },
      {
        imageSrc: './assets/imgs/popular-apartments/4.png',
        hostName: 'سارة محمد',
        description: 'شقة فاخرة بإطلالة',
        location: 'مدينة نصر',
        bathrooms: 2,
        bedrooms: 5,
        doors: 4,
        duration: 'شهرين',
        rating: 4.9,
        reviewsCount: 10,
        pricePerDay: '4,000 EGP',
      },
      {
        imageSrc: './assets/imgs/popular-apartments/1.png',
        hostName: 'أحمد يوسف',
        description: 'شقة مريحة وعصرية',
        location: 'المعادي',
        bathrooms: 1,
        bedrooms: 2,
        doors: 2,
        duration: 'أسبوعين',
        rating: 4.7,
        reviewsCount: 25,
        pricePerDay: '2,200 EGP',
      },
    ],
  },

  {
    name: 'التجمع 5',
    description: 'الراحة والهدوء',
    imgSrc: './assets/imgs/popular-districts/4.png',
    apartments: [],
  },
];

export const popularDistricts = [
  {
    name: 'اكتوبر',
    imgSrc: './assets/imgs/popular-districts/5.jpg',
    apartments: 100,
  },
  {
    name: 'الشيخ زايد',
    imgSrc: './assets/imgs/popular-districts/6.png',
    apartments: 200,
  },
  {
    name: 'الساحل الشمالي',
    imgSrc: './assets/imgs/popular-districts/7.png',
    apartments: 80,
  },
  {
    name: 'التجمع الخامس',
    imgSrc: './assets/imgs/popular-districts/4.png',
    apartments: 7,
  },
];

export const popularApartments = [
  {
    imageSrc: './assets/imgs/popular-apartments/5.jpg',
    hostName: 'كيرلس عادل',
    description: 'شقة مخدومة بالكامل',
    location: 'اكتوبر',
    bathrooms: 1,
    bedrooms: 4,
    doors: 3,
    duration: 'شهرين',
    rating: 4.8,
    reviewsCount: 22,
    pricePerDay: '3,088 EGP',
  },
  {
    imageSrc: './assets/imgs/popular-apartments/6.jpg',
    hostName: 'كيرلس عادل',
    description: 'شقة مخدومة بالكامل',
    location: 'اكتوبر',
    bathrooms: 1,
    bedrooms: 4,
    doors: 3,
    duration: 'شهرين',
    rating: 4.8,
    reviewsCount: 22,
    pricePerDay: '3,088 EGP',
  },
  {
    imageSrc: './assets/imgs/popular-apartments/7.jpg',
    hostName: 'كيرلس عادل',
    description: 'شقة مخدومة بالكامل',
    location: 'اكتوبر',
    bathrooms: 1,
    bedrooms: 4,
    doors: 3,
    duration: 'شهرين',
    rating: 4.8,
    reviewsCount: 22,
    pricePerDay: '3,088 EGP',
  },
  {
    imageSrc: './assets/imgs/popular-apartments/1.png',
    hostName: 'كيرلس عادل',
    description: 'شقة مخدومة بالكامل',
    location: 'اكتوبر',
    bathrooms: 1,
    bedrooms: 4,
    doors: 3,
    duration: 'شهرين',
    rating: 4.8,
    reviewsCount: 22,
    pricePerDay: '3,088 EGP',
  },
  {
    imageSrc: './assets/imgs/popular-apartments/2.png',
    hostName: 'كيرلس عادل',
    description: 'شقة مخدومة بالكامل',
    location: 'اكتوبر',
    bathrooms: 1,
    bedrooms: 4,
    doors: 3,
    duration: 'شهرين',
    rating: 4.8,
    reviewsCount: 22,
    pricePerDay: '3,088 EGP',
  },
  {
    imageSrc: './assets/imgs/popular-apartments/3.png',
    hostName: 'كيرلس عادل',
    description: 'شقة مخدومة بالكامل',
    location: 'اكتوبر',
    bathrooms: 1,
    bedrooms: 4,
    doors: 3,
    duration: 'شهرين',
    rating: 4.8,
    reviewsCount: 22,
    pricePerDay: '3,088 EGP',
  },
  {
    imageSrc: './assets/imgs/popular-apartments/4.png',
    hostName: 'كيرلس عادل',
    description: 'شقة مخدومة بالكامل',
    location: 'اكتوبر',
    bathrooms: 1,
    bedrooms: 4,
    doors: 3,
    duration: 'شهرين',
    rating: 4.8,
    reviewsCount: 22,
    pricePerDay: '3,088 EGP',
  },
];

export const searchResultApartments = [
  {
    image: './assets/imgs/popular-apartments/1.png',
    title: 'شقة مميزة',
    location: '6 اكتوبر',
    price: 'EGP 1000',
    duration: '/يوم',
    host: 'عادل سعودي',
    bath: 1,
    bed: 4,
    rooms: 2,
    months: 'شهرين',
  },
  {
    image: './assets/imgs/popular-apartments/2.png',
    title: 'شقة رائعة',
    location: 'المعادي',
    price: 'EGP 1200',
    duration: '/يوم',
    host: 'محمد علي',
    bath: 2,
    bed: 3,
    rooms: 3,
    months: 'شهر واحد',
  },
  {
    image: './assets/imgs/popular-apartments/3.png',
    title: 'شقة فاخرة',
    location: 'الزمالك',
    price: 'EGP 1500',
    duration: '/يوم',
    host: 'هشام المصري',
    bath: 2,
    bed: 5,
    rooms: 4,
    months: 'ثلاثة أشهر',
  },
  {
    image: './assets/imgs/popular-apartments/4.png',
    title: 'شقة اقتصادية',
    location: 'مدينة نصر',
    price: 'EGP 800',
    duration: '/يوم',
    host: 'يوسف حسن',
    bath: 1,
    bed: 2,
    rooms: 2,
    months: 'شهرين',
  },
  {
    image: './assets/imgs/popular-apartments/4.png',
    title: 'شقة اقتصادية',
    location: 'مدينة نصر',
    price: 'EGP 800',
    duration: '/يوم',
    host: 'يوسف حسن',
    bath: 1,
    bed: 2,
    rooms: 2,
    months: 'شهرين',
  },
  {
    image: './assets/imgs/popular-apartments/4.png',
    title: 'شقة اقتصادية',
    location: 'مدينة نصر',
    price: 'EGP 800',
    duration: '/يوم',
    host: 'يوسف حسن',
    bath: 1,
    bed: 2,
    rooms: 2,
    months: 'شهرين',
  },
  {
    image: './assets/imgs/popular-apartments/4.png',
    title: 'شقة اقتصادية',
    location: 'مدينة نصر',
    price: 'EGP 800',
    duration: '/يوم',
    host: 'يوسف حسن',
    bath: 1,
    bed: 2,
    rooms: 2,
    months: 'شهرين',
  },
  {
    image: './assets/imgs/popular-apartments/4.png',
    title: 'شقة اقتصادية',
    location: 'مدينة نصر',
    price: 'EGP 800',
    duration: '/يوم',
    host: 'يوسف حسن',
    bath: 1,
    bed: 2,
    rooms: 2,
    months: 'شهرين',
  },
  {
    image: './assets/imgs/popular-apartments/4.png',
    title: 'شقة اقتصادية',
    location: 'مدينة نصر',
    price: 'EGP 800',
    duration: '/يوم',
    host: 'يوسف حسن',
    bath: 1,
    bed: 2,
    rooms: 2,
    months: 'شهرين',
  },
];