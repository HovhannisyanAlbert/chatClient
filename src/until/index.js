export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
export function formatTimestamp(timestamp) {
  let date = new Date(timestamp);

  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract the desired components
  let month = monthNames[date.getUTCMonth()];
  let day = date.getUTCDate() - 1; // subtract 1 to get the previous day
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes().toString().padStart(2, "0");

  let formattedDate = `${month} ${day} ${hours}:${minutes}`;

  return formattedDate;
}
