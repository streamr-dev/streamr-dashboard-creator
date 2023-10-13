export const extractDataFromMessage = (
  message: any,
  dataPath: string,
  labelPath: string | null
) => {
  return {
    label: getNestedValue(message, labelPath),
    data: getNestedValue(message, dataPath),
  };
};

export const getNestedValue = (obj: any, path: string | null) => {
  if (!path) {
    return undefined;
  }

  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const formatDateToCustomFormat = (date: Date): string => {
  /* const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11, padStart ensures it's always 2 digits
  const day = String(date.getDate()).padStart(2, '0'); */
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Counts unique values for your messages
 * @param {string}  messages - The stream messages you get from subscribing
 * @param {string} arrayPath - The data path that should lead to an array - leave empty if message is the array
 * @param {string} filterFor - In case for an object array provide the parameter it should filter for (e.g. id)
 * @returns {number} amount of unique values
 */
export const countUnique = (
  messages: unknown[],
  dataPath?: string,
  filterFor?: string
): number => {
  const data = dataPath ? getNestedValue(messages, dataPath) : messages;
  if (Array.isArray(data)) {
    let itemsToConsider = data;

    // If filterFor is provided and the items in the array are objects, extract the desired property
    if (filterFor && typeof data[0] === 'object' && data[0] !== null) {
      itemsToConsider = data.map((item) => item[filterFor]);
    }

    const uniqueSet = new Set(itemsToConsider);
    return uniqueSet.size;
  } else {
    console.error('Provided data is not an array.');
    return 0;
  }
};
