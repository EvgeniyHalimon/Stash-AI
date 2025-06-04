export const formatDate = (isoString: Date): string => {
  const formatter = new Intl.DateTimeFormat('ua-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour12: false,
  });
  const date = new Date(isoString);
  // Format the date
  return formatter.format(date);
};
