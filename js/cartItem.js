const cartItem = function(){

    const allCartItem = JSON.parse(localStorage.getItem("addToCart")) || [];
    document.querySelector(".cart-num").innerHTML = allCartItem.reduce((acc, item) => acc + item.quantity, 0);

    
    const cartItemList = function(){
        const html = `<ul class="list-unstyled">
        ${allCartItem.map(
            cart => {
                return `<li class="pb-3 mb-3 border-bottom">
                <div class="row gx-3 justify-content-between align-items-center">
                    <div class="col-lg-5">
                        <figure class="position-relative overflow-hidden">
                            <img src="${cart.image[0]}" class="position-absolute top-50 start-50 translate-middle object-fit-cover w-100 h-100" alt="${cart.name}"/>
                        </figure>
                    </div>
                    <div class="col-lg-7">
                        <h5 class="mb-0">${cart.name}</h5>
                        <div class="small">
                            <p>Amount : $${cart.price * cart.quantity}</p>
                            <p>Quantity : ${cart.quantity}</p>
                        </div>
                    </div>
                </div>
            </li>`}
        ).join("")}
        </ul>`;
        if(allCartItem.length){
            document.querySelector(".cart_prod").innerHTML = "";
            document.querySelector(".cart_prod").insertAdjacentHTML("beforeend", html);
        } else {
            document.querySelector(".cart_prod").insertAdjacentHTML("beforeend", "<div class='text-center px-2 py-3'><p class='mb-3'>No Item is Added</p><a href='plant-listing.html' class='btn btn-sm px-4 py-2 text-white'>Buy a Plant</a></div>");
        }

    }
    cartItemList();
}

export default cartItem;