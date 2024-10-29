import { readFileSync } from "fs";
import { GeekRacers } from "./GeekRacers";

const filePath = process.argv[2];
const geekRacers = new GeekRacers();

const data = readFileSync(filePath, "utf8");

const dataLines = data.split("\r\n");

dataLines.forEach((line) => {
  const [comand, ...args] = line.split(" ");
  if (comand === "BOOK") {
    const [vehicleType, vehicleId, entryTime] = args;
    const bookingResult = geekRacers.book(vehicleType, vehicleId, entryTime);
    console.log(bookingResult);
  }

  if (comand === "ADDITIONAL") {
    const [vehicleId, exitTime] = args;
    const extensionResult = geekRacers.extend(vehicleId, exitTime);
    console.log(extensionResult);
  }

  if (comand === "REVENUE") {
    const revenue = geekRacers.getTotalRevenue();
    console.log(revenue);
  }
});
