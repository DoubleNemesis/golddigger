let price = 0; // Latest gold price (in £ per ounce)

export function updatePriceState(newPrice) {
    price = newPrice;
}

export function getCurrentPrice() {
    return price;
}
