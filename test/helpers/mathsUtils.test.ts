import { sumArray, maximumValueOfArray, minimumValueOfArray, meanOfArray } from "../../src/helpers/mathsUtils";

describe("2022 Maths Utilities", () => {
  const exampleDataSet: number[] = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
  describe("sumArray", () => {
    it("returns the sum of an array of numbers", () => {
      expect(sumArray(exampleDataSet)).toEqual(49);
    });
  });
  describe("maximumValueOfArray", () => {
    it("returns the highest number from an array of numbers", () => {
      expect(maximumValueOfArray(exampleDataSet)).toEqual(16);
    });
  });
  describe("minimumValueOfArray", () => {
    it("returns the lowest number from an array of numbers", () => {
      expect(minimumValueOfArray(exampleDataSet)).toEqual(0);
    });
  });
  describe("meanOfArray", () => {
    it("returns the arithmetic mean of an array of numbers", () => {
      expect(meanOfArray(exampleDataSet)).toEqual(4.9);
    });
  });
});
