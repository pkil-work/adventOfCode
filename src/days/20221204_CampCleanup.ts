import { FileLoader } from "../helpers/FileLoader";

interface pairDataInterface {
  firstMin: number;
  firstMax: number;
  secondMin: number;
  secondMax: number;
}

export class CampCleanup {
  loader: any;
  inputLines: string[];
  pairs: pairDataInterface[];

  constructor(loader = FileLoader) {
    this.loader = loader;
  }

  public loadSectionAssignments(path: string) {
    let fileLoader = new this.loader(path);
    this.inputLines = fileLoader.splitByLine();
  }

  public getFullyEncompassedSections(): number {
    this.pairs = this.mapInputLinesToPairData();
    return this.countTrueValues(this.pairs.map((pair) => this.isOneSetWithinOther(pair)));
  }

  public getPartiallyEncompassedSections(): number {
    this.pairs = this.mapInputLinesToPairData();
    return this.countTrueValues(this.pairs.map((pair) => this.isOneSetOverlappingOther(pair)));
  }

  public countTrueValues(input: boolean[]): number {
    return input.filter(Boolean).length;
  }

  public mapInputLinesToPairData(): pairDataInterface[] {
    return this.inputLines.map(this.gatherDataFromPair);
  }

  public gatherDataFromPair(pairString: string): pairDataInterface {
    let pairs: string[] = pairString.split(",");
    let firstPair: number[] = pairs[0].split("-").map(Number);
    let secondPair: number[] = pairs[1].split("-").map(Number);

    let pairData = {
      firstMin: firstPair[0],
      firstMax: firstPair[1],
      secondMin: secondPair[0],
      secondMax: secondPair[1],
    };

    return pairData;
  }

  public isOneSetWithinOther(pairData: pairDataInterface): boolean {
    return this.isFirstWithinSecond(pairData) || this.isSecondWithinFirst(pairData);
  }

  public isFirstWithinSecond(pairData: pairDataInterface): boolean {
    return pairData.firstMin >= pairData.secondMin && pairData.firstMax <= pairData.secondMax;
  }

  public isSecondWithinFirst(pairData: pairDataInterface): boolean {
    return pairData.firstMin <= pairData.secondMin && pairData.firstMax >= pairData.secondMax;
  }

  public isOneSetOverlappingOther(pairData: pairDataInterface): boolean {
    return this.isFirstOverlappingSecond(pairData) || this.isSecondOverlappingFirst(pairData);
  }

  public isFirstOverlappingSecond(pairData: pairDataInterface): boolean {
    let isFirstMinInsideSecondRange: boolean = pairData.firstMin >= pairData.secondMin && pairData.firstMin <= pairData.secondMax;
    let isFirstMaxInsideSecondRange: boolean = pairData.firstMax >= pairData.secondMin && pairData.firstMax <= pairData.secondMax;

    return isFirstMinInsideSecondRange || isFirstMaxInsideSecondRange;
  }

  public isSecondOverlappingFirst(pairData: pairDataInterface): boolean {
    let isSecondMinInsideFirstRange: boolean = pairData.secondMin >= pairData.firstMin && pairData.secondMin <= pairData.firstMax;
    let isSecondMaxInsideFirstRange: boolean = pairData.secondMax >= pairData.firstMin && pairData.secondMax <= pairData.firstMax;

    return isSecondMinInsideFirstRange || isSecondMaxInsideFirstRange;
  }
}
