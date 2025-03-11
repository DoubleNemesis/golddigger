import fs from "node:fs"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function logTransaction(amount, price) {
    const timeStamp = new Date()
    const content = `${timeStamp}, amount paid: ${amount}, price: ${price}, amount gold sold: ${amount/price} Oz. \n`
    let pathToFile = path.join(__dirname, '../logs', "transactions.txt");
    fs.appendFile(pathToFile, content, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}
