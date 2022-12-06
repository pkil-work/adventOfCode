import { groupIntoChunks, removeDuplicates } from "../../src/helpers/arrayUtils";

describe("groupIntoChunks", () => {
  it("groups strings into fours  when given an array of strings and chunk size 4", () => {
    let input = ["111a11", "22a222", "3a3333", "4B4444", "55555B", "6666B6", "777777", "888888"];
    let expectedOutput = [
      ["111a11", "22a222", "3a3333", "4B4444"],
      ["55555B", "6666B6", "777777", "888888"],
    ];
    expect(groupIntoChunks(input, 4)).toEqual(expectedOutput);
  });
  it("groups numbers into threes when given an array of numbers and chunk size 3", () => {
    let input = [1, 2, 3, 4, 5, 6];
    let expectedOutput = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(groupIntoChunks(input, 3)).toEqual(expectedOutput);
  });
  it("groups numbers into twos when given an array of numbers and chunk size 2", () => {
    let input = [1, 2, 3, 4, 5, 6];
    let expectedOutput = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(groupIntoChunks(input, 2)).toEqual(expectedOutput);
  });
});
describe("removeDuplicates", () => {
  it("returns an array of numbers with duplicates removed", () => {
    let input = [1, 2, 3, 4, 5, 7, 6, 5, 4, 3];
    let expectedOutput = [1, 2, 3, 4, 5, 7, 6];
    expect(removeDuplicates(input)).toEqual(expectedOutput);
  });
  it("returns an array of strings with duplicates removed", () => {
    let input = ["abc", "def", "abc", "ghi", "def", "jkl"];
    let expectedOutput = ["abc", "def", "ghi", "jkl"];
    expect(removeDuplicates(input)).toEqual(expectedOutput);
  });
});