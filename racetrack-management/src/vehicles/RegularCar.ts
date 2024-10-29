import { Vehicle } from "./Vehicle";

export class RegularCar extends Vehicle {
  private static _instance: Vehicle | undefined;

  private constructor() {
    super(2, 120);
  }

  public static getInstace(): Vehicle {
    if (RegularCar._instance === undefined) {
      RegularCar._instance = new RegularCar();
    }

    return RegularCar._instance;
  }
}
