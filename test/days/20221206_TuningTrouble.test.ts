import { TuningTrouble } from "../../src/days/20221206_TuningTrouble";

describe("2022 Day 6 - Tuning Trouble", () => {
  const example001FilePath: string = "../resources/20221206-example-001.txt";
  const example002FilePath: string = "../resources/20221206-example-002.txt";
  const example003FilePath: string = "../resources/20221206-example-003.txt";
  const example004FilePath: string = "../resources/20221206-example-004.txt";
  const example005FilePath: string = "../resources/20221206-example-005.txt";
  const inputFilePath: string = "../resources/20221206-input.txt";

  describe("TuningTrouble", () => {
    describe(".loadStream", () => {
      it("loads a 'datastream buffer' from a file as a string", () => {
        let tuner: TuningTrouble = new TuningTrouble();
        tuner.loadStream(example001FilePath);
        expect(tuner.stream).toEqual("mjqjpqmgbljsphdztnvjfqwrcgsmlb");
      });
    });

    describe(".positionOfFirstCharacterAfterStartOfPacketMarker", () => {
      describe("when a start-of-data marker is length 4", () => {
        const startOfPacketMarkerLength: number = 4;
        it("returns 7 for the first example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example001FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(7);
        });
        it("returns 5 for the second example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example002FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(5);
        });
        it("returns 6 for the third example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example003FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(6);
        });
        it("returns 10 for the fourth example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example004FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(10);
        });
        it("returns 11 for the fifth example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example005FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(11);
        });
        it("returns 1198 for the input data", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(inputFilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(1198);
        });
      });
      describe("when a start-of-message marker is length 14", () => {
        const startOfPacketMarkerLength: number = 14;
        it("returns 19 for the first example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example001FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(19);
        });
        it("returns 23 for the second example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example002FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(23);
        });
        it("returns 23 for the third example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example003FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(23);
        });
        it("returns 29 for the fourth example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example004FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(29);
        });
        it("returns 26 for the fifth example", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(example005FilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(26);
        });
        it("returns 3120 for the input data", () => {
          let tuner: TuningTrouble = new TuningTrouble();
          tuner.loadStream(inputFilePath);
          expect(tuner.positionOfFirstCharacterAfterStartOfPacketMarker(startOfPacketMarkerLength)).toEqual(3120);
        });
      });
    });
  });
});
