/**
 * ==============================================================================
 * MISHWAR | مشوار - Centralized Site Configuration & Asset Registry
 * ==============================================================================
 * All text, contact details, statistics, and media assets are centralized here.
 * To change any image, video, phone number, or text, update this configuration file.
 * ==============================================================================
 */

export interface AssetMapping {
  id: string;
  file: string;
  path: string;
  usedIn: string;
  description: string;
  type: 'video' | 'image' | 'icon' | 'logo';
}

/**
 * Complete Registry of all media files from public/images and public/videos
 */
export const ASSET_REGISTRY: AssetMapping[] = [
  // Videos
  {
    id: 'video-hero',
    file: 'hero.mp4',
    path: '/videos/hero.mp4',
    usedIn: 'Hero Section background video',
    description: 'Cinematic car driving and luxury fleet video used as ambient hero background',
    type: 'video',
  },
  {
    id: 'video-about-us',
    file: 'about-us.mp4',
    path: '/videos/about-us.mp4',
    usedIn: 'Video Tour Section',
    description: 'Inspection center, fleet handover, and vehicle quality assurance tour video',
    type: 'video',
  },

  // Main Car Showcase Images
  {
    id: 'img-hero-cars',
    file: 'hero-cars.webp',
    path: '/images/hero-cars.webp',
    usedIn: 'Hero Section focal car presentation & video poster',
    description: 'Renault Logan and Toyota Corolla dual car showcase',
    type: 'image',
  },
  {
    id: 'img-sell-car-fiat',
    file: 'sell-car-fiat.webp',
    path: '/images/sell-car-fiat.webp',
    usedIn: 'Sell Your Car Banner Section',
    description: 'Fiat Tipo sedan car featured in the sell your car banner',
    type: 'image',
  },
  {
    id: 'img-how-it-works-corolla',
    file: 'how-it-works-corolla.webp',
    path: '/images/how-it-works-corolla.webp',
    usedIn: 'How It Works / Steps Section',
    description: 'Side profile of Toyota Corolla certified inspection model',
    type: 'image',
  },
  {
    id: 'img-car-default',
    file: 'car.webp',
    path: '/images/car.webp',
    usedIn: 'Cars Carousel & Used Cars Grid',
    description: 'Featured sedan vehicle showcase image',
    type: 'image',
  },
  {
    id: 'img-car-desktop',
    file: 'carDesktopView.webp',
    path: '/images/carDesktopView.webp',
    usedIn: 'Media Gallery & Used Cars Grid',
    description: 'Perspective desktop showroom view of luxury vehicle',
    type: 'image',
  },
  {
    id: 'img-steps',
    file: 'steps.webp',
    path: '/images/steps.webp',
    usedIn: 'How It Works illustration backup',
    description: 'Process infographic steps asset',
    type: 'image',
  },
  {
    id: 'img-hero-backup',
    file: 'Hero.webp',
    path: '/images/Hero.webp',
    usedIn: 'Media Gallery Showcase',
    description: 'Hero car high resolution backup',
    type: 'image',
  },
  {
    id: 'img-cat',
    file: 'Cat.webp',
    path: '/images/Cat.webp',
    usedIn: 'Media Gallery Showcase',
    description: 'Vehicle showroom category graphic',
    type: 'image',
  },

  // Brand Logos
  { id: 'logo-mercedes', file: 'Mercedes-Benz.webp', path: '/images/Mercedes-Benz.webp', usedIn: 'Top Brands Grid', description: 'Mercedes-Benz brand logo', type: 'logo' },
  { id: 'logo-renault', file: 'Renault.webp', path: '/images/Renault.webp', usedIn: 'Top Brands Grid', description: 'Renault brand logo', type: 'logo' },
  { id: 'logo-bmw', file: 'BMW.webp', path: '/images/BMW.webp', usedIn: 'Top Brands Grid', description: 'BMW brand logo', type: 'logo' },
  { id: 'logo-opel', file: 'Opel.webp', path: '/images/Opel.webp', usedIn: 'Top Brands Grid', description: 'Opel brand logo', type: 'logo' },
  { id: 'logo-peugeot', file: 'Peugeot.webp', path: '/images/Peugeot.webp', usedIn: 'Top Brands Grid', description: 'Peugeot brand logo', type: 'logo' },
  { id: 'logo-nissan', file: 'Nissan.webp', path: '/images/Nissan.webp', usedIn: 'Top Brands Grid', description: 'Nissan brand logo', type: 'logo' },
  { id: 'logo-hyundai', file: 'Hyundai.webp', path: '/images/Hyundai.webp', usedIn: 'Top Brands Grid (expanded)', description: 'Hyundai brand logo', type: 'logo' },
  { id: 'logo-kia', file: 'Kia.webp', path: '/images/Kia.webp', usedIn: 'Top Brands Grid (expanded)', description: 'Kia brand logo', type: 'logo' },
  { id: 'logo-volkswagen', file: 'Volkswagen.webp', path: '/images/Volkswagen.webp', usedIn: 'Top Brands Grid (expanded)', description: 'Volkswagen brand logo', type: 'logo' },
  { id: 'logo-jeep', file: 'Jeep.webp', path: '/images/Jeep.webp', usedIn: 'Top Brands Grid (expanded)', description: 'Jeep brand logo', type: 'logo' },
  { id: 'logo-mg', file: 'MG.webp', path: '/images/MG.webp', usedIn: 'Top Brands Grid (expanded)', description: 'MG brand logo', type: 'logo' },
  { id: 'logo-citroen', file: 'Citroen.webp', path: '/images/Citroen.webp', usedIn: 'Top Brands Grid (expanded)', description: 'Citroen brand logo', type: 'logo' },

  // Feature Icons (why 1 to 6)
  { id: 'icon-why-1', file: 'why (1).svg', path: '/images/why (1).svg', usedIn: 'Features Section: 360 Inspection', description: 'Technical 360 inspection badge', type: 'icon' },
  { id: 'icon-why-2', file: 'why (2).svg', path: '/images/why (2).svg', usedIn: 'Features Section: Official Guarantee', description: 'Warranty and guarantee badge', type: 'icon' },
  { id: 'icon-why-3', file: 'why (3).svg', path: '/images/why (3).svg', usedIn: 'Features Section: Rapid Delivery', description: 'Express handover icon', type: 'icon' },
  { id: 'icon-why-4', file: 'why (4).svg', path: '/images/why (4).svg', usedIn: 'Features Section: Transparent Pricing', description: 'Pricing transparency icon', type: 'icon' },
  { id: 'icon-why-5', file: 'why (5).svg', path: '/images/why (5).svg', usedIn: 'Features Section: Sylndr / Mishwar Verified', description: 'Verification seal icon', type: 'icon' },
  { id: 'icon-why-6', file: 'why (6).svg', path: '/images/why (6).svg', usedIn: 'Features Section: Deposit Free', description: 'Deposit exemption icon', type: 'icon' },

  // Trust Icons & Badges
  { id: 'icon-wide-angle', file: 'wideAngleIcon.cf64df81.svg', path: '/images/wideAngleIcon.cf64df81.svg', usedIn: 'Trust Pillars', description: 'Wide angle camera icon', type: 'icon' },
  { id: 'icon-assurance', file: 'assuranceIcon.79e10b1f.svg', path: '/images/assuranceIcon.79e10b1f.svg', usedIn: 'Trust Pillars', description: 'Assurance certificate icon', type: 'icon' },
  { id: 'icon-truck', file: 'truckIcon.64c6c40a.svg', path: '/images/truckIcon.64c6c40a.svg', usedIn: 'Trust Pillars', description: 'Delivery truck icon', type: 'icon' },
  { id: 'icon-money', file: 'moneyIcon.82021139.svg', path: '/images/moneyIcon.82021139.svg', usedIn: 'Trust Pillars', description: 'Financial security icon', type: 'icon' },
  { id: 'icon-car', file: 'carIcon.98573cfb.svg', path: '/images/carIcon.98573cfb.svg', usedIn: 'Brand & Hero Badges', description: 'Vehicle silhouette badge', type: 'icon' },
  { id: 'icon-sylndr', file: 'sylndrLogo.b843b396.svg', path: '/images/sylndrLogo.b843b396.svg', usedIn: 'Verified Badge Header', description: 'Sylndr verified guarantee badge', type: 'icon' },
  { id: 'icon-buy-car', file: 'buyCarIcon.a769eeb4.svg', path: '/images/buyCarIcon.a769eeb4.svg', usedIn: 'Action Buttons', description: 'Buy car action icon', type: 'icon' },
  { id: 'icon-sell-car', file: 'sellCarIcon.eb6f5dff.svg', path: '/images/sellCarIcon.eb6f5dff.svg', usedIn: 'Action Buttons', description: 'Sell car action icon', type: 'icon' },

  // Social & UI Icons
  { id: 'icon-facebook', file: 'facebookLogo.7fe86659.svg', path: '/images/facebookLogo.7fe86659.svg', usedIn: 'Footer & Contact', description: 'Facebook social icon', type: 'icon' },
  { id: 'icon-instagram', file: 'InstagramLogo.e8fd0abd.svg', path: '/images/InstagramLogo.e8fd0abd.svg', usedIn: 'Footer & Contact', description: 'Instagram social icon', type: 'icon' },
  { id: 'icon-linkedin', file: 'linkedinLogo.dfd9aafc.svg', path: '/images/linkedinLogo.dfd9aafc.svg', usedIn: 'Footer & Contact', description: 'LinkedIn social icon', type: 'icon' },
  { id: 'icon-about-us', file: 'aboutUsIcon.3c264036.svg', path: '/images/aboutUsIcon.3c264036.svg', usedIn: 'Navigation / About', description: 'About Us building icon', type: 'icon' },
  { id: 'icon-faqs', file: 'FAQsIcon.233e1d2c.svg', path: '/images/FAQsIcon.233e1d2c.svg', usedIn: 'FAQ Section', description: 'FAQ question icon', type: 'icon' },
  { id: 'icon-blog', file: 'Blog.82a508b6.svg', path: '/images/Blog.82a508b6.svg', usedIn: 'Footer links', description: 'Blog publication icon', type: 'icon' },
  { id: 'icon-home', file: 'homeIconEnabled.349904aa.svg', path: '/images/homeIconEnabled.349904aa.svg', usedIn: 'Bottom Navigation', description: 'Home button icon', type: 'icon' },
];

