const items = [
  { name: "Kaffee", price: "3.50" },
  { name: "Tee", price: "2.50" },
  { name: "Apfelschorle", price: "3.00" },
  { name: "Wasser", price: "2.00" },
  { name: "Bratwurst", price: "5.80" },
  { name: "Pommes", price: "2.50" },
  { name: "Currywurst", price: "6.20" },
  { name: "Salat", price: "4.50" },
  { name: "Kuchen", price: "3.80" },
  { name: "Berliner", price: "2.80" },
  { name: "Muffin", price: "2.50" },
  { name: "Waffel", price: "3.20" },
  { name: "Schnitzel", price: "8.50" },
  { name: "Brötchen", price: "1.00" },
  { name: "Brezel", price: "1.20" },
  { name: "Leberkäse", price: "4.00" },
];

const createMenuItemElement = (name, priceText) => {
  return `<div class="inputItem">
            <span class="itemLabel">${name}</span>
            <span class="itemPrice">${priceText} €</span>
          </div>`;
};

const createOrderItemElement = (name, priceText) => {
  return `<div class="orderItem">
            <p class="orderLabel">${name}: ${priceText} €</p>
            <div class="orderLine"></div>
          </div>`;
};

const checkout = (sum, isDelivery, callback) => {
  if (sum === 0) {
    alert("Bitte fügen Sie Artikel hinzu.");
    return;
  }

  const deliveryFee = 2.5;
  const totalSum = isDelivery ? sum + deliveryFee : sum;
  const deliveryText = isDelivery ? "Ihre Bestellung" : "Ihren Einkauf";

  alert(
    "Vielen Dank für " +
      deliveryText +
      "! Ihr Gesamtbetrag beträgt " +
      totalSum.toFixed(2) +
      " Euro.",
  );

  callback();
};

document.addEventListener("DOMContentLoaded", function () {
  const menuContainer = document.getElementById("inputGroup");
  const orderList = document.getElementById("orderList");
  const resultContainer = document.getElementById("totalPriceDisplay");
  const clearButton = document.getElementById("resetButton");
  const onSiteButton = document.getElementById("onSiteButton");
  const deliveryButton = document.getElementById("deliveryButton");

  let total = 0;

  const updateTotalDisplay = () => {
    resultContainer.textContent = `${total.toFixed(2)} €`;
  };

  const clearOrder = () => {
    orderList.innerHTML = "";
    total = 0;
    updateTotalDisplay();
  };

  items.forEach((item) => {
    const menuItem = createMenuItemElement(item.name, item.price);
    menuContainer.innerHTML += menuItem;
  });

  menuContainer.addEventListener("click", (event) => {
    const childrenItems = [...menuContainer.children];
    console.log(childrenItems);

    const itemElement = event.target.closest(".inputItem");
    if (!itemElement) return;

    const index = childrenItems.indexOf(itemElement);
    const selectedItem = items[index];

    const orderElement = createOrderItemElement(
      selectedItem.name,
      selectedItem.price,
    );

    orderList.innerHTML += orderElement;

    const priceValue = parseFloat(selectedItem.price);
    total += priceValue;
    console.log(total);
    updateTotalDisplay();
  });

  clearButton.addEventListener("click", clearOrder);

  onSiteButton.addEventListener("click", () => {
    checkout(total, false, clearOrder);
  });

  deliveryButton.addEventListener("click", () => {
    checkout(total, true, clearOrder);
  });
});
