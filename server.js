import { createServer } from "http";
import { handleAPI } from "./routes/api.js";
import { serveStatic } from "./routes/static.js";
import { priceEvents } from "./events/priceEvents.js";
import { getGoldPrice } from "./mock-data/getGoldPrice.js";
import { updatePriceState } from './state/priceState.js';

 
const PORT = 8001; 
 
// Update gold prices periodically

setInterval(() => { 
  const goldPrice = getGoldPrice()
  updatePriceState(goldPrice)
  priceEvents.emit("price-updated", goldPrice);
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
