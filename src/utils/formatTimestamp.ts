export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString();
};
