const pizzaShop = document.querySelector('.pizzaShop');

const tl = new TimelineMax();

tl.fromTo(pizzaShop, 1.2, {x: "150%"}, {x: "0%", ease: Power2.easeInOut});