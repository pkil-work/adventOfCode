import { TreetopTreeHouse } from "../../src/days/20221208_TreetopTreeHouse";

describe("2022 Day 8 - Treetop Tree House", () => {
  const exampleFilePath: string = "../resources/20221208-example.txt";
  const inputFilePath: string = "../resources/20221208-input.txt";

  describe("TreetopTreeHouse", () => {
    describe(".loadForest", () => {
      it("loads the tree data into a matrix of numbers", () => {
        let counter: TreetopTreeHouse = new TreetopTreeHouse();
        let expectedMatrixRows: number[][] = [
          [3, 0, 3, 7, 3],
          [2, 5, 5, 1, 2],
          [6, 5, 3, 3, 2],
          [3, 3, 5, 4, 9],
          [3, 5, 3, 9, 0],
        ];
        let expectedMatrixColumns: number[][] = [
          [3, 2, 6, 3, 3],
          [0, 5, 5, 3, 5],
          [3, 5, 3, 5, 3],
          [7, 1, 3, 4, 9],
          [3, 2, 2, 9, 0],
        ];
        counter.loadForest(exampleFilePath);
        expect(counter.forestRows).toEqual(expectedMatrixRows);
        expect(counter.forestColumns).toEqual(expectedMatrixColumns);
      });
    });
    describe(".loadForest", () => {
      it("returns false for the middle tree in the example data", () => {
        let counter: TreetopTreeHouse = new TreetopTreeHouse();
        counter.loadForest(exampleFilePath);
        expect(counter.isTreeVisible(2, 2)).toEqual(false);
      });
    });
    describe(".countVisibleTrees", () => {
      it("returns 21 for the example data set", () => {
        let counter: TreetopTreeHouse = new TreetopTreeHouse();
        counter.loadForest(exampleFilePath);
        expect(counter.countVisibleTrees()).toEqual(21);
      });
      it("returns 1801 for the input data set", () => {
        let counter: TreetopTreeHouse = new TreetopTreeHouse();
        counter.loadForest(inputFilePath);
        expect(counter.countVisibleTrees()).toEqual(1801);
      });
    });
    describe(".filterToVisibleTrees", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      it("returns the visible trees from a row of trees", () => {
        let inputTrees: number[] = [3, 5, 3, 9, 0];
        let expectedOutput: number[] = [3, 5, 9];
        expect(counter.filterToVisibleTrees(inputTrees)).toEqual(expectedOutput);
      });
    });
    describe(".getTreesAbove", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      counter.loadForest(exampleFilePath);
      it("returns an array of the trees above this tree for 2,2", () => {
        let expectedOutput: number[] = [3, 5];
        expect(counter.getTreesAbove(2, 2)).toEqual(expectedOutput);
      });
      it("returns an array of the trees above this tree for 4,2", () => {
        let expectedOutput: number[] = [3, 5, 3, 5];
        expect(counter.getTreesAbove(4, 2)).toEqual(expectedOutput);
      });
    });
    describe(".getTreesBelow", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      counter.loadForest(exampleFilePath);
      it("returns an array of the trees below this tree for 2,2", () => {
        let expectedOutput: number[] = [5, 3];
        expect(counter.getTreesBelow(2, 2)).toEqual(expectedOutput);
      });
      it("returns an array of the trees below this tree for 0,2", () => {
        let expectedOutput: number[] = [5, 3, 5, 3];
        expect(counter.getTreesBelow(0, 2)).toEqual(expectedOutput);
      });
      it("returns an empty array of the trees below this tree for 4,2", () => {
        let expectedOutput: number[] = [];
        expect(counter.getTreesBelow(4, 2)).toEqual(expectedOutput);
      });
    });
    describe(".getTreesToLeft", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      counter.loadForest(exampleFilePath);
      it("returns an array of the trees to the left of this tree for row 2, column 2", () => {
        let expectedOutput: number[] = [6, 5];
        expect(counter.getTreesToLeft(2, 2)).toEqual(expectedOutput);
      });
      it("returns an array of the trees to the left of this tree for row 0, column 2", () => {
        let expectedOutput: number[] = [3, 0];
        expect(counter.getTreesToLeft(0, 2)).toEqual(expectedOutput);
      });
      it("returns an empty array of the trees to the left of this tree for row 1, column 4", () => {
        let expectedOutput: number[] = [2, 5, 5, 1];
        expect(counter.getTreesToLeft(1, 4)).toEqual(expectedOutput);
      });
    });
    describe(".getTreesToRight", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      counter.loadForest(exampleFilePath);
      it("returns an array of the trees to the right of this tree for row 2, column 2", () => {
        let expectedOutput: number[] = [3, 2];
        expect(counter.getTreesToRight(2, 2)).toEqual(expectedOutput);
      });
      it("returns an array of the trees to the right of this tree for row 0, column 2", () => {
        let expectedOutput: number[] = [7, 3];
        expect(counter.getTreesToRight(0, 2)).toEqual(expectedOutput);
      });
      it("returns an empty array of the trees to the right of this tree for row 1, column 0", () => {
        let expectedOutput: number[] = [5, 5, 1, 2];
        expect(counter.getTreesToRight(1, 0)).toEqual(expectedOutput);
      });
    });
    describe(".mapToVisibility", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      describe("for the example data", () => {
        counter.loadForest(exampleFilePath);
        it("returns a matrix of boolean values representing visibility", () => {
          let expectedOutput: boolean[][] = [
            [true, true, true, true, true],
            [true, true, true, false, true],
            [true, true, false, true, true],
            [true, false, true, false, true],
            [true, true, true, true, true],
          ];
          expect(counter.mapToVisibility()).toEqual(expectedOutput);
        });
      });
    });
    describe(".isTreeVisible", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      describe("for the example data", () => {
        counter.loadForest(exampleFilePath);
        it("returns true for tree at row 1 and column 1", () => {
          expect(counter.isTreeVisible(1, 1)).toEqual(true);
        });
        it("returns false for tree at row 2 and column 2", () => {
          expect(counter.isTreeVisible(2, 2)).toEqual(false);
        });
        it("returns false for tree at row 3 and column 3", () => {
          expect(counter.isTreeVisible(3, 3)).toEqual(false);
        });
      });
    });
    describe(".getScenicScoreForTree", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      describe("for the example data", () => {
        counter.loadForest(exampleFilePath);
        it("returns 4 for tree at row 1 and column 2", () => {
          expect(counter.getScenicScoreForTree(1, 2)).toEqual(4);
        });
        it("returns 8 for tree at row 3 and column 3", () => {
          expect(counter.getScenicScoreForTree(3, 2)).toEqual(8);
        });
        it("returns 0 for tree at row 0 and column 0 (On an edge)", () => {
          expect(counter.getScenicScoreForTree(0, 0)).toEqual(0);
        });
      });
    });
    describe(".getMaximumScenicScore", () => {
      let counter: TreetopTreeHouse = new TreetopTreeHouse();
      it("returns 8 for the example data", () => {
        counter.loadForest(exampleFilePath);
        expect(counter.getMaximumScenicScore()).toEqual(8);
      });
      it("returns 209880 for the input data", () => {
        counter.loadForest(inputFilePath);
        expect(counter.getMaximumScenicScore()).toEqual(209880);
      });
    });
  });
});
