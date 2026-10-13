export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  role: 'renter' | 'dealer' | 'host';
  avatar?: string;
  companyName?: string;
  verifiedNationalId?: boolean;
  tier?: string;
  cashbackPoints?: number;
  [key: string]: any;
}

export interface Car {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  dailyPrice: number;
  images: string[];
  status: 'available' | 'rented' | 'maintenance';
  mileageLimit: string;
  transmission: string;
  fuel: string;
  seats: number;
  horsepower: string;
  rating: number;
  inspectionScore: number;
  dealershipName: string;
  features: string[];
  tags: string[];
  [key: string]: any;
}

export interface Booking {
  id: string;
  carId: string;
  renterId: string;
  renterName: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  totalDays: number;
  dailyRate: number;
  subtotal: number;
  vat: number; // 14%
  depositHold: number;
  totalPrice: number;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'rejected' | 'cancelled';
  branch: string;
  addons: string[];
  gpsStatus?: {
    location: string;
    fuelPercent: number;
    odometer: string;
  };
  contractId?: string;
  stage?: number; // 1: Submitted, 2: Approved, 3: Paid, 4: Handover
  [key: string]: any;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'renter' | 'dealer' | 'system';
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface Conversation {
  id: string;
  bookingId?: string;
  carId?: string;
  carName?: string;
  renterId: string;
  renterName: string;
  dealerId: string;
  dealerName: string;
  messages: ChatMessage[];
  lastUpdated: string;
  unreadCount?: number;
}

// 1. Initial Mock Users
const INITIAL_USERS: User[] = [
  {
    id: 'dealer_royal',
    username: 'royal_cars',
    name: 'معرض رويال كارز الفاخرة',
    companyName: 'معرض رويال كارز الفاخرة',
    email: 'info@royalcars.eg',
    phone: '+201099887766',
    role: 'dealer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    verifiedNationalId: true,
    tier: 'بلاتينيوم معتمد VIP'
  },
  {
    id: 'renter_tarek',
    username: 'tarek_menshawy',
    name: 'م. طارق المنشاوي',
    email: 'tarek.menshawy@gmail.com',
    phone: '+201122334455',
    role: 'renter',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    verifiedNationalId: true,
    tier: 'عميل ذهبي معتمد',
    cashbackPoints: 3200
  },
  {
    id: 'host_ahmed',
    username: 'ahmed_host',
    name: 'أحمد كمال (مالك P2P)',
    email: 'ahmed.kamal@outlook.com',
    phone: '+201288776655',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    verifiedNationalId: true,
    tier: 'مضيف فردي موثق'
  }
];

// 2. Initial Mock Fleet
const INITIAL_FLEET: Car[] = [
  {
    id: 'car_porsche_cayenne',
    ownerId: 'dealer_royal',
    brand: 'بورشه',
    model: 'Cayenne GTS',
    year: 2024,
    category: 'دفع رباعي SUV',
    dailyPrice: 14500,
    images: [
      '/images/carDesktopView.webp',
      '/images/car.webp'
    ],
    status: 'available',
    mileageLimit: '300 كم/اليوم',
    transmission: 'أوتوماتيك 8 سرعات Tiptronic S',
    fuel: 'بنزين 95 سوبر',
    seats: 5,
    horsepower: '493 حصان V8 Twin-Turbo',
    rating: 4.9,
    inspectionScore: 98,
    dealershipName: 'معرض رويال كارز الفاخرة',
    features: ['نظام صوتي Burmester 3D', 'بانوراما سقف مزدوج', 'نظام تعليق هوائي نشط PASM', 'شاشات خلفية مستقلة'],
    tags: ['فحص معتمد 150+ نقطة', 'تأمين شامل مجاني', 'متاحة فوراً']
  },
  {
    id: 'car_mercedes_s450',
    ownerId: 'dealer_royal',
    brand: 'مرسيدس-بنز',
    model: 'S450 Maybach Pack',
    year: 2023,
    category: 'سيدان فاخرة',
    dailyPrice: 18000,
    images: [
      '/images/car.webp',
      '/images/carDesktopView.webp'
    ],
    status: 'available',
    mileageLimit: '250 كم/اليوم',
    transmission: 'أوتوماتيك 9G-Tronic',
    fuel: 'بنزين 95 Mild Hybrid',
    seats: 4,
    horsepower: '367 حصان EQ Boost',
    rating: 5.0,
    inspectionScore: 99,
    dealershipName: 'معرض رويال كارز الفاخرة',
    features: ['مقاعد خلفية منعدمة الجاذبية مع تدليك', 'نظام القيادة شبه الذاتية Drive Pilot', 'إضاءة محيطية تفاعلية 64 لون', 'حزمة عطرية AIR-BALANCE'],
    tags: ['توصيل لباب بيتك', 'بدون إيداع نقدي للعملاء الذهبيين', 'VIP Executive']
  },
  {
    id: 'car_bmw_520i',
    ownerId: 'dealer_royal',
    brand: 'بي إم دبليو',
    model: '520i M-Sport',
    year: 2024,
    category: 'سيدان فاخرة',
    dailyPrice: 7500,
    images: [
      '/images/carDesktopView.webp',
      '/images/car.webp'
    ],
    status: 'available',
    mileageLimit: '300 كم/اليوم',
    transmission: 'أوتوماتيك 8 سرعات Steptronic',
    fuel: 'بنزين 92/95',
    seats: 5,
    horsepower: '208 حصان TwinPower Turbo',
    rating: 4.8,
    inspectionScore: 96,
    dealershipName: 'معرض رويال كارز الفاخرة',
    features: ['شاشة BMW Curved Display المنحنية', 'نظام صوتي Harman Kardon', 'حزمة M الرياضية الكاملة'],
    tags: ['فحص معتمد', 'تأمين شامل']
  },
  {
    id: 'car_toyota_fortuner',
    ownerId: 'host_ahmed',
    brand: 'تويوتا',
    model: 'فورتشنر 4.0L V6',
    year: 2023,
    category: 'دفع رباعي SUV',
    dailyPrice: 3800,
    images: [
      '/images/car.webp'
    ],
    status: 'available',
    mileageLimit: '350 كم/اليوم',
    transmission: 'أوتوماتيك 6 سرعات 4x4',
    fuel: 'بنزين 92',
    seats: 7,
    horsepower: '235 حصان V6 4.0',
    rating: 4.7,
    inspectionScore: 94,
    dealershipName: 'أحمد كمال (مالك P2P)',
    features: ['دفع رباعي مستمر مع قفل دفرنس', '7 مقاعد عائلية مريحة', 'تكييف مركزي مزدوج'],
    tags: ['سيارة عائلية وسفاري', 'تسليم فوري بالتجمع']
  },
  {
    id: 'car_kia_sportage',
    ownerId: 'host_ahmed',
    brand: 'كيا',
    model: 'سبورتاج GT-Line',
    year: 2024,
    category: 'كروس أوفر',
    dailyPrice: 2800,
    images: [
      '/images/carDesktopView.webp'
    ],
    status: 'available',
    mileageLimit: '300 كم/اليوم',
    transmission: 'أوتوماتيك 7 سرعات DCT',
    fuel: 'بنزين 92',
    seats: 5,
    horsepower: '180 حصان توربو',
    rating: 4.8,
    inspectionScore: 95,
    dealershipName: 'أحمد كمال (مالك P2P)',
    features: ['شاشة بانورامية مدمجة', 'كاميرات 360 درجة', 'شاحن لاسلكي وسقف بانوراما'],
    tags: ['اقتصادية وعملية', 'تأمين شامل']
  },
  {
    id: 'car_fiat_tipo',
    ownerId: 'host_ahmed',
    brand: 'فيات',
    model: 'تيبو سيدان',
    year: 2024,
    category: 'سيدان اقتصادية',
    dailyPrice: 1950,
    images: [
      '/images/fiat-tipo-featured.webp'
    ],
    status: 'available',
    mileageLimit: '300 كم/اليوم',
    transmission: 'أوتوماتيك 6 سرعات',
    fuel: 'بنزين 92',
    seats: 5,
    horsepower: '110 حصان',
    rating: 4.8,
    inspectionScore: 97,
    dealershipName: 'أحمد كمال (مالك P2P)',
    features: ['شاشة لمس مع Apple CarPlay', 'مثبت سرعة', 'كاميرا خلفية وحساسات ركن', 'موفرة جداً في استهلاك الوقود'],
    tags: ['اقتصادية وعملية', 'فحص معتمد', 'تسليم فوري']
  }
];

// 3. Initial Mock Bookings
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'MSH-8821',
    carId: 'car_porsche_cayenne',
    renterId: 'renter_tarek',
    renterName: 'م. طارق المنشاوي',
    ownerId: 'dealer_royal',
    startDate: '2026-10-15',
    endDate: '2026-10-18',
    startTime: '10:00 ص',
    endTime: '10:00 ص',
    totalDays: 3,
    dailyRate: 14500,
    subtotal: 43500,
    vat: 6090,
    depositHold: 15000,
    totalPrice: 49590,
    status: 'active',
    branch: 'صالة كبار الزوار VIP - مطار القاهرة مبنى 3',
    addons: ['سائق خاص بزي رسمي', 'باقة كيلومترات مفتوحة'],
    gpsStatus: {
      location: 'محور 26 يوليو - الشيخ زايد',
      fuelPercent: 92,
      odometer: '18,420 كم'
    },
    contractId: 'E-CTR-2026-CAI-9941',
    stage: 4
  },
  {
    id: 'MSH-8902',
    carId: 'car_mercedes_s450',
    renterId: 'renter_tarek',
    renterName: 'م. طارق المنشاوي',
    ownerId: 'dealer_royal',
    startDate: '2026-10-22',
    endDate: '2026-10-25',
    startTime: '12:00 م',
    endTime: '12:00 م',
    totalDays: 3,
    dailyRate: 18000,
    subtotal: 54000,
    vat: 7560,
    depositHold: 20000,
    totalPrice: 61560,
    status: 'approved',
    branch: 'فرع التجمع الخامس - البلاتينيوم مول',
    addons: ['توصيل لباب بيتك'],
    stage: 2
  }
];

