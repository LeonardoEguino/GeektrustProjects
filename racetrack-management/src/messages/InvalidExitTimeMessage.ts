import { Message } from "./Message";

export class InvalidExitTimeMessage extends Message {
  constructor() {
    super(false);
  }

  public getMessage(): string {
    return "INVALID_EXIT_TIME";
  }
}
