const eventSource = new EventSource("http://localhost:8001/api/price");

const priceDisplay = document.getElementById("price-display");
const connectionStatus = document.getElementById("connection-status");
const investmentSummary = document.getElementById("investment-summary");
const investmentInput = document.getElementById("investment-amount");
const dialog = document.querySelector("dialog");
const closeButton = dialog.querySelector("button");

// Handle live price updates
eventSource.onmessage = (event) => {
  connectionStatus.textContent = "Live prices 🟢";
  const data = JSON.parse(event.data);
  const price = parseFloat(data.price);

  if (data.event === "price-updated") {
    priceDisplay.textContent = price.toFixed(2);
  }
};

// Handle connection loss
eventSource.onerror = () => {
  connectionStatus.textContent = "Disconnected 🔴";
  priceDisplay.textContent = "----.--";
};

// Show dialog and reset input on close
closeButton.addEventListener("click", () => {
  dialog.close();
  investmentInput.value = "";
});

// Handle gold investment submission
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const amountPaid = parseFloat(investmentInput.value);

  if (!amountPaid || isNaN(amountPaid) || amountPaid <= 0) {
    alert("Please enter a valid amount to invest.");
    return;
  }

  try {
    const response = await fetch("./api/invest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amountPaid }),
    });

    const { amountBought, amountToDebit } = await response.json();

    if (!response.ok) {
      investmentSummary.textContent = `There was a problem.\nPlease try again later.`;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    investmentSummary.textContent =
      `You bought ${amountBought} ounces (ozt) for £${amountToDebit}.\n` +
      `The sale has executed and we’re preparing your documentation.`;

    dialog.showModal();
  } catch (err) {
    console.error("Error during investment:", err);
    connectionStatus.textContent = "Request failed";
  }
});
