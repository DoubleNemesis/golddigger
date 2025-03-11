import { createServer } from "http";
import { handleAPI } from "./routes/api.js";
import { serveStatic } from "./routes/static.js";
import { currencyEvents } from "./events/currencyEvents.js";
import { getGoldPrice } from "./mock-data/getCurrencyPrice.js";
import { updatePriceState } from './state/priceState.js';

 
const PORT = 8001; 
 
// Update currency prices periodically

setInterval(() => { 
  const goldPrice = getGoldPrice()
  updatePriceState(goldPrice)
  currencyEvents.emit("price-updated", goldPrice);
}, 1000); 

// Create server and route requests
const server = createServer((req, res) => {
  if (req.url.startsWith("/api")) {
    handleAPI(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
