import { Message } from "./Message";

export class RaceTrackFullMessage extends Message {
  constructor() {
    super(false);
  }
  public getMessage(): string {
    return "RACETRACK_FULL";
  }
}