// 4. Initial Mock Chat Conversations
const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_8821',
    bookingId: 'MSH-8821',
    carId: 'car_porsche_cayenne',
    carName: 'بورشه Cayenne GTS 2024',
    renterId: 'renter_tarek',
    renterName: 'م. طارق المنشاوي',
    dealerId: 'dealer_royal',
    dealerName: 'معرض رويال كارز الفاخرة',
    lastUpdated: 'منذ 10 دقائق',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'system',
        senderName: 'النظام الآلي',
        senderRole: 'system',
        text: 'تم تأكيد حجز السيارة بورشه كايين GTS برقم MSH-8821 وتجهيز العقد الإلكتروني.',
        timestamp: '10:00 ص',
        isSystem: true
      },
      {
        id: 'm2',
        senderId: 'renter_tarek',
        senderName: 'م. طارق المنشاوي',
        senderRole: 'renter',
        text: 'أهلاً بحضرتك، هل تم تجهيز السيارة للاستلام بصالة كبار الزوار بمطار القاهرة مبنى 3 كما هو محدد؟',
        timestamp: '10:15 ص'
      },
      {
        id: 'm3',
        senderId: 'dealer_royal',
        senderName: 'معرض رويال كارز الفاخرة',
        senderRole: 'dealer',
        text: 'أهلاً بك باشمهندس طارق، السيارة معقمة وجاهزة حالياً بصالة كبار الزوار مع الكابتن المعين. بانتظار وصول رحلتك بسلامة الله.',
        timestamp: '10:20 ص'
      }
    ]
  }
];

