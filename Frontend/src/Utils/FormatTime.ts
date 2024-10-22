export const FormatTime = (time: number) => {
  const formatedTime = time / 60;
  const remainingMinutes = time % 60;
  const formattedMinutes =
    remainingMinutes === 0 ? '00' : remainingMinutes.toString();
  return `${formatedTime}h${formattedMinutes}`;
};
