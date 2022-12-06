import { removeDuplicates } from "../helpers/arrayUtils";
import { FileLoader } from "../helpers/FileLoader";

export class TuningTrouble {
  loader: any;
  stream: string;

  constructor(loader = FileLoader) {
    this.loader = loader;
  }

  public loadStream(path: string): void {
    let fileLoader = new this.loader(path);
    this.stream = fileLoader.splitByLine()[0];
  }

  public positionOfFirstCharacterAfterStartOfPacketMarker(packetLength: number): number {
    let currentIndex: number;
    for (let i = packetLength; i < this.stream.length; i++) {
      let currentPacket: string[] = this.extractPacketCharacters(i, packetLength);
      if (this.areAllUnique(currentPacket)) {
        currentIndex = i;
        break;
      }
    }
    let positionOfFirstCharacter = currentIndex + 1;
    return positionOfFirstCharacter;
  }

  // Private methods
  private areAllUnique(arrayOfCharacters: string[]) {
    return removeDuplicates(arrayOfCharacters).length === arrayOfCharacters.length;
  }

  private extractPacketCharacters(index: number, packetLength: number): string[] {
    let startOffset: number = packetLength - 1;
    let endOffset: number = 1;
    return this.stream.slice(index - startOffset, index + endOffset).split("");
  }
}
