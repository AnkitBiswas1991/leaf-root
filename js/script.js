import productListing from "./productlisting.js";
import productDetails from "./productDetails.js";
import cartItem from "./cartItem.js";
import cart from "./cart.js";
import checkout from "./checkout.js";
import orderConfirmed from "./orderConfirmed.js";
import index from "./index.js";

productListing();
productDetails();
cart();
checkout();
orderConfirmed();
index();

document.addEventListener("DOMContentLoaded", function(){
    cartItem();
})

document.querySelector(".cart").addEventListener("click", function(){
    document.documentElement.classList.add('show_cart');
})
document.querySelector(".cart_drawer #cart-close").addEventListener("click", function(){
    document.documentElement.classList.remove('show_cart');
})

const menu = document.querySelector(".menu");
const mobMenu = document.querySelector(".mob-menu");

const mobmenuFn = function(){
    document.querySelector(".mob-menu-icon").addEventListener("click", function(){
        mobMenu.classList.add("show-menu");
    })

    mobMenu.querySelector(".close-btn").addEventListener("click", function(){
        mobMenu.classList.remove("show-menu");
    })
}

if(window.innerWidth < 768){
    document.querySelector(".mob-menu").append(menu);
    mobmenuFn();
} else {
    document.querySelector(".des-menu").append(menu);
}

window.addEventListener("resize", function(){
    if(window.innerWidth < 768){
        document.querySelector(".mob-menu").append(menu);
        mobmenuFn();
    } else {
        document.querySelector(".des-menu").append(menu);
    }
})