// function for formatting date for API
export function getFormattedDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  // Handle edge case for previous day at the start of the month
  const previousDate = new Date(today);
  previousDate.setDate(today.getDate() - 1);
  const prevYear = previousDate.getFullYear();
  const prevMonth = String(previousDate.getMonth() + 1).padStart(2, '0');
  const prevDay = String(previousDate.getDate()).padStart(2, '0');
  const previousDateFormatted = `${prevYear}-${prevMonth}-${prevDay}`;

  return { currentDate, previousDate: previousDateFormatted };
}
