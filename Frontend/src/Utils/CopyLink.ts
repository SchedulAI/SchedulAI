export const copyLinkToClipboard = (scheduleId: string) => {
  const currentUrl = window.location.origin;
  const inviteLink = `${currentUrl}/invite/${scheduleId}`;

  navigator.clipboard.writeText(inviteLink);
};
