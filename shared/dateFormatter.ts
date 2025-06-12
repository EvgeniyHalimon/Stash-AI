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

export const formatLocalDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const formatDateForInput = (dateString: string | Date): string => {
  const date = new Date(dateString);

  return date.toISOString().split('T')[0];
};
