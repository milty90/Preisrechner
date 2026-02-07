const items = [
  { name: "Kaffee", price: 350 },
  { name: "Tee", price: 250 },
  { name: "Apfelschorle", price: 300 },
  { name: "Wasser", price: 200 },
  { name: "Bratwurst", price: 580 },
  { name: "Pommes", price: 250 },
  { name: "Currywurst", price: 650 },
  { name: "Salat", price: 450 },
  { name: "Kuchen", price: 380 },
  { name: "Berliner", price: 280 },
  { name: "Muffin", price: 250 },
  { name: "Waffel", price: 320 },
  { name: "Schnitzel", price: 850 },
  { name: "Brötchen", price: 100 },
  { name: "Brezel", price: 120 },
  { name: "Leberkäse", price: 400 },
];

let total = 0;

const menuContainer = document.getElementById("inputGroup");
const orderList = document.getElementById("orderList");
const resultContainer = document.getElementById("totalPriceDisplay");
const clearButton = document.getElementById("resetButton");
const onSiteButton = document.getElementById("onSiteButton");
const deliveryButton = document.getElementById("deliveryButton");
const modal = document.getElementById("myModal");
const closeModalButton = document.getElementById("close-button");

function formatCurrency(price) {
  return `${(price / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  })}`;
}

function openModal(title, message) {
  modal.style.display = "block";
  const modalTitle = document.getElementById("modal-title");
  modalTitle.textContent = title;
  const modalContent = document.getElementById("modal-content");
  modalContent.textContent = message;
}

function closeModal() {
  modal.style.display = "none";
}

const updateTotalDisplay = () => {
  resultContainer.textContent = formatCurrency(total);
};

const clearOrder = () => {
  orderList.innerHTML = "";
  total = 0;
  updateTotalDisplay();
};

function renderMenu() {
  items.forEach((item) => {
    const menuItem = `<div class="inputItem">
            <span class="itemLabel">${item.name}</span>
            <span class="itemPrice">${formatCurrency(item.price)}</span>
          </div>`;
    menuContainer.innerHTML += menuItem;
  });
}

function renderOrder(name, price) {
  const orderElement = `<div class="orderItem">
            <p class="orderLabel">${name}: 
            ${formatCurrency(price)}</p>
            <div class="orderLine"></div>
          </div>`;
  orderList.innerHTML += orderElement;
}

function calculateTotal(price) {
  total += price;
}

function renderTotal() {
  menuContainer.addEventListener("click", (event) => {
    const childrenItems = [...menuContainer.children];
    const itemElement = event.target.closest(".inputItem");
    const index = childrenItems.indexOf(itemElement);
    const selectedItem = items[index];

    renderOrder(selectedItem.name, selectedItem.price);

    const priceValue = selectedItem.price;
    calculateTotal(priceValue);
    updateTotalDisplay();
  });
}

const checkout = (sum, isDelivery, modalCallback, clearOrderCallback) => {
  const deliveryFee = 250;
  const totalSum = isDelivery ? sum + deliveryFee : sum;
  const deliveryText = isDelivery ? "Ihre Bestellung" : "Ihren Einkauf";

  if (sum === 0) {
    modalCallback("Achtung!", "Bitte fügen Sie Artikel hinzu.");
    return;
  }

  if (isDelivery && sum < 2000) {
    modalCallback(
      "Achtung!",
      `Der Mindestbestellwert für eine Lieferung beträgt 20 €. 
      Ihr aktueller Bestellwert ist ${formatCurrency(sum)}. Bitte fügen Sie weitere Artikel hinzu.`,
    );
    return;
  }

  modalCallback(
    "Quittung!",
    `Vielen Dank für ${deliveryText} im Wert von ${formatCurrency(totalSum)}. ${
      isDelivery
        ? `Die Liefergebühr von ${formatCurrency(deliveryFee)} ist enthalten.`
        : ""
    }`,
  );

  clearOrderCallback();
};

renderMenu();
renderTotal();

clearButton.addEventListener("click", clearOrder);

closeModalButton.addEventListener("click", closeModal);

onSiteButton.addEventListener("click", () => {
  checkout(total, false, openModal, clearOrder);
});

deliveryButton.addEventListener("click", () => {
  checkout(total, true, openModal, clearOrder);
});
