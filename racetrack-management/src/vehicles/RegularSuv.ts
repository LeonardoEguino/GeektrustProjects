import { Vehicle } from "./Vehicle";

export class RegularSuv extends Vehicle {
  private static _instance: Vehicle | undefined;

  private constructor() {
    super(2, 200);
  }

  public static getInstance(): Vehicle {
    if (RegularSuv._instance === undefined) {
      RegularSuv._instance = new RegularSuv();
    }

    return RegularSuv._instance;
  }
}
