// src/components/AddEventModal.tsx
import React, { useState } from "react";
import Modal from "./Modal";
import { useStudent } from "../hooks/useStudent";
import { addTimetableEvent } from "../services/firestoreService";
import { findConflict } from "../utils/timeOverlap";
import type { TimetableEvent } from "../types/timetable";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void; // callback to refresh list after save
}

const AddEventModal: React.FC<Props> = ({ isOpen, onClose, onSaved }) => {
  const studentId = useStudent();
  const [form, setForm] = useState({
    course_id: "",
    day: "Monday",
    start_time: "09:00",
    end_time: "10:00",
    venue: "",
    event_type: "Class",
    description: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) {
      setError("Student information not loaded.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (form.end_time <= form.start_time) {
        throw new Error("End time must be later than start time.");
      }
      // Fetch existing events for the same student and day
      const q = query(
        collection(db, "timetable_events"),
        where("student_id", "==", studentId),
        where("day", "==", form.day)
      );
      const snap = await getDocs(q);
      const existing: TimetableEvent[] = [];
      snap.forEach((doc) => existing.push(doc.data() as TimetableEvent));
      const conflict = findConflict(form, existing);
      if (conflict) {
        throw new Error(
          `Conflict with existing ${conflict.event_type} on ${conflict.day} ${conflict.start_time}-${conflict.end_time}`
        );
      }
      // Save the new event
      await addTimetableEvent({
        ...form,
        student_id: studentId,
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Timetable Event">
      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-2 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="course_id"
          placeholder="Course ID"
          value={form.course_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          name="day"
          value={form.day}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          type="time"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="time"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          name="event_type"
          value={form.event_type}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Class">Class</option>
          <option value="Laboratory">Laboratory</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Saving…" : "Save Event"}
        </button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
