import React, { useEffect, useState } from "react";
import { useStudent } from "../../hooks/useStudent";
import { useTimetableEvents, addTimetableEvent } from "../../services/firestoreService";
import AddEventModal from "../../components/AddEventModal";
import TimetableCard from "../../components/TimetableCard";
import type { TimetableEvent } from "../../types/timetable";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TimetablePage: React.FC = () => {
  const studentId = useStudent();
  const [events, setEvents] = useState<TimetableEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [modalOpen, setModalOpen] = useState(false);

  // Subscribe to real‑time events
  useEffect(() => {
    if (!studentId) return;
    const unsub = useTimetableEvents(studentId, setEvents);
    return () => unsub();
  }, [studentId]);

  const dayEvents = events.filter((e) => e.day === selectedDay).sort((a, b) => a.start_time.localeCompare(b.start_time));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{selectedDay} Timetable</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        >
          + Add Event
        </button>
      </div>
      {/* Day tabs */}
      <nav className="flex space-x-2 overflow-x-auto mb-6">
        {daysOfWeek.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-3 py-1 rounded ${d === selectedDay ? "bg-primary-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            {d}
          </button>
        ))}
      </nav>

      {/* Events list */}
      {dayEvents.length === 0 ? (
        <p className="text-gray-500">No events scheduled for {selectedDay}.</p>
      ) : (
        <div className="space-y-3">
          {dayEvents.map((ev) => (
            <TimetableCard key={ev.event_id} event={ev} />
          ))}
        </div>
      )}

      <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSaved={() => {/* events refresh automatically via listener */}} />
    </div>
  );
};

export default TimetablePage;
