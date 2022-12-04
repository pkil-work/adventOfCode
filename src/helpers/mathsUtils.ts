export const sumArray = (arrayOfNumbers: number[]): number => {
  return arrayOfNumbers.reduce((accumulator, number) => accumulator + number, 0);
};

export const maximumValueOfArray = (arrayOfNumbers: number[]): number => {
  return Math.max(...arrayOfNumbers);
};

export const minimumValueOfArray = (arrayOfNumbers: number[]): number => {
  return Math.min(...arrayOfNumbers);
};

export const meanOfArray = (arrayOfNumbers: number[]): number => {
  return sumArray(arrayOfNumbers) / arrayOfNumbers.length;
};
