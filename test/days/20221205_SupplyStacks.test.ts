import { SupplyStacks } from "../../src/days/20221205_SupplyStacks";

describe("2022 Day 5 - Supply Stacks", () => {
  const exampleProcedureFilePath: string = "../resources/20221205-example-procedure.txt";
  const exampleStacksFilePath: string = "../resources/20221205-example-stacks.txt";
  const inputProcedureSnippetFilePath: string = "../resources/20221205-snippet-procedure.txt";
  const inputStacksFilePath: string = "../resources/20221205-input-stacks.txt";
  const inputProcedureFilePath: string = "../resources/20221205-input-procedure.txt";

  describe("SupplyStacks", () => {
    describe(".loadStacks", () => {
      it("loads stacks into a matrix", () => {
        let crane: SupplyStacks = new SupplyStacks();
        crane.loadStacks(exampleStacksFilePath);
        expect(crane.stacks).toEqual([["N", "Z"], ["D", "C", "M"], ["P"]]);
      });
    });

    describe(".listTopCrates", () => {
      it("joins the crate letters currently at the top of each stack into a string", () => {
        let crane: SupplyStacks = new SupplyStacks();
        crane.loadStacks(exampleStacksFilePath);
        expect(crane.listTopCrates()).toEqual("NDP");
      });
      describe("without a CrateMover 9001", () => {
        it("returns CMZ after running the procedure on the example data", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(exampleStacksFilePath);
          crane.loadProcedure(exampleProcedureFilePath);
          crane.carryOutProcedure();
          expect(crane.listTopCrates()).toEqual("CMZ");
        });
        it("returns FGQDSDNBZ after running the snippet procedure on the input data", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(inputStacksFilePath);
          crane.loadProcedure(inputProcedureSnippetFilePath);
          crane.carryOutProcedure();
          expect(crane.listTopCrates()).toEqual("FGQDSDNBZ");
        });
        it("returns TLNGFGMFN after running the input procedure on the input data", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(inputStacksFilePath);
          crane.loadProcedure(inputProcedureFilePath);
          crane.carryOutProcedure();
          expect(crane.listTopCrates()).toEqual("TLNGFGMFN");
        });
      });
      describe("with a CrateMover 9001", () => {
        it("returns MCD after running the procedure on the example data", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(exampleStacksFilePath);
          crane.loadProcedure(exampleProcedureFilePath);
          crane.carryOutProcedure(true);
          expect(crane.listTopCrates()).toEqual("MCD");
        });
        it("returns FGQMSDQBS after running the snippet procedure on the input data", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(inputStacksFilePath);
          crane.loadProcedure(inputProcedureSnippetFilePath);
          crane.carryOutProcedure(true);
          expect(crane.listTopCrates()).toEqual("FGQMSDQBS");
        });
        it("returns FGLQJCMBD after running the input procedure on the input data", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(inputStacksFilePath);
          crane.loadProcedure(inputProcedureFilePath);
          crane.carryOutProcedure(true);
          expect(crane.listTopCrates()).toEqual("FGLQJCMBD");
        });
      });
    });

    describe(".loadProcedure", () => {
      it("loads the example procedure as an array of array of numbers", () => {
        let crane: SupplyStacks = new SupplyStacks();
        crane.loadProcedure(exampleProcedureFilePath);
        expect(crane.procedure).toEqual([
          [1, 2, 1],
          [3, 1, 3],
          [2, 2, 1],
          [1, 1, 2],
        ]);
      });
    });
    describe(".extractNumbers", () => {
      it("returns an array of the number of crates, the start stack and the end stack", () => {
        let crane: SupplyStacks = new SupplyStacks();
        expect(crane.extractNumbers("move 7 from 6 to 3")).toEqual([7, 6, 3]);
      });
    });
    describe(".carryOutInstruction", () => {
      let hasCrateMover: boolean;
      describe("without a Crate Mover 9001", () => {
        it("moves a single crate between columns", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(exampleStacksFilePath);
          hasCrateMover = false;
          crane.carryOutInstruction([1, 1, 3], hasCrateMover);
          expect(crane.stacks).toEqual([["Z"], ["D", "C", "M"], ["N", "P"]]);
        });
        it("moves multiple crates between columns, placing them in reverse order", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(exampleStacksFilePath);
          hasCrateMover = false;
          crane.carryOutInstruction([2, 1, 3], false);
          expect(crane.stacks).toEqual([[], ["D", "C", "M"], ["Z", "N", "P"]]);
        });
      });
      describe("with a Crate Mover 9001", () => {
        it("moves a single crate between columns", () => {
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(exampleStacksFilePath);
          hasCrateMover = true;
          crane.carryOutInstruction([1, 1, 3], hasCrateMover);
          expect(crane.stacks).toEqual([["Z"], ["D", "C", "M"], ["N", "P"]]);
        });
        it("moves multiple crates between columns, placing them in the same order", () => {
          hasCrateMover = true;
          let crane: SupplyStacks = new SupplyStacks();
          crane.loadStacks(exampleStacksFilePath);
          crane.carryOutInstruction([2, 1, 3], hasCrateMover);
          expect(crane.stacks).toEqual([[], ["D", "C", "M"], ["N", "Z", "P"]]);
        });
      });
    });
  });
});
