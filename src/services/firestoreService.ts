// src/services/firestoreService.ts
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, setDoc, getFirestore } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import type { TimetableEvent } from "../types/timetable";

/** Get real‑time stream of timetable events for a given student */
export const useTimetableEvents = (
  studentId: string,
  setEvents: (events: TimetableEvent[]) => void
) => {
  const q = query(
    collection(db, "timetable_events"),
    where("student_id", "==", studentId),
    orderBy("day"),
    orderBy("start_time")
  );
  const unsub = onSnapshot(q, (snapshot) => {
    const evs: TimetableEvent[] = [];
    snapshot.forEach((doc) => evs.push(doc.data() as TimetableEvent));
    setEvents(evs);
  });
  return unsub;
};

/** Add a new timetable event (client‑side) */
export const addTimetableEvent = async (event: Omit<TimetableEvent, "event_id" | "created_at">) => {
  const colRef = collection(db, "timetable_events");
  const docRef = await addDoc(colRef, { ...event, created_at: new Date().toISOString() });
  // Update the added doc with its generated ID for easier reference later
  await setDoc(doc(db, "timetable_events", docRef.id), { event_id: docRef.id }, { merge: true });
  return docRef.id;
};

export const dbInstance = db;
