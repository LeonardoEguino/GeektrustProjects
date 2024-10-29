import { Vehicle } from "./Vehicle";

export class VipSuv extends Vehicle {
  private static _instance: Vehicle | undefined;

  private constructor() {
    super(1, 300);
  }

  public static getInstance(): Vehicle {
    if (VipSuv._instance === undefined) {
      VipSuv._instance = new VipSuv();
    }

    return VipSuv._instance;
  }
}
