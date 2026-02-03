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

const checkout = (sum, isDelivery, modal, callback) => {
  if (sum === 0) {
    modal("Bitte fügen Sie Artikel hinzu.");
    return;
  }

  if (isDelivery && sum < 20) {
    modal(
      "Achtung!",
      `Der Mindestbestellwert für eine Lieferung beträgt 20 €. 
      Ihr aktueller Bestellwert ist ${sum.toFixed(2)} €. Bitte fügen Sie weitere Artikel hinzu.`,
    );
    return;
  }

  const deliveryFee = 2.5;
  const totalSum = isDelivery ? sum + deliveryFee : sum;
  const deliveryText = isDelivery ? "Ihre Bestellung" : "Ihren Einkauf";

  modal(
    "Quittung!",
    `Vielen Dank für ${deliveryText} im Wert von ${totalSum.toFixed(2)} €. ${
      isDelivery
        ? `Die Liefergebühr von ${deliveryFee.toFixed(2)} € ist enthalten.`
        : ""
    }`,
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

  const modal = document.getElementById("myModal");
  const closeModalButton = document.getElementById("close-button");

  function openModal(titel, message) {
    modal.style.display = "block";
    const modalTitle = document.getElementById("modal-title");
    modalTitle.textContent = titel;
    const modalContent = document.getElementById("modal-content");
    modalContent.textContent = message;
  }

  function closeModal() {
    modal.style.display = "none";
  }

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
    console.log(...menuContainer.children);

    const itemElement = event.target.closest(".inputItem");
    console.log(itemElement);

    const index = childrenItems.indexOf(itemElement);
    console.log(index);
    const selectedItem = items[index];
    console.log(selectedItem);

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

  closeModalButton.addEventListener("click", closeModal);

  onSiteButton.addEventListener("click", () => {
    checkout(total, false, openModal, clearOrder);
  });

  deliveryButton.addEventListener("click", () => {
    checkout(total, true, openModal, clearOrder);
  });
});
