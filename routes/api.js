import { priceEvents } from '../events/priceEvents.js';
import { buyEvents } from '../events/buyEvents.js';
import { getCurrentPrice } from '../state/priceState.js'; // ✅ use getter
import { calculateAmount } from '../utils/calculateAmount.js';

export function handleAPI(req, res) {
  if (req.url === '/api/invest' && req.method === 'POST') {
    let buffer = '';
    req.on('data', (chunk) => (buffer += chunk.toString()));

    req.on('end', () => {
      const { amountPaid } = JSON.parse(buffer);
      const price = getCurrentPrice();

      // Fire gold-bought event with the latest price
      buyEvents.emit('gold-bought', amountPaid, price);

      const amountBought = calculateAmount(amountPaid, price);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ amountBought, amountToDebit: amountPaid }));
    });
  }

  else if (req.url === '/api/price') {
    // Set up Server-Sent Events for live price updates
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const onPriceUpdate = (price) => {
      res.write(`data: {"event": "price-updated", "price": ${price}}\n\n`);
    };

    // Subscribe to price updates
    priceEvents.on('price-updated', onPriceUpdate);

    // Clean up when client disconnects
    req.on('close', () => {
      priceEvents.off('price-updated', onPriceUpdate);
    });
  }
}
