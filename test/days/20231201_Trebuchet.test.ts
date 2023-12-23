import { CalibrationDecoder } from "../../src/days/20231201_Trebuchet";

describe.only("2023 Day 1 - Trebuchet?!", () => {
  const exampleFilePath: string = "../resources/20231201-example-001.txt";
  const exampleTwoFilePath: string = "../resources/20231201-example-002.txt";
  const inputFilePath: string = "../resources/20231201-input.txt";

  describe("Trebuchet", () => {
    let decoder: CalibrationDecoder;
    beforeEach(() => {
      decoder = new CalibrationDecoder();
    });

    describe(".loadRawCalibrationData", () => {
      describe("using the example data", () => {
        it("loads the raw calibration data into an array of strings", () => {
          const expectedRawData: string[] = [
            "1abc2",
            "pqr3stu8vwx",
            "a1b2c3d4e5f",
            "treb7uchet",
          ];
          decoder.loadRawCalibrationData(exampleFilePath);
          expect(decoder.calibrationRawData).toEqual(expectedRawData);
        });
      });
      describe("using the input data", () => {
        it("loads the raw calibration data into an array of strings", () => {
          decoder.loadRawCalibrationData(inputFilePath);
          expect(decoder.calibrationRawData.length).toEqual(1000);
        });
      });
    });

    describe(".decodeCalibrationData", () => {
      describe("using the example data", () => {
        it("without parsing numbers written as strings returns 142", () => {
          decoder.loadRawCalibrationData(exampleFilePath);
          const result = decoder.decodeCalibrationData();

          expect(decoder.calibrationNumericStrings).toEqual(["12", "38", "12345", "7"]);
          expect(decoder.calibrationValues).toEqual([12, 38, 15, 77]);
          expect(result).toEqual(142);
        });
        it("with parsing numbers written as strings returns 281", () => {
          decoder.loadRawCalibrationData(exampleTwoFilePath);
          const result = decoder.decodeCalibrationData(true);

          expect(decoder.calibrationNumericStrings).toEqual(["12", "38", "12345", "7"]);
          expect(decoder.calibrationValues).toEqual([12, 38, 15, 77]);
          expect(result).toEqual(281);
        });
      });
      describe("using the input data", () => {
        it("returns the answer to Day 1 Part 1", () => {
          decoder.loadRawCalibrationData(inputFilePath);
          const result = decoder.decodeCalibrationData();
          expect(result).toEqual(54634);
        });
      });
    });

    describe(".extractNumbersAsCharactersFromString", () => {
      describe("using the example data directly", () => {
        it("returns just the number characters from the example strings", () => {
          const exampleStrings: string[] = [
            "1abc2",
            "pqr3stu8vwx",
            "a1b2c3d4e5f",
            "treb7uchet",
          ];
          expect(decoder.extractNumbersAsCharactersFromString(exampleStrings[0])).toEqual("12");
          expect(decoder.extractNumbersAsCharactersFromString(exampleStrings[1])).toEqual("38");
          expect(decoder.extractNumbersAsCharactersFromString(exampleStrings[2])).toEqual("12345");
          expect(decoder.extractNumbersAsCharactersFromString(exampleStrings[3])).toEqual("7");
        });
      });
      describe("using the example data", () => {
        it("returns just the number characters from the example strings", () => {
          decoder.loadRawCalibrationData(exampleFilePath);
          expect(decoder.extractNumbersAsCharactersFromString(decoder.calibrationRawData[0])).toEqual("12");
          expect(decoder.extractNumbersAsCharactersFromString(decoder.calibrationRawData[1])).toEqual("38");
          expect(decoder.extractNumbersAsCharactersFromString(decoder.calibrationRawData[2])).toEqual("12345");
          expect(decoder.extractNumbersAsCharactersFromString(decoder.calibrationRawData[3])).toEqual("7");
        });
      });
    });

    describe(".extractNumbersAsCharactersFromStringIncludingStringNumbers", () => {
      describe("using the example data directly", () => {
        it("returns just the number characters from the example strings with string numbers converted", () => {
          const exampleStrings: string[] = [
            "two1nine",
            "eightwothree",
            "abcone2threexyz",
            "xtwone3four",
            "4nineeightseven2",
            "zoneight234",
            "7pqrstsixteen",
          ];
          expect(decoder.extractNumbersAsCharactersFromStringIncludingStringNumbers(exampleStrings[0])).toEqual("219");
          expect(decoder.extractNumbersAsCharactersFromStringIncludingStringNumbers(exampleStrings[1])).toEqual("823");
          expect(decoder.extractNumbersAsCharactersFromStringIncludingStringNumbers(exampleStrings[2])).toEqual("123");
          expect(decoder.extractNumbersAsCharactersFromStringIncludingStringNumbers(exampleStrings[3])).toEqual("2134");
          expect(decoder.extractNumbersAsCharactersFromStringIncludingStringNumbers(exampleStrings[4])).toEqual("1824");
          expect(decoder.extractNumbersAsCharactersFromStringIncludingStringNumbers(exampleStrings[5])).toEqual("17");
          expect(decoder.extractNumbersAsCharactersFromStringIncludingStringNumbers(exampleStrings[6])).toEqual("76");
        });
      });
    });

    describe(".numberExtraction", () => {
      const numberOnlyInput = "333333303133031033333331";
      const numberAndStringInput = "3333333zero3133031zero33333331";

      const example = {
        0: [7, 12, 15],
        1: [9, 14, 23]
      }

      const output = [0, 1, 0, 1, 0, 1];
      describe("using a number-only example", () => {
        it("returns 12 when given '12'", () => {
          expect(decoder.numberExtraction(numberOnlyInput)).toEqual(example);
        });
      });
      describe("using a number-and-string example", () => {
        it("returns 12 when given '12'", () => {
          expect(decoder.numberExtraction(numberAndStringInput)).toEqual(example);
        });
      });
    });

    describe(".computeCalibrationValue", () => {
      describe("using the example data", () => {
        it("returns 12 when given '12'", () => {
          expect(decoder.computeCalibrationValue("12")).toEqual(12);
        });
        it("returns 38 when given '38'", () => {
          expect(decoder.computeCalibrationValue("38")).toEqual(38);
        });
        it("returns 15 when given '12345'", () => {
          expect(decoder.computeCalibrationValue("12345")).toEqual(15);
        });
        it("returns 77 when given '7'", () => {
          expect(decoder.computeCalibrationValue("7")).toEqual(77);
        });
      });
    });

    describe(".getFirstAndLastValue", () => {
      describe("using the example data", () => {
        it("returns ['1', '2'] when given ['1', '2']", () => {
          expect(decoder.getFirstAndLastValue(["1", "2"])).toEqual(["1", "2"]);
        });
        it("returns ['3', '8'] when given ['3', '8']", () => {
          expect(decoder.getFirstAndLastValue(["3", "8"])).toEqual(["3", "8"]);
        });
        it("returns ['1', '5'] when given ['1','2','3','4','5']", () => {
          expect(decoder.getFirstAndLastValue(["1", "2", "3", "4", "5"])).toEqual(["1", "5"]);
        });
        it("returns ['7','7'] when given ['7']", () => {
          expect(decoder.getFirstAndLastValue(["7"])).toEqual(["7", "7"]);
        });
      });
    });

    describe(".getFirstMatch", () => {
      const parameters: string[][] = [
        ["two1nine", "two"],
        ["eightwothree", "eight"],
        ["abcone2threexyz", "one"],
        ["xtwone3four", "two"],
        ["4nineeightseven2", "nine"],
        ["zoneight234", "one"],
        ["7pqrstsixteen", "six"]
      ];
      const exampleStrings: string[] = [
        "two1nine",
        "eightwothree",
        "abcone2threexyz",
        "xtwone3four",
        "4nineeightseven2",
        "zoneight234",
        "7pqrstsixteen",
      ];
      it.each(parameters)("give %p returns %p", (input: string, output: string) => {
        expect(decoder.getFirstMatch(input)).toEqual(output);
      });
    });
  });
});
