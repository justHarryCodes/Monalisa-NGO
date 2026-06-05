export type UserRole = "admin" | "volunteer" | "member" | "guest";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  phone?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  story: string;
  goalAmount: number;
  raisedAmount: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  createdBy: string;
  attendees: string[];
  status: "upcoming" | "ongoing" | "completed";
  createdAt: Date;
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  campaignId?: string;
  campaignName?: string;
  bank: "moniepoint" | "fcmb";
  reference: string;
  message?: string;
  createdAt: Date;
  verified: boolean;
}

export interface Volunteer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  motivation: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

export interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  membershipType: "individual" | "corporate";
  status: "pending" | "approved";
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "event" | "campaign" | "general" | "donation";
  read: boolean;
  createdAt: Date;
  relatedId?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: "education" | "relief" | "community" | "events";
  uploadedAt: Date;
  uploadedBy: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  impact: string;
  imageUrl: string;
  category: string;
  beneficiaries: number;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  imageUrl?: string;
  location: string;
}
