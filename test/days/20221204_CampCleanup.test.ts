import { CampCleanup } from "../../src/days/20221204_CampCleanup";

describe("2022 Day 4 - Camp Cleanup", () => {
  const exampleDataSetFilePath: string = "../resources/20221204-example.txt";
  const inputSnippetFilePath: string = "../resources/20221204-snippet.txt";
  const inputDataSetFilePath: string = "../resources/20221204-input.txt";

  describe("CampCleanup", () => {
    describe(".getFullyEncompassedSections", () => {
      it("returns 2 for the example data set", () => {
        let cleanup: CampCleanup = new CampCleanup();
        cleanup.loadSectionAssignments(exampleDataSetFilePath);
        expect(cleanup.getFullyEncompassedSections()).toEqual(2);
      });
      it("returns 5 for the input snippet", () => {
        let cleanup: CampCleanup = new CampCleanup();
        cleanup.loadSectionAssignments(inputSnippetFilePath);
        expect(cleanup.getFullyEncompassedSections()).toEqual(5);
      });
      it("returns 511 for the input data set", () => {
        let cleanup: CampCleanup = new CampCleanup();
        cleanup.loadSectionAssignments(inputDataSetFilePath);
        expect(cleanup.getFullyEncompassedSections()).toEqual(511);
      });
    });
    describe(".getPartiallyEncompassedSections", () => {
      it("returns 4 for the example data set", () => {
        let cleanup: CampCleanup = new CampCleanup();
        cleanup.loadSectionAssignments(exampleDataSetFilePath);
        expect(cleanup.getPartiallyEncompassedSections()).toEqual(4);
      });
      it("returns 10 for the input snippet", () => {
        let cleanup: CampCleanup = new CampCleanup();
        cleanup.loadSectionAssignments(inputSnippetFilePath);
        expect(cleanup.getPartiallyEncompassedSections()).toEqual(10);
      });
      it("returns 821 for the input data set", () => {
        let cleanup: CampCleanup = new CampCleanup();
        cleanup.loadSectionAssignments(inputDataSetFilePath);
        expect(cleanup.getPartiallyEncompassedSections()).toEqual(821);
      });
    });
    describe(".gatherDataFromPair", () => {
      it("returns an object with data extracted from the pair string", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let expectedOutput = {
          firstMin: 2,
          firstMax: 4,
          secondMin: 6,
          secondMax: 8,
        };
        expect(cleanup.gatherDataFromPair("2-4,6-8")).toEqual(expectedOutput);
      });
    });
    describe(".isOneSetWithinOther", () => {
      it("returns 'false' when there is no overlap", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let pairDataWithNoOverlap = {
          firstMin: 2,
          firstMax: 4,
          secondMin: 6,
          secondMax: 8,
        };
        expect(cleanup.isOneSetWithinOther(pairDataWithNoOverlap)).toEqual(false);
      });
      it("returns 'false' when there is an overlap, but one is not completely within the other", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let pairDataWithSomeOverlap = {
          firstMin: 2,
          firstMax: 7,
          secondMin: 6,
          secondMax: 8,
        };
        expect(cleanup.isOneSetWithinOther(pairDataWithSomeOverlap)).toEqual(false);
      });
      it("returns 'true' when the first range is entirely within the second range", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let pairDataWithFirstWithinSecond = {
          firstMin: 2,
          firstMax: 4,
          secondMin: 1,
          secondMax: 8,
        };
        expect(cleanup.isOneSetWithinOther(pairDataWithFirstWithinSecond)).toEqual(true);
      });
      it("returns 'true' when the second range is entirely within the first range", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let pairDataWithSecondWithinFirst = {
          firstMin: 2,
          firstMax: 7,
          secondMin: 5,
          secondMax: 6,
        };
        expect(cleanup.isOneSetWithinOther(pairDataWithSecondWithinFirst)).toEqual(true);
      });
    });
    describe(".isOneSetOverlappingOther", () => {
      it("returns 'false' when there is no overlap", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let pairDataWithNoOverlap = {
          firstMin: 2,
          firstMax: 4,
          secondMin: 6,
          secondMax: 8,
        };
        expect(cleanup.isOneSetOverlappingOther(pairDataWithNoOverlap)).toEqual(false);
      });
      it("returns 'true' when there is an overlap, but one is not completely within the other", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let pairDataWithSomeOverlap = {
          firstMin: 2,
          firstMax: 7,
          secondMin: 6,
          secondMax: 8,
        };
        expect(cleanup.isOneSetOverlappingOther(pairDataWithSomeOverlap)).toEqual(true);
      });
      it("returns 'true' when the first range is entirely within the second range", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let pairDataWithFirstWithinSecond = {
          firstMin: 2,
          firstMax: 4,
          secondMin: 1,
          secondMax: 8,
        };
        expect(cleanup.isOneSetOverlappingOther(pairDataWithFirstWithinSecond)).toEqual(true);
      });
      it("returns 'true' when the second range is entirely within the first range", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let pairDataWithSecondWithinFirst = {
          firstMin: 2,
          firstMax: 7,
          secondMin: 5,
          secondMax: 6,
        };
        expect(cleanup.isOneSetOverlappingOther(pairDataWithSecondWithinFirst)).toEqual(true);
      });
    });
    describe(".mapInputLinesToPairData", () => {
      it("returns an object with data extracted from the pair string", () => {
        let cleanup: CampCleanup = new CampCleanup();
        cleanup.loadSectionAssignments(exampleDataSetFilePath);
        let expectedOutput = [
          {
            firstMax: 4,
            firstMin: 2,
            secondMax: 8,
            secondMin: 6,
          },
          {
            firstMax: 3,
            firstMin: 2,
            secondMax: 5,
            secondMin: 4,
          },
          {
            firstMax: 7,
            firstMin: 5,
            secondMax: 9,
            secondMin: 7,
          },
          {
            firstMax: 8,
            firstMin: 2,
            secondMax: 7,
            secondMin: 3,
          },
          {
            firstMax: 6,
            firstMin: 6,
            secondMax: 6,
            secondMin: 4,
          },
          {
            firstMax: 6,
            firstMin: 2,
            secondMax: 8,
            secondMin: 4,
          },
        ];
        expect(cleanup.mapInputLinesToPairData()).toEqual(expectedOutput);
      });
    });
    describe(".countTrueValues", () => {
      it("counts the number of 'true' values in an array", () => {
        let cleanup: CampCleanup = new CampCleanup();
        let booleanInputs = [true, false, false, true, true];
        expect(cleanup.countTrueValues(booleanInputs)).toEqual(3);
      });
    });
  });
});
