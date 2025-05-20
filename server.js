import { createServer } from "http";
import { handleAPI } from "./routes/api.js";
import { serveStatic } from "./routes/static.js";
import { priceEvents } from "./events/priceEvents.js";
import { getGoldPrice } from "./mock-data/getGoldPrice.js";
import { updatePriceState } from './state/priceState.js';

 
const PORT = 8001
const PRICE_UPDATE_INTERVAL = 1000 // in milliseconds

 // Simulate live gold price updates every second
setInterval(() => { 
  const goldPrice = getGoldPrice()
  updatePriceState(goldPrice) 
  priceEvents.emit("price-updated", goldPrice) // notify any listeners
}, PRICE_UPDATE_INTERVAL); 

// Create server and route requests
const server = createServer((req, res) => {
  if (req.url.startsWith("/api")) {
    handleAPI(req, res);
  } else {
    serveStatic(req, res);
  }
})

server.on("error", (err) => {
  console.error("Server error:", err);
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
