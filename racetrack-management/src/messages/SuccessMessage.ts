import { Message } from "./Message";

export class SuccessMessage extends Message {
  constructor() {
    super(true);
  }

  public getMessage(): string {
    return "SUCCESS";
  }
}
