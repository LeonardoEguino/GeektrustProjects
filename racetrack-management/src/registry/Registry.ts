import { exit } from "process";
import { InvalidEntryTimeMessage } from "../messages/InvalidEntryTimeMessage";
import { InvalidExitTimeMessage } from "../messages/InvalidExitTimeMessage";
import { Message } from "../messages/Message";
import { RaceTrackFullMessage } from "../messages/RaceTrackFullMessage";
import { SuccessMessage } from "../messages/SuccessMessage";
import { Vehicle } from "../vehicles/Vehicle";
import { Booking } from "./Booking";
import { BookingNotFoundMessage } from "../messages/BookingNotFoundMessage";

export class Registry {
  private _bookings: Booking[];

  constructor() {
    this._bookings = [];
  }

  public book(vehicle: Vehicle, vehicleId: string, entryTime: string): Message {
    if (!this.isValidEntryTime(entryTime)) {
      return new InvalidEntryTimeMessage();
    }

    if (vehicle.maxOnTrackReached() && !this.isFreeAtEntryTime(entryTime)) {
      return new RaceTrackFullMessage();
    }

    vehicle.addOneToCurrent();

    const booking = new Booking(vehicleId, vehicle, entryTime);
    this.saveBooking(booking);

    return new SuccessMessage();
  }

  private isFreeAtEntryTime(entryTime: string): boolean {
    const nearestExitBooking = this.getNearestExitTimeBooking();
    return entryTime >= nearestExitBooking.getExitTime();
  }

  private getNearestExitTimeBooking(): Booking {
    return this._bookings[0];
  }

  public extend(vehicleId: string, exitTime: string): Message {
    const booking = this.getBookingByVehicleId(vehicleId);

    if (!booking) {
      return new BookingNotFoundMessage();
    }

    if (!this.isValidExitTime(booking, exitTime)) {
      return new InvalidExitTimeMessage();
    }

    if (!this.isExtendable(booking, exitTime)) {
      return new RaceTrackFullMessage();
    }

    booking.setExtendedExitTime(exitTime);
    return new SuccessMessage();
  }

  public getBookings(): Booking[] {
    return [...this._bookings];
  }

  public getBookingByVehicleId(vehicleId: string): Booking | undefined {
    const foundBooking = this._bookings.find((booking) => {
      return booking.getVehicleId() === vehicleId;
    });
    return foundBooking;
  }

  private isValidEntryTime(entryTime: string): boolean {
    return "13:00" <= entryTime && entryTime <= "17:00";
  }

  private isValidExitTime(booking: Booking, exitTime: string): boolean {
    return booking.getExitTime() < exitTime && exitTime <= "20:00";
  }

  private isExtendable(booking: Booking, exitTime: string): boolean {
    const specificVehicleBookings = this.filterBookingsByVehicle(
      booking.getVehicle()
    );

    const bookingsWithEntryAtExtendedTime = specificVehicleBookings.filter(
      (reg_b) => {
        return (
          booking.getExitTime() <= reg_b.getEntryTime() &&
          reg_b.getEntryTime() <= exitTime
        );
      }
    );

    return bookingsWithEntryAtExtendedTime.length === 0;
  }

  private filterBookingsByVehicle(vehicle: Vehicle): Booking[] {
    const filteredBookings = this._bookings.filter((reg_b) => {
      return vehicle.constructor.name === reg_b.getVehicle().constructor.name;
    });

    return filteredBookings;
  }

  private saveBooking(booking: Booking): void {
    this._bookings.push(booking);
    this._bookings = this._bookings.sort((prev, next) => {
      const [prevHours, prevMinutes] = prev.getExitTime().split(":");
      const [nextHours, nextMinutes] = next.getExitTime().split(":");

      const prevTime = parseInt(prevHours) * 100 + parseInt(prevMinutes);
      const nextTime = parseInt(nextHours) * 100 + parseInt(nextMinutes);

      return prevTime - nextTime;
    });
  }
}
