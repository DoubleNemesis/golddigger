import { EventEmitter } from 'events';
import { logTransaction } from '../handlers/logTransaction.js';
import { generatePDF } from '../handlers/generatePDF.js';

export const buyEvents = new EventEmitter();
buyEvents.on('gold-bought', logTransaction);
buyEvents.on('gold-bought', generatePDF);
