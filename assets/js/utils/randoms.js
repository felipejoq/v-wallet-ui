export function generateRandomPastDate() {
  const currentDate = new Date();
  const randomDays = Math.floor(Math.random() * 30) + 1;
  const randomDate = new Date(currentDate);
  randomDate.setDate(currentDate.getDate() - randomDays);
  return randomDate;
}