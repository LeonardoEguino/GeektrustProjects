import { Vehicle } from "../vehicles/Vehicle";

export class Booking {
  private _vehicleId: string;
  private _vehicle: Vehicle;
  private _entryTime: string;
  private _basicExitTime: string;
  private _extendedExitTime: string;

  constructor(vehicleId: string, vehicle: Vehicle, entryTime: string) {
    this._entryTime = entryTime;
    this._basicExitTime = this.calculateBasicExitTime();
    this._extendedExitTime = this.calculateBasicExitTime();
    this._vehicle = vehicle;
    this._vehicleId = vehicleId;
  }

  private getBookingChargeableHours(): number {
    return 3;
  }

  private getExtensionFeePerHour(): number {
    return 50;
  }

  public getBookingRevenue(): number {
    return this._vehicle.getFee() * this.getBookingChargeableHours();
  }

  public getExtensionRevenue(): number {
    const [bsc_exitHours, bsc_exitMinutes] = this.splitTime(
      this._basicExitTime
    );
    const [ext_exitHours, ext_exitMinutes] = this.splitTime(
      this._extendedExitTime
    );

    const minuteDifference =
      parseInt(ext_exitMinutes) - parseInt(bsc_exitMinutes);
    const hourDifference = parseInt(ext_exitHours) - parseInt(bsc_exitHours);

    let chargeableHours: number;

    if (hourDifference === 0) {
      chargeableHours =
        minuteDifference === 0 || minuteDifference <= 15 ? 0 : 1;
    } else {
      chargeableHours =
        minuteDifference === 0 ? hourDifference : hourDifference + 1;
    }

    return chargeableHours * this.getExtensionFeePerHour();
  }

  public getVehicle(): Vehicle {
    return this._vehicle;
  }

  public getVehicleId(): string {
    return this._vehicleId;
  }

  public getEntryTime(): string {
    return this._entryTime;
  }

  public getExitTime(): string {
    return this._basicExitTime === this._extendedExitTime
      ? this._basicExitTime
      : this._extendedExitTime;
  }

  private calculateBasicExitTime(): string {
    const [hours, minutes] = this.splitTime(this._entryTime);

    const exitHour = parseInt(hours) + this.getBookingChargeableHours();
    const s_exitHour = exitHour.toString();

    return s_exitHour + ":" + minutes;
  }

  private splitTime(time: string): [string, string] {
    const splittedTime = time.split(":");
    const s_hours = splittedTime[0];
    const s_minutes = splittedTime[1];
    return [s_hours, s_minutes];
  }

  public setExtendedExitTime(time: string): void {
    this._extendedExitTime = time;
  }
}