// INITIALIZATION LOGIC
export const initStorage = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem('mishwar_users')) {
    localStorage.setItem('mishwar_users', JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem('mishwar_fleet')) {
    localStorage.setItem('mishwar_fleet', JSON.stringify(INITIAL_FLEET));
  }
  if (!localStorage.getItem('mishwar_bookings')) {
    localStorage.setItem('mishwar_bookings', JSON.stringify(INITIAL_BOOKINGS));
  }
  if (!localStorage.getItem('mishwar_conversations')) {
    localStorage.setItem('mishwar_conversations', JSON.stringify(INITIAL_CONVERSATIONS));
  }
  // Default logged in user: Renter (Tarek)
  if (!localStorage.getItem('mishwar_current_user')) {
    localStorage.setItem('mishwar_current_user', JSON.stringify(INITIAL_USERS[1]));
  }
};

// USER & AUTH APIS
export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return INITIAL_USERS;
  return JSON.parse(localStorage.getItem('mishwar_users') || JSON.stringify(INITIAL_USERS));
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return INITIAL_USERS[1];
  const user = localStorage.getItem('mishwar_current_user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('mishwar_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('mishwar_current_user');
  }
};

export const loginUser = (identifier: string, role?: string): User | null => {
  const users = getUsers();
  const cleanId = identifier.trim().toLowerCase();
  const found = users.find(u => 
    u.email.toLowerCase() === cleanId || 
    u.username.toLowerCase() === cleanId ||
    (u.phone && u.phone.includes(cleanId))
  );

  if (found) {
    setCurrentUser(found);
    return found;
  }

  // Create demo on-the-fly if not found
  const newUser: User = {
    id: 'user_' + Date.now(),
    username: cleanId.replace(/[^a-z0-9]/g, '_') || 'user_' + Date.now(),
    name: identifier.split('@')[0] || 'مستخدم مشوار',
    email: identifier.includes('@') ? identifier : `${cleanId}@mishwar.eg`,
    phone: '+201000000000',
    role: (role?.toLowerCase() as any) || 'renter',
    verifiedNationalId: true,
    tier: 'عضو جديد'
  };
  registerUser(newUser);
  setCurrentUser(newUser);
  return newUser;
};

