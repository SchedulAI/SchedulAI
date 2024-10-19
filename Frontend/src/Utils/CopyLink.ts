export const copyLinkToClipboard = (scheduleId: string) => {
  const currentUrl = window.location.href;
  const inviteLink = `${currentUrl}/invites/${scheduleId}`;

  navigator.clipboard.writeText(inviteLink);
};
