import productListing from "./productListing.js";
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

const updateCartHeight = function(){
    const cartHeadHeight = document.querySelector(".cart-head").clientHeight;
    const cartBtnsHeight = document.querySelector(".cart_btns").clientHeight;
    const cartProdHeight = window.innerHeight - (cartHeadHeight + cartBtnsHeight);
    document.querySelector(".cart_prod").style.height = `${cartProdHeight}px`;
}
updateCartHeight();
window.addEventListener("resize", updateCartHeight)

document.querySelector(".cart").addEventListener("click", function(){
    document.documentElement.classList.add('show_cart', "stop-scroll");
})
document.querySelector(".cart_drawer #cart-close").addEventListener("click", function(){
    document.documentElement.classList.remove('show_cart', "stop-scroll");
})

const menu = document.querySelector(".menu");
const mobMenu = document.querySelector(".mob-menu");

const mobmenuFn = function(){
    document.querySelector(".mob-menu-icon").addEventListener("click", function(){
        mobMenu.classList.add("show-menu");
        document.documentElement.classList.add("stop-scroll");
    })

    mobMenu.querySelector(".close-btn").addEventListener("click", function(){
        mobMenu.classList.remove("show-menu");
         document.documentElement.classList.remove("stop-scroll");
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