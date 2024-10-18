import { Availability } from '../entities/availabilityEntity';

const formatAvailability = (availability: Availability) => {
  const weekDay = new Date(availability.week_day!);

  const day = String(weekDay.getDate()).padStart(2, '0');
  const month = String(weekDay.getMonth() + 1).padStart(2, '0');
  const year = weekDay.getFullYear();

  const startTime = availability.start_time!.slice(0, 5); // hh:mm
  const endTime = availability.end_time!.slice(0, 5); // hh:mm

  return `**${day}/${month}/${year}** das **${startTime}** até **${endTime}**`;
};

export default formatAvailability;
