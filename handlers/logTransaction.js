import fs from "node:fs/promises";
import path from "path";

const __dirname = import.meta.dirname;

export async function logTransaction(amount, price) {
  const timeStamp = new Date().toISOString();
  // const timeStamp = new Date().toString(); // more human-readable format
  const ounces = (amount / price).toFixed(4);
  const content = `${timeStamp}, amount paid: £${amount}, price per Oz: £${price}, gold sold: ${ounces} Oz\n`;

  const pathToFile = path.join(__dirname, "../logs", "transactions.txt");

  try {
    await fs.appendFile(pathToFile, content);
    console.log("📝 Transaction logged.");
  } catch (err) {
    console.error("❌ Failed to write transaction log:", err);
  }
}
