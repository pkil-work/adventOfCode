import { FileLoader } from "../helpers/FileLoader";

export type Coordinates = [x: number, y: number];
export type Motion = [direction: string, distance: number];

export class RopeBridge {
  loader: any;
  motions: Motion[];
  visitedPositions: Set<string> = new Set();

  constructor(loader = FileLoader) {
    this.loader = loader;
  }

  public loadSeriesOfMotions(path: string): void {
    let fileLoader = new this.loader(path);
    let inputLines: string[] = fileLoader.splitByLine();
    this.motions = inputLines.map((line) => {
      let [direction, distanceString]: string[] = line.split(" ");
      return [direction, Number(distanceString)];
    });
  }

  public getHeadPositionAfterStep(currentHeadPosition: number[], motion: Motion): Coordinates {
    let translation = this.convertDirectionAndDistanceToTranslation(motion);

    return [currentHeadPosition[0] + translation[0], currentHeadPosition[1] + translation[1]];
  }

  public countVisitedPositions(): number {
    return this.visitedPositions.size;
  }

  public isTailAdjacentToHead(currentTailPosition: Coordinates, currentHeadPosition: Coordinates): boolean {
    let [tailX, tailY] = currentTailPosition;
    let [headX, headY] = currentHeadPosition;

    let horizontallyClose: boolean = tailX >= headX - 1 && tailX <= headX + 1;
    let verticallyClose: boolean = tailY >= headY - 1 && tailY <= headY + 1;

    return horizontallyClose && verticallyClose;
  }

  public simulateTailMovements(lengthOfRope: number = 2): void {
    let rope: Coordinates[] = this.generateRope(lengthOfRope);
    this.motions.forEach((motion) => {
      rope[0] = this.getHeadPositionAfterStep(rope[0], motion);
      for (let i = 1; i < rope.length; i++) {
        let isTail: boolean = i === rope.length - 1;
        rope[i] = this.simulateKnotMovement(rope[i], rope[i - 1], isTail);
      }
    });
  }

  public simulateKnotMovement(startKnotPosition: Coordinates, destinationPosition: Coordinates, isTail: boolean = true): Coordinates {
    let knotPosition: Coordinates = startKnotPosition;
    if (isTail) this.visitedPositions.add(JSON.stringify(knotPosition));
    while (!this.isTailAdjacentToHead(knotPosition, destinationPosition)) {
      knotPosition = this.moveKnotTowardDestination(knotPosition, destinationPosition);
      if (isTail) this.visitedPositions.add(JSON.stringify(knotPosition));
    }
    return knotPosition;
  }

  // Private Methods

  private convertDirectionAndDistanceToTranslation(motion: Motion): Coordinates {
    let [direction, distance]: Motion = motion;

    switch (direction) {
      case "U":
        return [0, distance];
      case "D":
        return [0, -distance];
      case "L":
        return [-distance, 0];
      case "R":
        return [distance, 0];
      default:
        throw new Error("The direction string is an unexpected value (Not U, D, L, or R)");
    }
  }

  private generateRope(length: number): Coordinates[] {
    let rope: Coordinates[] = [];
    for (let i = 0; i < length; i++) {
      rope.push([0, 0]);
    }
    return rope;
  }

  private moveKnotTowardDestination(currentPosition: Coordinates, destination: Coordinates) {
    let yModifier: number = 0;
    let xModifier: number = 0;

    if (this.isNotSameRow(currentPosition, destination)) {
      yModifier = this.isKnotBelowDestination(currentPosition, destination) ? 1 : -1;
    }
    if (this.isNotSameColumn(currentPosition, destination)) {
      xModifier = this.isKnotLeftOfDestination(currentPosition, destination) ? 1 : -1;
    }

    let newPosition: Coordinates = [currentPosition[0] + xModifier, currentPosition[1] + yModifier];
    return newPosition;
  }

  private isNotSameRow(tailPosition: Coordinates, headPosition: Coordinates): boolean {
    return tailPosition[1] !== headPosition[1];
  }

  private isNotSameColumn(tailPosition: Coordinates, headPosition: Coordinates): boolean {
    return tailPosition[0] !== headPosition[0];
  }

  private isKnotBelowDestination(tailPosition: Coordinates, headPosition: Coordinates): boolean {
    return tailPosition[1] < headPosition[1];
  }

  private isKnotLeftOfDestination(tailPosition: Coordinates, headPosition: Coordinates): boolean {
    return tailPosition[0] < headPosition[0];
  }
}
