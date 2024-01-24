const transformString = ({ str: [first, ...rest], upperCase = true }) => {
  if (!first) return '';

  const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase();

  return [firstLetter, ...rest].join('');
};

export const upperCaseFirstLetter = (str) => {
  return transformString({ str });
};

export const lowerCaseFirstLetter = (str) => {
  return transformString({ str, upperCase: false });
};
