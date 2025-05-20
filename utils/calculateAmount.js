export function calculateAmount(amountPaid, price) {
    return Number((amountPaid / price).toFixed(3))
}