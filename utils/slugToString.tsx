export const slugToString = (str: string): string =>
  str
    .split('-')
    .map((str: string) => str.slice(0, 1).toUpperCase() + str.slice(1))
    .join(' ');

export const slugToAuthor = (str: string): string => {
  const newStr = str.split('-');

  if (newStr.length > 2) {
    const result: string[] = [];
    let previous: string = '';
    newStr.forEach((word) => {
      if (!word) {
        result.push(previous);
        previous = '';
      } else {
        if (previous) {
          previous += ` ${slugToString(word)}`;
        } else {
          previous = slugToString(word);
        }
      }
    });
    if (previous) {
      result.push(previous);
    }
    console.log(newStr, result);
    return result.join(' & ');
  }
  return slugToString(str);
};
