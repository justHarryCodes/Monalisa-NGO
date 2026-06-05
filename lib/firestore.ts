import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  Timestamp,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Campaign, Event, Donation, Volunteer, Member, Notification, User } from "@/types";

// Users
export const createUserProfile = async (uid: string, data: Partial<User>) => {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: serverTimestamp(),
    isActive: true,
  });
};

export const getUserProfile = async (uid: string) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as unknown as User) : null;
};

export const updateUserProfile = async (uid: string, data: Partial<User>) => {
  await updateDoc(doc(db, "users", uid), { ...data, updatedAt: serverTimestamp() });
};

// Campaigns
export const getCampaigns = async () => {
  const q = query(collection(db, "campaigns"), where("isActive", "==", true), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Campaign[];
};

export const createCampaign = async (data: Omit<Campaign, "id">) => {
  return await addDoc(collection(db, "campaigns"), { ...data, createdAt: serverTimestamp() });
};

// Events
export const getEvents = async () => {
  const q = query(collection(db, "events"), orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Event[];
};

export const createEvent = async (data: Omit<Event, "id">) => {
  const ref = await addDoc(collection(db, "events"), { ...data, createdAt: serverTimestamp() });
  // Notify all volunteers
  await notifyAllVolunteers(
    "New Event: " + data.title,
    `A new event has been scheduled for ${new Date(data.date as unknown as string).toLocaleDateString()}. Location: ${data.location}`,
    "event",
    ref.id
  );
  return ref;
};

export const rsvpEvent = async (eventId: string, userId: string) => {
  const ref = doc(db, "events", eventId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const current = snap.data().attendees || [];
    if (!current.includes(userId)) {
      await updateDoc(ref, { attendees: [...current, userId] });
    }
  }
};

// Donations
export const submitDonation = async (data: Omit<Donation, "id">) => {
  return await addDoc(collection(db, "donations"), { ...data, createdAt: serverTimestamp(), verified: false });
};

export const getDonations = async () => {
  const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Donation[];
};

// Volunteers
export const registerVolunteer = async (data: Omit<Volunteer, "id">) => {
  return await addDoc(collection(db, "volunteers"), { ...data, createdAt: serverTimestamp(), status: "pending" });
};

export const getVolunteers = async () => {
  const snap = await getDocs(collection(db, "volunteers"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Volunteer[];
};

// Members
export const registerMember = async (data: Omit<Member, "id">) => {
  return await addDoc(collection(db, "members"), { ...data, createdAt: serverTimestamp(), status: "pending" });
};

// Notifications
export const notifyAllVolunteers = async (title: string, message: string, type: Notification["type"], relatedId?: string) => {
  const q = query(collection(db, "users"), where("role", "in", ["volunteer", "admin"]));
  const snap = await getDocs(q);
  const batch: Promise<void>[] = snap.docs.map(async (d) => {
    await addDoc(collection(db, "notifications"), {
      userId: d.id,
      title,
      message,
      type,
      read: false,
      relatedId: relatedId || null,
      createdAt: serverTimestamp(),
    });
  });
  await Promise.all(batch);
};

export const getUserNotifications = (userId: string, callback: (notifs: Notification[]) => void) => {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Notification[]);
  });
};

export const markNotificationRead = async (notifId: string) => {
  await updateDoc(doc(db, "notifications", notifId), { read: true });
};

export const getStats = async () => {
  const [donationsSnap, volunteersSnap, membersSnap, eventsSnap] = await Promise.all([
    getDocs(collection(db, "donations")),
    getDocs(collection(db, "volunteers")),
    getDocs(collection(db, "members")),
    getDocs(collection(db, "events")),
  ]);
  const totalDonations = donationsSnap.docs.reduce((sum, d) => sum + (d.data().amount || 0), 0);
  return {
    totalDonations,
    volunteerCount: volunteersSnap.size,
    memberCount: membersSnap.size,
    eventCount: eventsSnap.size,
  };
};
