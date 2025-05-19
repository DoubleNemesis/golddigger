const eventSource = new EventSource("http://localhost:8001/api/price");
const priceDisplay = document.getElementById("price-display");
const connectionStatus = document.getElementById("connection-status");
const investmentSummary = document.getElementById("investment-summary");

// Handle incoming messages
eventSource.onmessage = (event) => {
  connectionStatus.textContent = "Live prices 🟢";
  const data = JSON.parse(event.data);
  const price = parseFloat(data.price);
  if (data.event === "price-updated") {
    priceDisplay.textContent = `${price.toFixed(2)}`;
  }
};

// Handle connection errors
eventSource.onerror = () => {
  connectionStatus.textContent = "Disconnected 🔴";
  priceDisplay.textContent = `----:--`;
};

// handle investing in gold
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const amountPaid = document.getElementById("investment-amount").value;
  if (amountPaid) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch("./api/invest", {
        method: "POST",
        body: JSON.stringify({ amountPaid: amountPaid }),
        headers: myHeaders,
      });
      const json = await response.json();
      const { amountBought, amountToDebit } = json;

      const dialog = document.querySelector("dialog");
      const closeButton = document.querySelector("dialog button");

      dialog.showModal();

      closeButton.addEventListener("click", () => {
        dialog.close();
        document.getElementById("investment-amount").value = "";
      });

      investmentSummary.textContent = `You bought ${amountBought} ounces (ozt) for £${amountToDebit}. \n The sale has executed and we're preparing your documenation.`;

      if (!response.ok) {
        investmentSummary.textContent = `There was a problem. \n Please try again later.  `;
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.log("this is an error: ", err);
    }
  }
});
