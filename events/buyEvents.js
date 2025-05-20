import { EventEmitter } from 'events';
import { logTransaction } from '../handlers/logTransaction.js';
import { generatePDF } from '../handlers/generatePDF.js';

// Create an event emitter for buy events
// POINT OUT THAT LISTENER ORDER CAN MATTER IF HANDLER DEPENDS ON SIDE EFFECTS
export const buyEvents = new EventEmitter();

buyEvents.on('gold-bought', logTransaction);
buyEvents.on('gold-bought', generatePDF);
