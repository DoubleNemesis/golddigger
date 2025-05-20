import PDFDocument from "pdfkit";
import fs from "node:fs" // promises?
import path from "path"

const __dirname = import.meta.dirname;

export function generatePDF(amount, price) {
  const timeStamp = Date.now();
  let pathToFile = path.join(__dirname, "../pdfs", `${timeStamp}.pdf`)
  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  doc.pipe(fs.createWriteStream(pathToFile));
  const ounces = (amount / price).toFixed(4);

  doc
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
