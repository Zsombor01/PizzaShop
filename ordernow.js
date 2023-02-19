const pizzaList = document.querySelector('.pizzaOrders');
const orderedPizzas = document.querySelector('.orders-container');
const subTotalCont = document.querySelector('.subTotalCont');

function renderPizzas() {
    pizzas.forEach((pizza) => {
      pizzaList.innerHTML += 
      `<div class="row align-items-center py-3 border-bottom">
            <span class="col-2">${pizza.id}</span>
            <span class="col-4 pizzaname">${pizza.name}</span>
            <span class="col-3 price">${pizza.price}Ft</span>
            <button class="col-2 btn btn-danger btn-sm ms-4 ordernow" onclick='addToOrder(${pizza.id})'>Order Now</button>
        </div>`;
    });
}
renderPizzas();

let cart = [];
function addToOrder(id) {
    // at first we need to check if the item is already exists or not
    if(cart.some((order) => order.id === id)){
        changeNumberOfPizza('plus', id)
    } else {
        const order = pizzas.find((pizza) => pizza.id === id)

        cart.push({
            ...order,
            orderedNumber: 1,
        });
     }

    updateCart() 
}

function updateCart() {
    renderOrderItems()
    renderSubTotal();
}

// rendering the total price and the checkout button
function renderSubTotal() {
    let totalPrice = 0;
    let totalNumber = 0;

    cart.forEach((pizza) => {
        totalPrice += pizza.price * pizza.orderedNumber;
        totalNumber += pizza.orderedNumber;
    })

    subTotalCont.innerHTML = 
    `<p class="text-center subTotal mb-3">${totalPrice.toFixed(0)}Ft</p>
    <button class="btn btn-danger btn-sm me-4 mb-3" onclick="checkOut()">Proceed to Checkout</button>`
}

function checkOut() {
    alert('Thank you for your order!')
    cart = [];
    updateCart(cart);
}

// rendering the ordered items into the cart and making it appear on the screen
function renderOrderItems() {
    orderedPizzas.innerHTML = ''; // to clear this before we add the new item
    cart.forEach((pizza) => {
        orderedPizzas.innerHTML += 
        `<div class="row align-items-center py-3">
            <span class="col-2">${pizza.id}</span>
            <span class="col-4">${pizza.name}</span>
            <span class="col-2">${pizza.price}Ft</span>
            <span class="col-1 orderednumber">${pizza.orderedNumber}</span>
            <span class="col-1 plus text-center" onclick="changeNumberOfPizza('plus', ${pizza.id})">+</span>
            <span class="col-1 minus text-center" onclick="changeNumberOfPizza('minus', ${pizza.id})">-</span>
            <button class="col-2 btn btn-danger btn-sm ms-4" onclick="removePizza(${pizza.id})">Remove</button>
        </div>`;
    })
}

// Making it available to increment or decrement the ordered number of a pizza
function changeNumberOfPizza(change, id) {
    cart = cart.map((pizza) => {
        let orderedNumber = pizza.orderedNumber;
        if(pizza.id === id) {
            if(change === "minus" && orderedNumber > 1) {
                orderedNumber--;
            } else if(change === "plus") {
                orderedNumber++;
            }
        }

        return {
            ...pizza,
            orderedNumber,
        };
    });
updateCart();
}

function removePizza(id) {
    cart = cart.filter((pizza) => pizza.id !== id);
    updateCart();
}