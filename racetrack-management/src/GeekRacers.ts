import { BookingNotFoundMessage } from "./messages/BookingNotFoundMessage";
import { InvalidEntryTimeMessage } from "./messages/InvalidEntryTimeMessage";
import { Message } from "./messages/Message";
import { RaceTrackFullMessage } from "./messages/RaceTrackFullMessage";
import { Booking } from "./registry/Booking";
import { RaceTrack } from "./tracks/RaceTrack";
import { RegularTrack } from "./tracks/RegularTrack";
import { VIPTrack } from "./tracks/VIPTrack";
import { NotFoundVehicle } from "./vehicles/NotFoundVehicle";

type TrackType = "VIP" | "REGULAR";

export class GeekRacers {
  private vipTrack: RaceTrack;
  private regularTrack: RaceTrack;

  constructor() {
    this.vipTrack = new VIPTrack();
    this.regularTrack = new RegularTrack();
  }

  public getTotalRevenue(): string {
    return `${this.regularTrack.getRevenue()} ${this.vipTrack.getRevenue()}`;
  }

  private regularBook(
    vehicle: string,
    vehicleId: string,
    entryTime: string
  ): Message {
    const regularVehicle = this.regularTrack.getVehicleFromString(vehicle);

    if (regularVehicle instanceof NotFoundVehicle) {
      return new RaceTrackFullMessage();
    }

    const regularTrackBookingResult = this.regularTrack
      .getRegistry()
      .book(regularVehicle, vehicleId, entryTime);

    return regularTrackBookingResult;
  }

  private vipBook(
    vehicle: string,
    vehicleId: string,
    entryTime: string
  ): Message {
    const vipVehicle = this.vipTrack.getVehicleFromString(vehicle);

    if (vipVehicle instanceof NotFoundVehicle) {
      return new RaceTrackFullMessage();
    }

    const vipTrackBookingResult = this.vipTrack
      .getRegistry()
      .book(vipVehicle, vehicleId, entryTime);

    return vipTrackBookingResult;
  }

  public book(vehicle: string, vehicleId: string, entryTime: string): string {
    const regularTrackBookingResult = this.regularBook(
      vehicle,
      vehicleId,
      entryTime
    );

    if (regularTrackBookingResult.proceed()) {
      return regularTrackBookingResult.getMessage();
    }

    if (regularTrackBookingResult instanceof InvalidEntryTimeMessage) {
      return regularTrackBookingResult.getMessage();
    }

    return this.vipBook(vehicle, vehicleId, entryTime).getMessage();
  }

  public extend(vehicleId: string, exitTime: string): string {
    let vipExtensionMessage: Message = this.vipTrack
      .getRegistry()
      .extend(vehicleId, exitTime);

    if (!(vipExtensionMessage instanceof BookingNotFoundMessage)) {
      return vipExtensionMessage.getMessage();
    }

    return this.regularTrack
      .getRegistry()
      .extend(vehicleId, exitTime)
      .getMessage();
  }

  public getRegistry(track: TrackType): Booking[] {
    if (track === "REGULAR") {
      return [...this.regularTrack.getRegistry().getBookings()];
    }

    return [...this.vipTrack.getRegistry().getBookings()];
  }
}
