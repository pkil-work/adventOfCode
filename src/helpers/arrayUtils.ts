export const groupIntoChunks = (array: (string | number)[], chunkSize: number): (string | number)[][] => {
  let workingCopy: (string | number)[] = [...array];
  let returnGroups: (string | number)[][] = [];
  while (workingCopy.length > 0) {
    let chunk: (string | number)[] = workingCopy.splice(0, chunkSize);
    returnGroups.push(chunk);
  }
  return returnGroups;
};

export const removeDuplicates = (array: (string | number)[]): (string | number)[] => {
  return Array.from(new Set(array));
};

export const reverseArray = (array: (string | number)[]): (string | number)[] => {
  return array.reverse();
};

export const countTrueValuesInArray = (array: boolean[]): number => {
  return array.filter((value) => value).length;
};
