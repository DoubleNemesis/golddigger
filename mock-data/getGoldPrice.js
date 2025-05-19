function generatePrice(minPrice, maxPrice, step = 10) {
  // Initialize the current price randomly within the range
  let currentPrice = parseFloat(
    (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2)
  );

  return function getNextPrice() {
    // Generate a random direction: -1 or +1
    const direction = Math.random() < 0.5 ? -1 : 1;

    // Generate a random step with fractional value
    const fractionalStep = Math.random() * step; // e.g., step ranges from 0 to 10
    const change = parseFloat(direction * fractionalStep);

    // Apply the change and ensure it's within bounds
    currentPrice = parseFloat(
      Math.max(minPrice, Math.min(maxPrice, currentPrice + change)).toFixed(2)
    );

    return currentPrice.toFixed(2);
  };
}

const minPrice = 1890.57;
const maxPrice = 2250.44;
const step = 10; // Maximum step change

const getGoldPrice = generatePrice(minPrice, maxPrice, step);

// Usage
export { getGoldPrice };
