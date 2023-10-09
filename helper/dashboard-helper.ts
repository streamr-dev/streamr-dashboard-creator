export const extractDataFromMessage = (
  message: any,
  dataPath: string,
  labelPath: string | null
) => {
  const getNestedValue = (obj: any, path: string | null) => {
    if (!path) {
      return undefined;
    }
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return {
    label: getNestedValue(message, labelPath),
    data: getNestedValue(message, dataPath),
  };
};

export const formatDateToCustomFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11, padStart ensures it's always 2 digits
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
