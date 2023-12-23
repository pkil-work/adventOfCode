import { FileLoader } from "../helpers/FileLoader";
import { sumArray } from "../helpers/mathsUtils";

export class CalibrationDecoder {
  loader: any;
  calibrationRawData: string[];
  calibrationNumericStrings: string[];
  calibrationValues: number[];

  constructor(loader = FileLoader) {
    this.loader = loader;
  }

  public loadRawCalibrationData(path: string): void {
    let fileLoader = new this.loader(path);
    let inputLines: string[] = fileLoader.splitByLine();
    this.calibrationRawData = inputLines;
  }

  public decodeCalibrationData(numbersCanBeWritten: boolean = false): number {
    let extractionFunction = numbersCanBeWritten
      ? this.extractNumbersAsCharactersFromStringIncludingStringNumbers
      : this.extractNumbersAsCharactersFromString;
    this.calibrationNumericStrings = this.calibrationRawData.map(x => extractionFunction(x));
    this.calibrationValues = this.calibrationNumericStrings.map(x => this.computeCalibrationValue(x));
    return this.sumCalibrationValues(this.calibrationValues);
  }

  public computeCalibrationValue(numbersString: string): number {
    return parseInt(this.getFirstAndLastValue(numbersString.split("")).join(""));
  }

  public sumCalibrationValues(numbers: number[]): number {
    return sumArray(numbers);
  }

  public extractNumbersAsCharactersFromString(inputString: string): string {
    return inputString
      .split("")
      .filter(x => !isNaN(parseInt(x)))
      .join("");
  }

  public numberExtraction(inputString: string) {
    const inputs = [
      ["0", "zero"],
      ["1", "one"],
      ["2", "two"],
      ["3", "three"],
      ["4", "four"],
      ["5", "five"],
      ["6", "six"],
      ["7", "seven"],
      ["8", "eight"],
      ["9", "nine"]
    ]

    let outputs = {};

    const matchInputs = (inputs: string[], index: number) => {
      const searchStr = inputs[0];
      const indexes = [...inputString.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
      const searchStr2 = inputs[1];
      const indexes2 = [...inputString.matchAll(new RegExp(searchStr2, 'gi'))].map(a => a.index);
      outputs[index] = [...indexes, ...indexes2].sort((a, b) => (a - b));
    }

    inputs.forEach(matchInputs);

    return outputs;

  }

  public extractNumbersAsCharactersFromStringIncludingStringNumbers(inputString: string): string {
    let updatedString = inputString;

    updatedString = updatedString.replace("zero", "0");
    updatedString = updatedString.replace("one", "1");
    updatedString = updatedString.replace("two", "2");
    updatedString = updatedString.replace("three", "3");
    updatedString = updatedString.replace("four", "4");
    updatedString = updatedString.replace("five", "5");
    updatedString = updatedString.replace("six", "6");
    updatedString = updatedString.replace("seven", "7");
    updatedString = updatedString.replace("eight", "8");
    updatedString = updatedString.replace("nine", "9");
    return updatedString
      .split("")
      .filter(x => !isNaN(parseInt(x)))
      .join("");
  }

  public getFirstAndLastValue(values: any[]): any[] {
    return [values[0], values.slice(-1)[0]];
  }

  // public convertToPositiveLookaheadRegex(input: string): RegExp {
  //   input.length
  //   new RegExp()
  // }

  public getFirstMatch(input: string): any {
    const digitRegex = new RegExp(/\d+/, 'g');
    const digitOrStringRegex = new RegExp(/one|two|three|four|five|six|seven|eight|nine|zero|\d+/, 'g')
    const regexes = [
      /(zer)(?=o)/,
      /(on)(?=e)/,
      /(tw)(?=o)/,
      /(thre)(?=e)/,
      /(fou)(?=r)/,
      /(fiv)(?=e)/,
      /(si)(?=x)/,
      /(eigh)(?=t)/,
      /(seve)(?=n)/,
      /(nin)(?=e)/,
    ];

    const combinationRegex: RegExp = new RegExp(regexes.map(regex => regex.source).join("|"));
    let result = [...(RegExp(combinationRegex).exec(input))];
    return result;
  }

  public getLastMatch(input: string): any {
    const digitRegex = new RegExp(/\d+/, 'g');
    const digitOrStringRegex = new RegExp(/one|two|three|four|five|six|seven|eight|nine|zero|\d+/, 'g')
    const result = [...(input.match(digitOrStringRegex))];
    return result[-1];
  }
}
