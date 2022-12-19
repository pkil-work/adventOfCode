import { countTrueValuesInArray } from "../helpers/arrayUtils";
import { FileLoader } from "../helpers/FileLoader";
import { maximumValueOfArray } from "../helpers/mathsUtils";
import { maximumValueOfMatrix, rowsToColumns } from "../helpers/matrixUtils";
import { splitToNumbers } from "../helpers/stringUtils";

export class TreetopTreeHouse {
  loader: any;
  forestRows: number[][];
  forestColumns: number[][];

  constructor(loader = FileLoader) {
    this.loader = loader;
  }

  public loadForest(path: string): void {
    let fileLoader = new this.loader(path);
    let inputLines: string[] = fileLoader.splitByLine();
    this.forestRows = inputLines.map((line) => splitToNumbers(line, ""));
    this.forestColumns = rowsToColumns(this.forestRows) as number[][];
  }

  public countVisibleTrees(): number {
    let forestVisibility: boolean[][] = this.mapToVisibility();
    let visibleCount: number = 0;
    forestVisibility.forEach((row) => {
      visibleCount += countTrueValuesInArray(row);
    });
    return visibleCount;
  }

  public filterToVisibleTrees(trees: number[]): number[] {
    let visibleTrees: number[] = [];
    let currentTallestTree: number = 0;
    trees.forEach((tree) => {
      if (tree > currentTallestTree) {
        currentTallestTree = tree;
        visibleTrees.push(tree);
      }
    });
    return visibleTrees;
  }

  public mapToVisibility(): boolean[][] {
    return this.forestRows.map((rowOfTrees, rowNumber) => rowOfTrees.map((_tree, columnNumber) => this.isTreeVisible(rowNumber, columnNumber)));
  }

  public mapToScenicScore(): number[][] {
    return this.forestRows.map((rowOfTrees, rowNumber) => rowOfTrees.map((_tree, columnNumber) => this.getScenicScoreForTree(rowNumber, columnNumber)));
  }

  public getTreesAbove(row: number, column: number): number[] {
    return this.forestColumns[column].slice(0, row);
  }

  public getTreesBelow(row: number, column: number): number[] {
    return this.forestColumns[column].slice(row + 1);
  }

  public getTreesToLeft(row: number, column: number): number[] {
    return this.forestRows[row].slice(0, column);
  }

  public getTreesToRight(row: number, column: number): number[] {
    return this.forestRows[row].slice(column + 1);
  }

  public isTreeVisible(row: number, column: number): boolean {
    let treeHeight: number = this.forestRows[row][column];

    let treesAbove: number[] = this.getTreesAbove(row, column);
    let treesBelow: number[] = this.getTreesBelow(row, column);
    let treesToLeft: number[] = this.getTreesToLeft(row, column);
    let treesToRight: number[] = this.getTreesToRight(row, column);

    let visibleFromAbove: boolean = treeHeight > maximumValueOfArray(treesAbove);
    let visibleFromBelow: boolean = treeHeight > maximumValueOfArray(treesBelow);
    let visibleFromLeft: boolean = treeHeight > maximumValueOfArray(treesToLeft);
    let visibleFromRight: boolean = treeHeight > maximumValueOfArray(treesToRight);

    return visibleFromAbove || visibleFromBelow || visibleFromLeft || visibleFromRight;
  }

  public countVisibleTreesFromTreeHouse(treeHouseHeight: number, trees: number[]): number {
    let visibleTreeCount: number = 0;

    if (treeHouseHeight > maximumValueOfArray(trees)) {
      visibleTreeCount = trees.length;
    } else {
      for (let tree of trees) {
        visibleTreeCount += 1;
        if (tree >= treeHouseHeight) break;
      }
    }

    return visibleTreeCount;
  }

  public getScenicScoreForTree(row: number, column: number): number {
    let treeHeight: number = this.forestRows[row][column];

    let treesAboveHouse: number[] = this.getTreesAbove(row, column).reverse();
    let treesBelowHouse: number[] = this.getTreesBelow(row, column);
    let treesToLeftOfHouse: number[] = this.getTreesToLeft(row, column).reverse();
    let treesToRightOfHouse: number[] = this.getTreesToRight(row, column);

    let visibleTrees: number[] = [treesAboveHouse, treesToRightOfHouse, treesBelowHouse, treesToLeftOfHouse].map((trees) => this.countVisibleTreesFromTreeHouse(treeHeight, trees));

    return visibleTrees[0] * visibleTrees[1] * visibleTrees[2] * visibleTrees[3];
  }

  public getMaximumScenicScore(): number {
    let forestScenicScores: number[][] = this.mapToScenicScore();

    return maximumValueOfMatrix(forestScenicScores);
  }
}
