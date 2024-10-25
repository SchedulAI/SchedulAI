export interface AvailabilityWithUser {
  id: string;
  schedule_id: string;
  user_id: string;
  week_day: Date | null; // "YYYY/MM/DD"
  start_time: string | null; // "hh:mm"
  end_time: string | null; // "hh:mm"
  notes: string | null;
  user_name: string;
  user_email: string;
}

export interface IntervalResult {
  date: string;
  start: string;
  end: string;
  accepted: Array<{ user_id: string; user_name: string; user_email: string }>;
  rejected: Array<{ user_id: string; user_name: string; user_email: string }>;
}

// Helper to convert "hh:mm" to minutes since midnight
function timeToMinutes(time: string | null): number {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Helper to convert minutes back to "hh:mm" format
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function matchAvailabilities(
  hostAvailability: AvailabilityWithUser[],
  guestAvailabilities: AvailabilityWithUser[]
): IntervalResult[] {
  // Group host availabilities by date
  const groupedHostAvailabilities = hostAvailability.reduce(
    (acc, availability) => {
      const date = availability.week_day!.toISOString().split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(availability);
      return acc;
    },
    {} as { [date: string]: AvailabilityWithUser[] }
  );

  const result: IntervalResult[] = [];

  // Get all unique guests
  const allGuests = guestAvailabilities.map((guest) => ({
    user_id: guest.user_id,
    user_name: guest.user_name,
    user_email: guest.user_email,
  }));

  // Process each date in host availabilities
  for (const date in groupedHostAvailabilities) {
    const hostIntervals = groupedHostAvailabilities[date].map((host) => ({
      start: timeToMinutes(host.start_time),
      end: timeToMinutes(host.end_time),
      user: {
        user_id: host.user_id,
        user_name: host.user_name,
        user_email: host.user_email,
      },
    }));

    // Extract guest availabilities for the same date
    const guestsForDate = guestAvailabilities.filter(
      (guest) => guest.week_day!.toISOString().split('T')[0] === date
    );

    // Find guests who don't have availability for this date
    const guestsNotAvailableForDate = allGuests.filter(
      (guest) =>
        !guestsForDate.some(
          (availableGuest) => availableGuest.user_id === guest.user_id
        )
    );

    // Create current slots based on host availability
    let currentSlots = hostIntervals.map((interval) => ({
      start: interval.start,
      end: interval.end,
      accepted: [] as {
        user_id: string;
        user_name: string;
        user_email: string;
      }[],
      rejected: [...guestsNotAvailableForDate] as {
        user_id: string;
        user_name: string;
        user_email: string;
      }[],
    }));

    // Process each guest availability
    for (const guest of guestsForDate) {
      const guestStart = timeToMinutes(guest.start_time);
      const guestEnd = timeToMinutes(guest.end_time);
      let newSlots: typeof currentSlots = [];

      // Process current slots and break them if necessary
      for (const slot of currentSlots) {
        const { start: slotStart, end: slotEnd, accepted, rejected } = slot;

        // Check for intersection
        const intersectionStart = Math.max(slotStart, guestStart);
        const intersectionEnd = Math.min(slotEnd, guestEnd);

        if (intersectionStart < intersectionEnd) {
          // Break slot into subslots: before, during, and after
          if (slotStart < intersectionStart) {
            newSlots.push({
              start: slotStart,
              end: intersectionStart,
              accepted,
              rejected: [
                ...rejected,
                {
                  user_id: guest.user_id,
                  user_name: guest.user_name,
                  user_email: guest.user_email,
                },
              ],
            });
          }
          newSlots.push({
            start: intersectionStart,
            end: intersectionEnd,
            accepted: [
              ...accepted,
              {
                user_id: guest.user_id,
                user_name: guest.user_name,
                user_email: guest.user_email,
              },
            ],
            rejected,
          });
          if (intersectionEnd < slotEnd) {
            newSlots.push({
              start: intersectionEnd,
              end: slotEnd,
              accepted,
              rejected: [
                ...rejected,
                {
                  user_id: guest.user_id,
                  user_name: guest.user_name,
                  user_email: guest.user_email,
                },
              ],
            });
          }
        } else {
          // No intersection, this guest is rejected for this slot
          newSlots.push({
            ...slot,
            rejected: [
              ...rejected,
              {
                user_id: guest.user_id,
                user_name: guest.user_name,
                user_email: guest.user_email,
              },
            ],
          });
        }
      }

      currentSlots = newSlots;
    }

    // Transform final subslots into IntervalResult format
    const intervalsForDate: IntervalResult[] = currentSlots.map((slot) => ({
      date,
      start: minutesToTime(slot.start),
      end: minutesToTime(slot.end),
      accepted: slot.accepted,
      rejected: slot.rejected,
    }));

    result.push(...intervalsForDate);
  }

  return result;
}

export default matchAvailabilities;
