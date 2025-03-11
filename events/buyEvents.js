import { EventEmitter } from 'events';
import { logTransaction } from '../handlers/logTransaction.js';
import { generatePDF } from '../handlers/generatePDF.js';

export const buyEvents = new EventEmitter();
buyEvents.on('currency-bought', logTransaction);
buyEvents.on('currency-bought', generatePDF);
