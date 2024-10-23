export const FormatTime = (time: number) => {
  const formatedTime = Math.floor(time / 60);
  const remainingMinutes = time % 60;
  const formattedMinutes =
    remainingMinutes === 0 ? '00' : remainingMinutes.toString();

  if (formatedTime === 0) {
    return `${formattedMinutes}min`;
  }
  return `${formatedTime}h${formattedMinutes}`;
};
