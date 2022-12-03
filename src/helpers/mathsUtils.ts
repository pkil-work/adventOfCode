export const sumArray = (arrayOfNumbers: number[]): number => {
    return arrayOfNumbers.reduce((accumulator, number) => accumulator + number, 0);
}

export const maximumValueOfArray = (arrayOfNumbers: number[]): number => {
    return Math.max(...arrayOfNumbers);
}