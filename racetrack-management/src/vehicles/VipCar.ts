import { Vehicle } from "./Vehicle";

export class VipCar extends Vehicle {
  private static _instance: Vehicle | undefined;

  private constructor() {
    super(1, 250);
  }
  public static getInstance(): Vehicle {
    if (VipCar._instance === undefined) {
      VipCar._instance = new VipCar();
    }

    return VipCar._instance;
  }
}
