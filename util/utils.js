const trauncateString = (string) => {
  const link = string.slice(0, 20);
  return `${link}...`;
};

export default trauncateString;
