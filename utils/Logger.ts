import { Console } from "console";
import fs from "fs";

// Create a writable stream for log file
const logFile = fs.createWriteStream("playwright-e2e.log", { flags: "a" });

export class Log {
  static info(message: string): void {
    const timestamp = new Date().toISOString();
    logFile.write(`[INFO] [${timestamp}] ${message}\n`);
    console.log(`[INFO] [${timestamp}] ${message}`);
  }

  static error(message: string): void {
    const timestamp = new Date().toISOString();
    logFile.write(`[ERROR] [${timestamp}] ${message}\n`);
    console.error(`[ERROR] [${timestamp}] ${message}`);
  }
}
