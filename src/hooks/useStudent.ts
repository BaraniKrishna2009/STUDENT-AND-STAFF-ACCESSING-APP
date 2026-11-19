// src/hooks/useStudent.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Returns the Firestore student document ID that matches the currently logged‑in user.
 * It queries the "students" collection by the authenticated email address.
 */
export const useStudent = (): string | null => {
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user: User | null) => {
      if (user && user.email) {
        const q = query(collection(db, "students"), where("email", "==", user.email));
        const unsubscribeSnap = onSnapshot(q, (snapshot) => {
          const docSnap = snapshot.docs[0];
          setStudentId(docSnap ? docSnap.id : null);
        });
        return () => unsubscribeSnap();
      } else {
        setStudentId(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  return studentId;
};
