export abstract class Vehicle {
  private _currentVehicles: number;
  private _maxVehiclesOnTrack: number;
  private _feePerHour: number;

  protected constructor(maxVehicles: number, feePerHour: number) {
    this._currentVehicles = 0;
    this._maxVehiclesOnTrack = maxVehicles;
    this._feePerHour = feePerHour;
  }

  public equals(vehicle: Vehicle): boolean {
    const areCurrentEqual = this._currentVehicles === vehicle._currentVehicles;
    const areMaxOnTrackEqual =
      this._maxVehiclesOnTrack === vehicle._maxVehiclesOnTrack;
    const feePerHourEqual = this._feePerHour === vehicle._feePerHour;

    return areCurrentEqual && areMaxOnTrackEqual && feePerHourEqual;
  }

  public addOneToCurrent(): void {
    if (!this.maxOnTrackReached()) {
      this._currentVehicles += 1;
      return;
    }
  }
  public resetCurrent(): void {
    this._currentVehicles = 0;
  }
  public maxOnTrackReached(): boolean {
    return this._currentVehicles >= this._maxVehiclesOnTrack;
  }
  public getFee(): number {
    return this._feePerHour;
  }
  public getCurrentVehicles(): number {
    return this._currentVehicles;
  }
  public getMaxVehiclesOnTrack(): number {
    return this._maxVehiclesOnTrack;
  }
}
