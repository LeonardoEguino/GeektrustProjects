import { NotFoundVehicle } from "../vehicles/NotFoundVehicle";
import { Vehicle } from "../vehicles/Vehicle";
import { VipCar } from "../vehicles/VipCar";
import { VipSuv } from "../vehicles/VipSuv";
import { RaceTrack } from "./RaceTrack";

type VehicleType = "SUV" | "CAR";
export class VIPTrack extends RaceTrack {
  public getVehicleFromString(vehicleType: VehicleType): Vehicle {
    {
      if (vehicleType === "CAR") {
        return this.getCar();
      }

      if (vehicleType == "SUV") {
        return this.getSuv();
      }

      return new NotFoundVehicle();
    }
  }
  constructor() {
    super();
  }

  protected resetCurrentVehicles(): void {
    this.getCar().resetCurrent();
    this.getSuv().resetCurrent();
  }

  public getCar(): Vehicle {
    return VipCar.getInstance();
  }
  public getSuv(): Vehicle {
    return VipSuv.getInstance();
  }
}
