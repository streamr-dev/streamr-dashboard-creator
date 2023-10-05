export const extractDataFromMessage = (
  message: any,
  labelPath: string,
  dataPath: string
) => {
  const getNestedValue = (obj: any, path: string) =>
    path.split('.').reduce((acc, part) => acc && acc[part], obj);

  return {
    label: getNestedValue(message, labelPath),
    data: getNestedValue(message, dataPath),
  };
};