/**
 * Central Site Content, Text, Links & Contact Information
 */
export const SITE_CONFIG = {
  name: 'مشوار | Mishwar',
  shortName: 'مشوار',
  tagline: 'منصة المركبات والتنقل الذكي المعتمدة الأولى في مصر',
  description: 'المنصة المصرية المعتمدة لشراء، بيع واستئجار السيارات المفحوصة 100% بعقود إلكترونية موحدة موثقة مع مصلحة الضرائب المصرية (ETA).',
  lang: 'ar',
  dir: 'rtl' as const,

  contact: {
    hotline: '19854',
    phone: '+20 109 988 7766',
    whatsapp: '+20 109 988 7766',
    whatsappLink: 'https://wa.me/201099887766?text=' + encodeURIComponent('مرحباً بك في منصة مشوار. أود الاستفسار عن سيارة.'),
    email: 'contact@mishwar.eg',
    supportEmail: 'support@mishwar.eg',
    commercialReg: '489201',
    etaTaxId: '994-120-845',
    branches: [
      { name: 'القاهرة الجديدة', detail: 'التجمع الخامس - شارع التسعين الشمالي' },
      { name: 'الشيخ زايد', detail: 'محور 26 يوليو - كابيتال بيزنس بارك' },
      { name: 'مطار القاهرة VIP', detail: 'صالة كبار الزوار T3' },
      { name: 'الإسكندرية', detail: 'طريق الكورنيش - لوران' },
      { name: 'الساحل الشمالي', detail: 'مارينا وهاسيندا (موسمي)' },
    ],
  },

  social: {
    facebook: 'https://facebook.com/mishwar.eg',
    instagram: 'https://instagram.com/mishwar.eg',
    linkedin: 'https://linkedin.com/company/mishwar-eg',
  },

  appDownload: {
    ios: 'https://apps.apple.com',
    android: 'https://play.google.com',
  },

  stats: [
    { value: '4,850+', label: 'سيارة معتمدة متاحة', sub: 'تحديث فوري للأسطول' },
    { value: '150+', label: 'نقطة فحص فني شامل', sub: 'تقرير فحص رقمي مرفق' },
    { value: '99.4%', label: 'نسبة رضا العملاء', sub: 'تقييم رسمي موثق' },
    { value: '24/7', label: 'دعم طوارئ وتسليم', sub: 'توصيل لباب بيتك' },
  ],

  features: [
    {
      icon: '/images/why (1).svg',
      title: 'فحص فني معتمد 360°',
      desc: 'كل سيارة تخضع لفحص دقيق لأكثر من 150 نقطة تشمل المحرك، الشاسيه، ناقل الحركة، الفرامل، والتكييف مع شهادة جودة رقمية.',
    },
    {
      icon: '/images/why (2).svg',
      title: 'عقود رقمية وربط ضريبي ETA',
      desc: 'توثيق فوري للعقد الموحد برقم التسجيل الضريبي لضمان حقوقك القانونية وحمايتك التأمينية الكاملة طوال الرحلة.',
    },
    {
      icon: '/images/why (3).svg',
      title: 'استلام فوري وتوصيل لباب بيتك',
      desc: 'استلم سيارتك من صالات كبار الزوار بمطار القاهرة أو اطلب تسليمها معقمة ومجهزة عند باب بيتك في التجمع أو زايد.',
    },
    {
      icon: '/images/why (4).svg',
      title: 'إعفاء من التأمين النقدي',
      desc: 'للعملاء الموثقين بالهوية الوطنية المصرية، نوفر حجز بدون ودائع نقدية معقدة واسترداد فوري لكافة التأمينات.',
    },
    {
      icon: '/images/why (5).svg',
      title: 'ضمان استرجاع 7 أيام',
      desc: 'اشتري أو استأجر براحة بال تامة مع إمكانية استبدال السيارة أو استرداد أموالك خلال 7 أيام أو 500 كم إذا لم تكن راضياً 100%.',
    },
    {
      icon: '/images/why (6).svg',
      title: 'تمويل وتقسيط بأسهل إجراءات',
      desc: 'ادفع كاش أو قسط عبر شراكاتنا المعتمدة مع البنوك والجهات التمويلية بمقدم يبدأ من 10% وبأسرع موافقة ائتمانية.',
    },
  ],

  steps: [
    {
      number: '01',
      title: 'اختر السيارة المناسبة من أسطول مشوار',
      desc: 'تصفح آلاف السيارات المفحوصة مع تقرير فني شامل لأكثر من 150 نقطة يوضح كافة تفاصيل المحرك والهيكل.',
    },
    {
      number: '02',
      title: 'حدد خطة الدفع أو باقة الحجز المناسبة',
      desc: 'ادفع كاش أو بالتقسيط الميسر عبر شركائنا المعتمدين، أو اختر باقة إيجار مرنة بأسعار شفافة بدون مصاريف خفية.',
    },
    {
      number: '03',
      title: 'استلم سيارتك فوراً بعقد رقمي موثق',
      desc: 'استلم سيارتك من أقرب فرع أو اطلب توصيلها مباشرة لباب بيتك مع توثيق فوري للعقد وضمان شامل ودعم 24/7.',
    },
  ],

  mediaGallery: [
    {
      id: 'g1',
      title: 'أسطول سيارات مشوار المعتمد',
      category: 'سيدان وعائلية',
      image: '/images/hero-cars.webp',
      type: 'image' as const,
    },
    {
      id: 'g2',
      title: 'سيارات سيدان فارهة VIP',
      category: 'فارهة',
      image: '/images/carDesktopView.webp',
      type: 'image' as const,
    },
    {
      id: 'g3',
      title: 'سيارة Fiat Tipo الفاخرة',
      category: 'سيدان عملية',
      image: '/images/sell-car-fiat.webp',
      type: 'image' as const,
    },
    {
      id: 'g4',
      title: 'تويوتا كورولا فحص معتمد 360°',
      category: 'سيدان يابانية',
      image: '/images/how-it-works-corolla.webp',
      type: 'image' as const,
    },
    {
      id: 'g5',
      title: 'سيارات الدفع الرباعي SUV',
      category: 'دفع رباعي',
      image: '/images/car.webp',
      type: 'image' as const,
    },
    {
      id: 'g6',
      title: 'جولة مراكز الفحص والتشغيل',
      category: 'فيديو حصري',
      image: '/images/Cat.webp',
      video: '/videos/about-us.mp4',
      type: 'video' as const,
    },
  ],

  testimonials: [
    {
      id: 't1',
      name: 'م. أحمد الشناوي',
      role: 'مستأجر موثق - التجمع الخامس',
      rating: 5,
      comment: 'تجربة ممتازة واحترافية غير مسبوقة. استلمت مرسيدس E200 في مطار القاهرة T3 في أقل من 10 دقائق بعقد رقمي كامل وبدون أي تعقيدات.',
      car: 'Mercedes E-Class',
    },
    {
      id: 't2',
      name: 'د. سارة عبد الرحمن',
      role: 'مشترية سيارة - الشيخ زايد',
      rating: 5,
      comment: 'اشتريت تويوتا كورولا 2024 بتقرير فحص شامل لكل مسمار في العربية. الضمان والشفافية في مشوار أعطوني راحة بال تامة.',
      car: 'Toyota Corolla 2024',
    },
    {
      id: 't3',
      name: 'أ. طارق المنشاوي',
      role: 'مالك أسطول ومعرض شريك',
      rating: 5,
      comment: 'كمعرض شريك، ربط منصة مشوار مع منظومة الفاتورة الإلكترونية ETA والتتبع المباشر للسيارات نقل أعمالنا لمستوى آخر من الأمان.',
      car: 'Royal Cars Fleet',
    },
  ],

  faqs: [
    {
      q: 'كيف يتم فحص وضمان السيارات المعروضة في مشوار؟',
      a: 'تخضع كل سيارة لفحص فني صارم يشمل 150+ نقطة فنية بأحدث أجهزة التشخيص الرقمي، ويتم إرفاق تقرير فحص تفصيلي بالصور والبيانات مع كل سيارة.',
    },
    {
      q: 'هل توجد ودائع نقدية معقدة عند الاستئجار؟',
      a: 'كلا، للعملاء الموثقين بالهوية الوطنية المصرية، نوفر إمكانية الحجز بدون حجز ودائع نقدية باهظة مع إعفاءات تأمينية مرنة.',
    },
    {
      q: 'هل يمكن توصيل السيارة لباب البيت أو المطار؟',
      a: 'نعم، نوفر خدمة التوصيل والاستلام عند باب بيتك في القاهرة الكبرى والساحل الشمالي، أو في صالات كبار الزوار بمطار القاهرة الدولي 24/7.',
    },
    {
      q: 'كيف أبيع سيارتي عبر منصة مشوار؟',
      a: 'ببساطة اضغط على "بيع سيارتك"، وأدخل بيانات السيارة، وسيتواصل معك خبير التقييم لحجز فحص فني فوري وإنهاء عملية الشراء وتحويل الأموال خلال 24 ساعة.',
    },
  ],
};