export const registerUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  if (typeof window !== 'undefined') {
    localStorage.setItem('mishwar_users', JSON.stringify(users));
    localStorage.setItem('mishwar_current_user', JSON.stringify(user));
  }
};

export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mishwar_current_user');
  }
};

// FLEET APIS
export const getFleet = (): Car[] => {
  if (typeof window === 'undefined') return INITIAL_FLEET;
  return JSON.parse(localStorage.getItem('mishwar_fleet') || JSON.stringify(INITIAL_FLEET));
};

export const getCarById = (id: string): Car | null => {
  return getFleet().find(c => c.id === id) || null;
};

export const saveCar = (car: Car) => {
  const fleet = getFleet();
  fleet.unshift(car);
  if (typeof window !== 'undefined') {
    localStorage.setItem('mishwar_fleet', JSON.stringify(fleet));
  }
};

export const updateCarStatus = (carId: string, status: string) => {
  const fleet = getFleet();
  const index = fleet.findIndex(c => c.id === carId);
  if (index !== -1) {
    fleet[index].status = status as any;
    if (typeof window !== 'undefined') {
      localStorage.setItem('mishwar_fleet', JSON.stringify(fleet));
    }
  }
};

// BOOKINGS APIS
export const getBookings = (): Booking[] => {
  if (typeof window === 'undefined') return INITIAL_BOOKINGS;
  return JSON.parse(localStorage.getItem('mishwar_bookings') || JSON.stringify(INITIAL_BOOKINGS));
};

export const getBookingsForUser = (userId: string, role?: string): Booking[] => {
  const all = getBookings();
  const cleanRole = role?.toLowerCase();
  if (cleanRole === 'dealer' || cleanRole === 'host') {
    return all.filter(b => b.ownerId === userId);
  }
  return all.filter(b => b.renterId === userId);
};

export const createBooking = (booking: Booking) => {
  const bookings = getBookings();
  bookings.unshift(booking);
  if (typeof window !== 'undefined') {
    localStorage.setItem('mishwar_bookings', JSON.stringify(bookings));
  }

  // Also create a chat thread automatically for this booking
  createConversation({
    id: 'conv_' + booking.id,
    bookingId: booking.id,
    carId: booking.carId,
    carName: `${booking.brand || ''} ${booking.model || ''}`,
    renterId: booking.renterId,
    renterName: booking.renterName,
    dealerId: booking.ownerId,
    dealerName: 'مسؤول المعرض',
    lastUpdated: 'الآن',
    messages: [
      {
        id: 'sys_' + Date.now(),
        senderId: 'system',
        senderName: 'النظام الآلي',
        senderRole: 'system',
        text: `تم استلام طلب الحجز رقم ${booking.id} بنجاح. يمكنك التنسيق مع المعرض مباشرة هنا.`,
        timestamp: 'الآن',
        isSystem: true
      }
    ]
  });
};

export const updateBookingStatus = (id: string, status: string) => {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = status as any;
    if (status === 'approved') bookings[index].stage = 2;
    if (status === 'active') bookings[index].stage = 4;
    if (status === 'completed') bookings[index].stage = 4;
    if (typeof window !== 'undefined') {
      localStorage.setItem('mishwar_bookings', JSON.stringify(bookings));
    }
  }
};

// CHAT APIS
export const getConversations = (): Conversation[] => {
  if (typeof window === 'undefined') return INITIAL_CONVERSATIONS;
  return JSON.parse(localStorage.getItem('mishwar_conversations') || JSON.stringify(INITIAL_CONVERSATIONS));
};

export const getConversationsForUser = (userId: string): Conversation[] => {
  const all = getConversations();
  return all.filter(c => c.renterId === userId || c.dealerId === userId);
};

export const getConversationById = (id: string): Conversation | null => {
  return getConversations().find(c => c.id === id) || null;
};

export const createConversation = (conv: Conversation) => {
  const convs = getConversations();
  const exists = convs.find(c => c.id === conv.id || (c.bookingId && c.bookingId === conv.bookingId));
  if (!exists) {
    convs.unshift(conv);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mishwar_conversations', JSON.stringify(convs));
    }
  }
};

export const sendMessage = (threadId: string, msg: ChatMessage) => {
  const convs = getConversations();
  const index = convs.findIndex(c => c.id === threadId);
  if (index !== -1) {
    if (!msg.id) msg.id = 'msg_' + Date.now();
    convs[index].messages.push(msg);
    convs[index].lastUpdated = 'الآن';
    if (typeof window !== 'undefined') {
      localStorage.setItem('mishwar_conversations', JSON.stringify(convs));
    }
  }
};
