import { Vehicle } from "./Vehicle";

export class RegularBike extends Vehicle {
  private static _instance: Vehicle | undefined;

  private constructor() {
    super(4, 60);
  }

  public static getInstance(): Vehicle {
    if (RegularBike._instance === undefined) {
      RegularBike._instance = new RegularBike();
    }

    return RegularBike._instance;
  }
}
