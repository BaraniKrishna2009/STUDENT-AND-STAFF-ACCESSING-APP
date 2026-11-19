// src/services/assignmentService.ts
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, setDoc, deleteDoc, getFirestore } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import type { Assignment } from "../types/assignment";

/** Real‑time listener for a student's assignments */
export const useAssignments = (
  studentId: string,
  setAssignments: (assignments: Assignment[]) => void
) => {
  const q = query(
    collection(db, "assignments"),
    where("student_id", "==", studentId),
    orderBy("due_date")
  );
  const unsub = onSnapshot(q, (snapshot) => {
    const list: Assignment[] = [];
    snapshot.forEach((doc) => list.push(doc.data() as Assignment));
    setAssignments(list);
  });
  return unsub;
};

/** Add a new assignment */
export const addAssignment = async (assignment: Omit<Assignment, "assignment_id" | "created_at">) => {
  const colRef = collection(db, "assignments");
  const docRef = await addDoc(colRef, { ...assignment, created_at: new Date().toISOString() });
  await setDoc(doc(db, "assignments", docRef.id), { assignment_id: docRef.id }, { merge: true });
  return docRef.id;
};

/** Update an existing assignment */
export const updateAssignment = async (assignmentId: string, data: Partial<Assignment>) => {
  const docRef = doc(db, "assignments", assignmentId);
  await setDoc(docRef, data, { merge: true });
};

/** Delete an assignment */
export const deleteAssignment = async (assignmentId: string) => {
  const docRef = doc(db, "assignments", assignmentId);
  await deleteDoc(docRef);
};
