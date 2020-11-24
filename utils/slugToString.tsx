export const slugToString = (str: string): string =>
  str
    .split('-')
    .map((str: string) => str.slice(0, 1).toUpperCase() + str.slice(1))
    .join(' ');
