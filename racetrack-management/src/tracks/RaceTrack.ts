import { Registry } from "../registry/Registry";
import { Vehicle } from "../vehicles/Vehicle";

export type VehicleType = "SUV" | "CAR" | "BIKE";

export abstract class RaceTrack {
  private registry: Registry;

  constructor() {
    this.registry = new Registry();
    this.resetCurrentVehicles();
  }

  public abstract getVehicleFromString(vehicleType: string): Vehicle;

  public getRegistry(): Registry {
    return this.registry;
  }

  protected abstract resetCurrentVehicles(): void;

  public getRevenue(): number {
    const totalTrackRevenue =
      this.getDefaultRevenue() + this.getExtensionRevenue();
    return totalTrackRevenue;
  }

  protected getDefaultRevenue(): number {
    const bookings = this.registry.getBookings();
    const accumulatedDefaultRevenue = bookings.reduce((acc, booking) => {
      return acc + booking.getBookingRevenue();
    }, 0);
    return accumulatedDefaultRevenue;
  }

  protected getExtensionRevenue(): number {
    const bookings = this.registry.getBookings();
    const accumulatedExtensionRevenue = bookings.reduce((acc, booking) => {
      return acc + booking.getExtensionRevenue();
    }, 0);
    return accumulatedExtensionRevenue;
  }

  public abstract getCar(): Vehicle;
  public abstract getSuv(): Vehicle;
}
