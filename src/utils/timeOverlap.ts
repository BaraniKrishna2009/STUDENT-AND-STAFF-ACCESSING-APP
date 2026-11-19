// src/utils/timeOverlap.ts
/**
 * Check if two time intervals on the same day overlap.
 * Times are strings in "HH:mm" 24‑hour format.
 */
export const timesOverlap = (
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean => {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const aStart = toMinutes(startA);
  const aEnd = toMinutes(endA);
  const bStart = toMinutes(startB);
  const bEnd = toMinutes(endB);
  // Overlap if start < other end && other start < end
  return aStart < bEnd && bStart < aEnd;
};

/**
 * Determine if a new event conflicts with any existing events for the same student.
 * Returns the first conflicting event if found, otherwise null.
 */
export const findConflict = (
  newEvent: {
    day: string;
    start_time: string;
    end_time: string;
    event_type?: string;
  },
  existingEvents: Array<{ day: string; start_time: string; end_time: string }>
): { day: string; start_time: string; end_time: string } | null => {
  for (const ev of existingEvents) {
    if (ev.day !== newEvent.day) continue;
    if (timesOverlap(ev.start_time, ev.end_time, newEvent.start_time, newEvent.end_time)) {
      return ev;
    }
  }
  return null;
};
