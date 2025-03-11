import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generatePDF(amount, price) {
    const timeStamp = new Date().toLocaleTimeString()
  console.log("pdf generated", amount, price);
  let pathToFile = path.join(__dirname, "../pdfs", `${timeStamp}.pdf`);
  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  doc.pipe(fs.createWriteStream(pathToFile));
  // Embed a font, set the font size, and render some text
  doc
    // .font("fonts/PalatinoBold.ttf")
    .fontSize(15)
    .text(
      `Thank you for you're order. This document confirms you have bought ${
        amount / price
      } Oz of 24 carat gold at £${price} per Oz. We have debited £${amount} from your account`,
      100,
      100
    );

  // Finalize PDF file
  doc.end();
}
