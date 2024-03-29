import { Coordinates, Knot, Motion, Rope, RopeBridge } from "../../src/days/20221209_RopeBridge";

describe.skip("2022 Day 9 - Rope Bridge", () => {
  const exampleFilePath: string = "../resources/20221209-example.txt";
  const inputFilePath: string = "../resources/20221209-input.txt";

  describe("RopeBridge", () => {
    let rope: RopeBridge;
    beforeEach(() => {
      rope = new RopeBridge();
    });
    describe(".loadSeriesOfMotions", () => {
      describe("using the example data", () => {
        it("loads the rope movement data into an array of arrays of directions and distances", () => {
          let expectedMotions: Motion[] = [
            ["R", 4],
            ["U", 4],
            ["L", 3],
            ["D", 1],
            ["R", 4],
            ["D", 1],
            ["L", 5],
            ["R", 2],
          ];
          rope.loadSeriesOfMotions(exampleFilePath);
          expect(rope.motions).toEqual(expectedMotions);
        });
      });
      describe("using the input data", () => {
        it("loads the rope movement data into an array of arrays of directions and distances", () => {
          rope.loadSeriesOfMotions(inputFilePath);
          expect(rope.motions.length).toEqual(2000);
        });
      });
    });
    describe(".countVisitedPositions", () => {
      describe("with a tail at position 1 (rope length of 2)", () => {
        it("returns 13 for the example data", () => {
          rope.loadSeriesOfMotions(exampleFilePath);
          rope.simulateTailMovements();

          expect(rope.countVisitedPositions()).toEqual(13);
        });
        it("returns 6376 for the input data", () => {
          rope.loadSeriesOfMotions(inputFilePath);
          rope.simulateTailMovements();
          expect(rope.countVisitedPositions()).toEqual(6376);
        });
      });
      describe("with a tail at position 9 (rope length of 10)", () => {
        it("returns 36 for the second larger example", () => {
          let largerExample: Motion[] = [
            ["R", 5],
            ["U", 8],
            ["L", 8],
            ["D", 3],
            ["R", 17],
            ["D", 10],
            ["L", 25],
            ["U", 20],
          ];
          rope.motions = largerExample;
          rope.simulateTailMovements(10);
          expect(rope.countVisitedPositions()).toEqual(36);
        });
        it("returns 2565 for the input data", () => {
          rope = new RopeBridge();
          rope.loadSeriesOfMotions(inputFilePath);
          rope.simulateTailMovements(10);
          expect(rope.countVisitedPositions()).toEqual(2565);
        });
      });
    });
    describe(".simulateTailMovements", () => {
      describe("using the example data", () => {
        it("adds the positions visited by the tail to the visitedPositions set", () => {
          rope.loadSeriesOfMotions(exampleFilePath);
          rope.simulateTailMovements();
          expect(rope.visitedPositions.size).toEqual(13);
        });
      });
    });
    describe(".simulateTailMovement", () => {
      it("returns the final tail position (when it is again adjacent to the head)", () => {
        let startTailPosition: Coordinates = [0, 0];
        let endHeadPosition: Coordinates = [3, 6];
        let expectedEndTailPosition: Coordinates = [3, 5];
        expect(rope.simulateKnotMovement(startTailPosition, endHeadPosition)).toEqual(expectedEndTailPosition);
        expect(rope.countVisitedPositions()).toEqual(6);
      });
    });
    describe(".isKnotAdjacentToParent", () => {
      it("returns true if the tail and head of the rope are adjacent", () => {
        let mockTailPosition: Coordinates = [0, 1];
        let mockHeadPosition: Coordinates = [0, 1];
        expect(rope.isKnotAdjacentToParent(mockTailPosition, mockHeadPosition)).toEqual(true);
      });
      it("returns false if the tail and head of the rope are not adjacent", () => {
        let mockTailPosition: Coordinates = [0, 2];
        let mockHeadPosition: Coordinates = [0, -1];
        expect(rope.isKnotAdjacentToParent(mockTailPosition, mockHeadPosition)).toEqual(false);
      });
    });

    describe(".getHeadPositionAfterStep", () => {
      let initialPosition: Coordinates = [0, 0];
      let motionStep: Motion;
      let expectedFinalPosition: Coordinates;
      it("throws an error if given a direction string that is not one of the four expected", () => {
        motionStep = ["B", 0];
        expect(() => rope.getHeadPositionAfterStep(initialPosition, motionStep)).toThrowError("The direction string is an unexpected value (Not U, D, L, or R)");
      });
      it("returns an x and y position after being given an initial position and the motion step with a U", () => {
        motionStep = ["U", 3];
        expectedFinalPosition = [0, 3];
        expect(rope.getHeadPositionAfterStep(initialPosition, motionStep)).toEqual(expectedFinalPosition);
      });
      it("returns an x and y position after being given an initial position and the motion step with an R", () => {
        motionStep = ["R", 4];
        expectedFinalPosition = [4, 0];
        expect(rope.getHeadPositionAfterStep(initialPosition, motionStep)).toEqual(expectedFinalPosition);
      });
      it("returns an x and y position after being given an initial position and the motion step with a D", () => {
        motionStep = ["D", 5];
        expectedFinalPosition = [0, -5];
        expect(rope.getHeadPositionAfterStep(initialPosition, motionStep)).toEqual(expectedFinalPosition);
      });
      it("returns an x and y position after being given an initial position and the motion step with an L", () => {
        motionStep = ["L", 2];
        expectedFinalPosition = [-2, 0];
        expect(rope.getHeadPositionAfterStep(initialPosition, motionStep)).toEqual(expectedFinalPosition);
      });
    });
  });

  describe("Knot", () => {
    describe(".stepTowardDestination", () => {
      it("updates the position of a knot to be one step towards its destination", () => {
        let knot = new Knot(0, [0, 0]);
        knot.stepTowardDestination([4, 0])
        expect(knot.position).toEqual([1, 0]);
      });
      it("updates the position of a knot to be one step towards its destination a second time", () => {
        let knot = new Knot(0, [0, 0]);
        knot.stepTowardDestination([4, 0])
        knot.stepTowardDestination([4, 0])
        expect(knot.position).toEqual([2, 0]);
      });
      it("adds the step to the path when it is the Tail knot", () => {
        let knot = new Knot(0, [0, 0]);
        knot.setTail(true);
        knot.stepTowardDestination([4, 0]);
        expect(knot.position).toEqual([1, 0]);
        expect(knot.path.size).toEqual(1);
      });
    });
  });

  describe("Rope", () => {
    describe(".setHeadDestination", () => {
      it("sets the headDestination and updates the knots within the rope", () => {
        let rope = new Rope(1);
        rope.setHeadDestination([4, 0])
        let expectedKnots = [new Knot(0, [4, 0])];
        let expectedPathSet = new Set<string>();
        expectedPathSet.add("[0,0]");
        expectedPathSet.add("[1,0]");
        expectedPathSet.add("[2,0]");
        expectedPathSet.add("[3,0]");
        expectedPathSet.add("[4,0]");
        expectedKnots[0].path = expectedPathSet;
        expectedKnots[0].setTail(true);
        expect(rope.knots).toEqual(expectedKnots);
      });
      it("adds the step to the path when it is the Tail rope", () => {
        let rope = new Knot(0, [0, 0]);
        rope.setTail(true);
        rope.stepTowardDestination([4, 0]);
        expect(rope.position).toEqual([1, 0]);
        expect(rope.path.size).toEqual(2);
      });
    });
  });

});
