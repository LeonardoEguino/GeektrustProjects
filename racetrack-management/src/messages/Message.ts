export abstract class Message {
  private _proceed: boolean;

  protected constructor(type: boolean) {
    this._proceed = type;
  }

  public proceed(): boolean {
    return this._proceed;
  }

  public abstract getMessage(): string;
}
