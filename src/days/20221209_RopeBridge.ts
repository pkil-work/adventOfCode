import { countTrueValuesInArray } from "../helpers/arrayUtils";
import { FileLoader } from "../helpers/FileLoader";

export type Coordinates = [x: number, y: number];
export type Motion = [direction: string, distance: number];

export class Rope {
  headDestination: Coordinates;
  knots: Knot[] = [];
  
  public constructor(length: number) {
    for (let i = 0; i < length; i++) {
      this.knots.push(new Knot(i, [0, 0]));
    }
    this.knots[this.knots.length - 1].setTail(true);
  }
  
  public setHeadDestination(destination: Coordinates) {
    this.headDestination = destination;
    this.updateKnots();
  }
  
  public updateKnots() {
    while (!this.isRopeAtRest()) {
      this.knots.forEach((knot, index) => {
        let isKnotHead = index === 0;
        let destination: Coordinates = isKnotHead ? this.headDestination : this.knots[index - 1].position;
        knot.stepTowardDestination(destination);
        console.debug(`Knot ${knot.order} is at rest: ${knot.isAtRest(destination)}`)
      })
      console.debug("Rope is not at rest");
    }
  }

  public isRopeAtRest(): boolean {
    let headKnotAtDestination: boolean = JSON.stringify(this.knots[0].position) === JSON.stringify(this.headDestination);

    if (headKnotAtDestination) {
      let knotsAtRest = this.knots.map((knot, index) => {
        return index === 0 ? false : knot.isAtRest(this.knots[index - 1].position)
      })
      let trailingKnotsAtRest: boolean = countTrueValuesInArray(knotsAtRest) === this.knots.length - 1;
    
      return trailingKnotsAtRest
    } else {
      return false;
    };
  }
}

export class Knot {
  order: number;
  position: Coordinates;
  isTail: boolean;
  path: Set<string> = new Set();

  constructor(order: number, startPosition: Coordinates = [0,0]) {
    this.order = order;
    this.position = startPosition;
  }

  public setTail(isTail: boolean): void {
    this.isTail = isTail;
  }

  public move(translation: Coordinates) {
    this.position = [
      this.position[0] + translation[0],
      this.position[1] + translation[1]
    ];
    if (this.isTail) { this.path.add(JSON.stringify(this.position)) };
  }

  public isAtRest(parentKnotPosition: Coordinates): boolean {
    let [thisX, thisY] = this.position;
    let [parentX, parentY] = parentKnotPosition;

    let horizontallyClose: boolean = thisX >= parentX - 1 && thisX <= parentX + 1;
    let verticallyClose: boolean = thisY >= parentY - 1 && thisY <= parentY + 1;

    return horizontallyClose && verticallyClose;
  }

  public stepTowardDestination(destination: Coordinates): void {
    if (this.isTail) { this.path.add(JSON.stringify(this.position)) };
    
    let yModifier: number = 0;
    let xModifier: number = 0;

    if (this.isNotSameRow(this.position, destination)) {
      yModifier = this.isKnotBelowDestination(this.position, destination) ? 1 : -1;
    }
    if (this.isNotSameColumn(this.position, destination)) {
      xModifier = this.isKnotLeftOfDestination(this.position, destination) ? 1 : -1;
    }

    let newPosition: Coordinates = [this.position[0] + xModifier, this.position[1] + yModifier];
    this.position = newPosition;

    if (this.isTail) { this.path.add(JSON.stringify(this.position)) };
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

export class RopeBridge {
  loader: any;
  motions: Motion[];
  rope: Rope;
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

  public isKnotAdjacentToParent(currentKnotPosition: Coordinates, currentParentPosition: Coordinates): boolean {
    let [currentX, currentY] = currentKnotPosition;
    let [parentX, parentY] = currentParentPosition;

    let horizontallyClose: boolean = currentX >= parentX - 1 && currentX <= parentX + 1;
    let verticallyClose: boolean = currentY >= parentY - 1 && currentY <= parentY + 1;

    return horizontallyClose && verticallyClose;
  }

  public simulateTailMovements(lengthOfRope: number = 2): void {
    let rope: Coordinates[] = this.generateRope(lengthOfRope);
    this.rope = new Rope(lengthOfRope);
    this.motions.forEach((motion) => {
      let headDestination = this.getHeadPositionAfterStep(rope[0], motion);
      rope[0] = this.getHeadPositionAfterStep(rope[0], motion);
      for (let i = 0; i < rope.length; i++) {
        let isTail: boolean = i === rope.length - 1;
        let destination = i === 0 ? headDestination : rope[i - 1];
        rope[i] = this.simulateKnotMovement(rope[i], destination, isTail);
        // this.rope[i].position = this.simulateKnotMovement(this.rope[i].position, destination, false);
      }
      this.rope.setHeadDestination(headDestination)
      // console.debug(!this.isRopeAtRest(headDestination));
    });
  }

  public simulateKnotMovement(startKnotPosition: Coordinates, destinationPosition: Coordinates, isTail: boolean = true): Coordinates {
    let knotPosition: Coordinates = startKnotPosition;
    if (isTail) this.visitedPositions.add(JSON.stringify(knotPosition));
    while (!this.isKnotAdjacentToParent(knotPosition, destinationPosition)) {
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

  private generateRopeKnots(length: number): Knot[] {
    let rope: Knot[] = [];
    for (let i = 0; i < length; i++) {
      rope.push(new Knot(i, [0, 0]));
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
