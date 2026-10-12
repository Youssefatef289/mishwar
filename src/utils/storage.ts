export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'renter' | 'dealer' | 'host';
  avatar?: string;
  companyName?: string; // For dealer
}

export interface Car {
  id: string;
  ownerId: string; // dealer or host id
  brand: string;
  model: string;
  year: number;
  category: string;
  dailyPrice: number;
  images: string[];
  status: 'available' | 'rented' | 'maintenance';
  specs: {
    transmission: string;
    fuel: string;
    seats: number;
  };
}

export interface Booking {
  id: string;
  carId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'active';
  branch?: string;
  addons: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  renterId: string;
  dealerId: string;
  bookingId?: string;
  carId?: string;
  messages: ChatMessage[];
  lastUpdated: string;
}

// MOCK DATA SEED
const initialCars: Car[] = [
  { id: '1', ownerId: 'dealer1', brand: 'Porsche', model: 'Cayenne GTS', year: 2024, category: 'SUV', dailyPrice: 12000, images: ['https://images.unsplash.com/photo-1503376712351-56f8f7004f1e?auto=format&fit=crop&q=80'], status: 'available', specs: { transmission: 'Auto', fuel: 'Petrol', seats: 5 } },
  { id: '2', ownerId: 'dealer1', brand: 'Mercedes', model: 'S-Class', year: 2023, category: 'Sedan', dailyPrice: 15000, images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80'], status: 'available', specs: { transmission: 'Auto', fuel: 'Hybrid', seats: 4 } },
];

const initialUsers: User[] = [
  { id: 'dealer1', name: 'Cairo Luxury Motors', email: 'dealer@mishwar.com', phone: '+201000000001', role: 'dealer', companyName: 'Cairo Luxury Motors' },
  { id: 'renter1', name: 'Ahmed Ali', email: 'ahmed@mishwar.com', phone: '+201000000002', role: 'renter' },
];

export const initStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('mishwar_users')) localStorage.setItem('mishwar_users', JSON.stringify(initialUsers));
  if (!localStorage.getItem('mishwar_fleet')) localStorage.setItem('mishwar_fleet', JSON.stringify(initialCars));
  if (!localStorage.getItem('mishwar_bookings')) localStorage.setItem('mishwar_bookings', JSON.stringify([]));
  if (!localStorage.getItem('mishwar_conversations')) localStorage.setItem('mishwar_conversations', JSON.stringify([]));
  if (!localStorage.getItem('mishwar_current_user')) localStorage.setItem('mishwar_current_user', JSON.stringify(initialUsers[1])); // Default to renter
};

// Users
export const getUsers = (): User[] => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('mishwar_users') || '[]') : [];
export const getCurrentUser = (): User | null => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('mishwar_current_user') || 'null') : null;
export const loginUser = (email: string) => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (user && typeof window !== 'undefined') localStorage.setItem('mishwar_current_user', JSON.stringify(user));
  return user;
};
export const logoutUser = () => typeof window !== 'undefined' && localStorage.removeItem('mishwar_current_user');
export const registerUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  if (typeof window !== 'undefined') {
    localStorage.setItem('mishwar_users', JSON.stringify(users));
    localStorage.setItem('mishwar_current_user', JSON.stringify(user));
  }
};

// Fleet
export const getFleet = (): Car[] => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('mishwar_fleet') || '[]') : [];
export const saveCar = (car: Car) => {
  const fleet = getFleet();
  fleet.push(car);
  if (typeof window !== 'undefined') localStorage.setItem('mishwar_fleet', JSON.stringify(fleet));
};
export const updateCarStatus = (carId: string, status: Car['status']) => {
  const fleet = getFleet();
  const index = fleet.findIndex(c => c.id === carId);
  if (index !== -1) fleet[index].status = status;
  if (typeof window !== 'undefined') localStorage.setItem('mishwar_fleet', JSON.stringify(fleet));
};
export const getCarById = (id: string): Car | null => getFleet().find(c => c.id === id) || null;

// Bookings
export const getBookings = (): Booking[] => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('mishwar_bookings') || '[]') : [];
export const createBooking = (booking: Booking) => {
  const bookings = getBookings();
  bookings.push(booking);
  if (typeof window !== 'undefined') localStorage.setItem('mishwar_bookings', JSON.stringify(bookings));
};
export const updateBookingStatus = (id: string, status: Booking['status']) => {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) bookings[index].status = status;
  if (typeof window !== 'undefined') localStorage.setItem('mishwar_bookings', JSON.stringify(bookings));
};
export const getBookingsForUser = (userId: string, role: User['role']) => {
  return getBookings().filter(b => role === 'renter' ? b.renterId === userId : b.ownerId === userId);
};

// Chat
export const getConversations = (): Conversation[] => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('mishwar_conversations') || '[]') : [];
export const getConversationsForUser = (userId: string) => getConversations().filter(c => c.renterId === userId || c.dealerId === userId);
export const getConversationById = (id: string) => getConversations().find(c => c.id === id);
export const createConversation = (conv: Conversation) => {
  const convs = getConversations();
  convs.push(conv);
  if (typeof window !== 'undefined') localStorage.setItem('mishwar_conversations', JSON.stringify(convs));
};
export const sendMessage = (threadId: string, msg: ChatMessage) => {
  const convs = getConversations();
  const index = convs.findIndex(c => c.id === threadId);
  if (index !== -1) {
    convs[index].messages.push(msg);
    convs[index].lastUpdated = new Date().toISOString();
  }
  if (typeof window !== 'undefined') localStorage.setItem('mishwar_conversations', JSON.stringify(convs));
};

