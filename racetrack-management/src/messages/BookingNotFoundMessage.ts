import { Message } from "./Message";

export class BookingNotFoundMessage extends Message {
  constructor() {
    super(false);
  }

  public getMessage(): string {
    return "BOOKING_NOT_FOUND";
  }
}
