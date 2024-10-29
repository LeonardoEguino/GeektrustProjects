import { NotFoundVehicle } from "../vehicles/NotFoundVehicle";
import { RegularBike } from "../vehicles/RegularBike";
import { RegularCar } from "../vehicles/RegularCar";
import { RegularSuv } from "../vehicles/RegularSuv";
import { Vehicle } from "../vehicles/Vehicle";
import { RaceTrack, VehicleType } from "./RaceTrack";

export class RegularTrack extends RaceTrack {
  public getVehicleFromString(vehicleType: VehicleType): Vehicle {
    if (vehicleType === "CAR") {
      return this.getCar();
    }

    if (vehicleType === "BIKE") {
      return this.getBike();
    }

    if (vehicleType === "SUV") {
      return this.getSuv();
    }

    return new NotFoundVehicle();
  }
  constructor() {
    super();
  }
  protected resetCurrentVehicles(): void {
    this.getCar().resetCurrent();
    this.getBike().resetCurrent();
    this.getSuv().resetCurrent();
  }

  public getCar(): Vehicle {
    return RegularCar.getInstace();
  }
  public getSuv(): Vehicle {
    return RegularSuv.getInstance();
  }
  public getBike(): Vehicle {
    return RegularBike.getInstance();
  }
}
