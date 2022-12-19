import { rowsToColumns } from "../../src/helpers/matrixUtils";

describe("rowsToColumns", () => {
  it("transposes an array of rows into an array of columns", () => {
    let input = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    let expectedOutput = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];
    expect(rowsToColumns(input)).toEqual(expectedOutput);
  });
});
