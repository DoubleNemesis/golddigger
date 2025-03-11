import { currencyEvents } from '../events/currencyEvents.js';
import { buyEvents } from '../events/buyEvents.js';
import { price } from '../state/priceState.js'; 
import { calculateAmount } from '../utils/calculateAmount.js'

export function handleAPI(req, res) {
    if (req.url === '/api/invest' && req.method === 'POST') {
        let buffer = '';
        req.on('data', (chunk) => (buffer += chunk.toString()));
        req.on('end', () => {
            const { amountPaid } = JSON.parse(buffer);
            buyEvents.emit('currency-bought', amountPaid, price);
            const amountBought = calculateAmount(amountPaid, price)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ amountBought: amountBought, amountToDebit: amountPaid}));
        });
    } else if (req.url === '/api/price') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });
        const onPriceUpdate = (price) => {
            res.write(`data: {"event": "price-updated", "price": ${price}}\n\n`);
        };
        currencyEvents.on('price-updated', onPriceUpdate);
        req.on('close', () => {
            currencyEvents.off('price-updated', onPriceUpdate);
        });
    }
}
