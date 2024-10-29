import { Message } from "./Message";

export class InvalidEntryTimeMessage extends Message {
  constructor() {
    super(false);
  }

  public getMessage(): string {
    return "INVALID_ENTRY_TIME";
  }
}
