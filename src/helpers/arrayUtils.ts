export const groupIntoChunks = (array: (string | number)[], chunkSize: number): (string | number)[][] => {
  let workingCopy: (string | number)[] = [...array];
  let returnGroups: (string | number)[][] = [];
  while (workingCopy.length > 0) {
    let chunk: (string | number)[] = workingCopy.splice(0, chunkSize);
    returnGroups.push(chunk);
  }
  return returnGroups;
};
