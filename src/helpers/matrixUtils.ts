import { maximumValueOfArray } from "./mathsUtils";

export const rowsToColumns = (rows: (string | number)[][]): (string | number)[][] => rows[0].map((col, i) => rows.map((row) => row[i]));

export const maximumValueOfMatrix = (matrix: number[][]) => {
  let rowMaximums: number[] = matrix.map((row) => maximumValueOfArray(row));
  let maximumValue: number = maximumValueOfArray(rowMaximums);

  return maximumValue;
};
