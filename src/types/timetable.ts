// src/types/timetable.ts
export interface TimetableEvent {
  event_id: string;
  student_id: string;
  course_id: string;
  day: string; // e.g., "Monday" or ISO date string for specific date
  start_time: string; // "HH:mm" 24h format
  end_time: string;   // "HH:mm"
  venue: string;
  event_type: "Class" | "Laboratory" | "Tutorial" | "Other";
  description?: string;
  created_at?: string;
}
