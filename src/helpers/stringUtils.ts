export const splitToNumbers = (inputString: string, splitCharacter: string): number[] => {
  return inputString.split(splitCharacter).map(Number);
};
