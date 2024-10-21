interface TimeSlot {
  date: Date;
  startTime: string;
  endTime: string;
  userId: string;
}

interface UserInfo {
  user_id: string;
  user_name: string;
  user_email: string;
}

interface PossibleDate {
  proposed_date: string;
  accepted: UserInfo[];
  rejected: UserInfo[];
}

export interface AvailabilityWithUser {
  id: string;
  schedule_id: string;
  user_id: string;
  week_day: string | null;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  user_name: string;
  user_email: string;
}

export default function findPossibleScheduleDates(
  hostAvailability: AvailabilityWithUser[],
  guestAvailability: AvailabilityWithUser[],
  duration: number
): PossibleDate[] {
  console.log('Disponibilidades do host:', hostAvailability);

  console.log('Disponibilidades dos guests:', guestAvailability);

  function getTimeSlots(availability: AvailabilityWithUser[]): TimeSlot[] {
    const slots: TimeSlot[] = [];

    for (const slot of availability) {
      if (slot.week_day && slot.start_time && slot.end_time) {
        slots.push({
          date: new Date(slot.week_day),
          startTime: slot.start_time,
          endTime: slot.end_time,
          userId: slot.user_id, // Adicionando userId para rastrear
        });
      }
    }

    return slots;
  }

  function isTimeInSlot(
    date: Date,
    time: string,
    endTime: string,
    slot: TimeSlot
  ): boolean {
    const sameDay =
      date.toISOString().split('T')[0] ===
      slot.date.toISOString().split('T')[0];
    return sameDay && time >= slot.startTime && endTime <= slot.endTime;
  }

  function generatePossibleTimes(
    date: Date,
    startTime: string,
    endTime: string,
    durationMinutes: number
  ): Array<{ start: string; end: string }> {
    const slots: Array<{ start: string; end: string }> = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let currentMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    // Enquanto houver espaço suficiente para uma reunião
    while (currentMinutes + durationMinutes <= endMinutes) {
      // Formata o horário de início
      const start = `${Math.floor(currentMinutes / 60)
        .toString()
        .padStart(2, '0')}:${(currentMinutes % 60)
        .toString()
        .padStart(2, '0')}`;

      // Calcula o horário de término somando a duração
      const endTimeMinutes = currentMinutes + durationMinutes;
      const end = `${Math.floor(endTimeMinutes / 60)
        .toString()
        .padStart(2, '0')}:${(endTimeMinutes % 60)
        .toString()
        .padStart(2, '0')}`;

      slots.push({ start, end });

      // Incrementa de 30 em 30 minutos
      currentMinutes += 30;
    }

    return slots;
  }

  const hostSlots = getTimeSlots(hostAvailability);
  const guestSlots = getTimeSlots(guestAvailability);

  const possibleDates: Map<
    string,
    {
      dateTime: string;
      score: number;
      accepted: UserInfo[];
      rejected: UserInfo[];
    }
  > = new Map();

  // Criar um Map de todos os convidados únicos para fácil acesso às informações
  const uniqueGuests = new Map<string, UserInfo>();
  guestAvailability.forEach((guest) => {
    if (!uniqueGuests.has(guest.user_id)) {
      uniqueGuests.set(guest.user_id, {
        user_id: guest.user_id,
        user_name: guest.user_name,
        user_email: guest.user_email,
      });
    }
  });

  const totalGuests = uniqueGuests.size;

  for (const hostSlot of hostSlots) {
    const possibleTimes = generatePossibleTimes(
      hostSlot.date,
      hostSlot.startTime,
      hostSlot.endTime,
      duration
    );

    for (const timeSlot of possibleTimes) {
      const acceptedUsers: UserInfo[] = [];
      const rejectedUsers: UserInfo[] = [];

      // Verificar cada convidado individualmente
      uniqueGuests.forEach((userInfo, userId) => {
        const userSlots = guestSlots.filter((slot) => slot.userId === userId);
        const canAttend = userSlots.some((slot) =>
          isTimeInSlot(hostSlot.date, timeSlot.start, timeSlot.end, slot)
        );

        if (canAttend) {
          acceptedUsers.push(userInfo);
        } else {
          rejectedUsers.push(userInfo);
        }
      });

      if (acceptedUsers.length > 0) {
        const dateObj = new Date(hostSlot.date);

        dateObj.setHours(
          parseInt(timeSlot.start.split(':')[0]),
          parseInt(timeSlot.start.split(':')[1])
        );

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        // Obtenha o offset do fuso horário em horas e minutos
        const timezoneOffset = -dateObj.getTimezoneOffset();
        const offsetHours = String(
          Math.floor(Math.abs(timezoneOffset) / 60)
        ).padStart(2, '0');
        const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(
          2,
          '0'
        );
        const offsetSign = timezoneOffset >= 0 ? '+' : '-';

        // Formate a string de data e hora no formato desejado
        const proposedDateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;

        const score = acceptedUsers.length / totalGuests;

        possibleDates.set(proposedDateStr, {
          dateTime: proposedDateStr,
          score,
          accepted: acceptedUsers,
          rejected: rejectedUsers,
        });
      }
    }
  }

  const sortedDates = Array.from(possibleDates.values())
    .sort((a, b) => b.score - a.score)
    .map((date, index) => ({
      proposed_date: date.dateTime,
      accepted: date.accepted,
      rejected: date.rejected,
    }));

  return sortedDates;
}
