// src/components/TimetableCard.tsx
import React from "react";
import type { TimetableEvent } from "../types/timetable";
import { format } from "date-fns";

interface Props {
  event: TimetableEvent;
}

const TimetableCard: React.FC<Props> = ({ event }) => {
  // Convert start/end time strings to a readable format
  const formatTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m);
    return format(date, "hh:mm a");
  };

  const typeColors: Record<string, string> = {
    Class: "bg-primary",
    Laboratory: "bg-violet-600",
    Tutorial: "bg-indigo-600",
    Other: "bg-gray-500",
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm mb-3 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{event.course_id}</h3>
        <span className={`${typeColors[event.event_type] ?? "bg-gray-400"} text-xs text-white px-2 py-1 rounded`}> 
          {event.event_type}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        {event.day} • {formatTime(event.start_time)} – {formatTime(event.end_time)}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Venue: {event.venue}</p>
      {event.description && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{event.description}</p>
      )}
    </div>
  );
};

export default TimetableCard;
