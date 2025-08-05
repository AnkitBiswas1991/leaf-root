const cart = function(){
    const cartSec = document.querySelector(".cart .container");
    const allCartItem = JSON.parse(localStorage.getItem("addToCart"))
    let subtotal = allCartItem?.reduce((acc, item) => acc +  (item.price * item.quantity),0);
    const coupon = [
        {
            couponCode:  "FREE30",
            discount: 30,
        },
        {
            couponCode:  "FREE50",
            discount: 50,
        },
        {
            couponCode:  "FREE500",
            discount: 500,
        },
        {
            couponCode:  "FREE1000",
            discount: 1000,
        }
    ];
    
    if(cartSec){
        const html = `
        <div class="row gx-3 gx-lg-4 gx-xl-5">
            <div class="col-lg-8">
                <div class="cart-table table-responsive">
                    <table class="table mb-0">
                        <tr class="border-dark">
                            <th>Cart Item</th>
                            <th align="center" valign="middle" class="text-center">Quantity</th>
                            <th align="center" valign="middle" class="text-center">Price</th>
                            <th align="center" valign="middle" class="text-center"></th>
                        </tr>
                        ${allCartItem.map(items => `
                            <tr>
                            <td>
                                <div class="d-flex gap-3 align-items-center cart-item-warpper">
                                        <figure class="cart-img position-relative overflow-hidden">
                                            <img class="position-absolute w-100 h-100 top-50 start-50 translate-middle" src=${items.image[0]} alt=${items.name}/>
                                        </figure>
                                    <h5 class="mb-0">${items.name}</h5>
                                </div>
                            </td>
                            <td align="center" valign="middle">
                                ${items.quantity}
                            </td>
                            <td align="center" valign="middle">
                                <span class="price">$${items.quantity * items.price}</span>
                            </td>
                            <td align="center" valign="middle"><i class="fa-solid fa-circle-xmark cursor-pointer text-danger removeItem"></i></td>
                        </tr>
                            `).join("")}
                    </table>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="cart-total mt-4 mt-lg-0">
                    <h3 class="mb-3 pb-2 border-bottom border-dark"> Your Cart Summary
                    </h3>
                    <div class="p-2 rounded-2 border border coupon-sec mb-3">
                        <h6 class="mb-0 d-flex align-items-center justify-content-between">Apply Coupon <span id="coupons_available" class="text-capitalize cursor-pointer">Available Coupons</span></h6>
                        <form class="input-group input-group-sm">
                            <input type="text" class="form-control">
                            <button class="btn text-white">Apply</button>
                            
                        </form>
                    </div>
                    <ul class="list-unstyled pb-2 mb-lg-3 pb-lg-3 border-bottom">
                        <li class="d-flex align-items-center justify-content-between mb-2">
                            <strong>Subtotal</strong>
                            <span class="subtotal">$${subtotal.toFixed(2)}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between mb-2">
                            <strong>Shipping Charge</strong>
                            <span class="shipping"></span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between mb-2">
                            <strong>Sales Tax <span class="fw-normal small">(5%)</span></strong>
                            <span class="tax">$${subtotal * 0.05}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between text-danger discount-sec">
                            <strong>Discount</strong>
                            <span class="discountAmount">$0.00</span>
                        </li>
                    </ul>
                    <ul class="list-unstyled">
                        <li class="d-flex align-items-center justify-content-between mb-2">
                            <strong>Total Amount</strong>
                            <span class="total"></span>
                        </li>
                    </ul>
                    <div class="d-grid my-3">
                        <a href="checkout.html" class="btn text-white">Proceed to Checkout</a>
                    </div>
                </div>
            </div>
        </div>
        `
        
        cartSec.insertAdjacentHTML("afterbegin", html);
        let shippamnt;
        const priceCal = function(){
            shippamnt = subtotal < 2000 && subtotal > 0 ? `$500.00` : 'Free Shipping';
            document.querySelector(".shipping").innerHTML = shippamnt;
            const taxAmount = (subtotal * 0.05).toFixed(2); 
            document.querySelector(".tax").innerHTML = `$${taxAmount}`;

            // let total = subtotal < 2000 && subtotal > 0 ? +taxAmount + subtotal + +shippamnt.slice(1) : +taxAmount + subtotal;
            const totalAmnt = function(){
                return subtotal < 2000 && subtotal > 0 ? +taxAmount + subtotal + +shippamnt.slice(1) : +taxAmount + subtotal;
            }

            document.querySelector(".total").innerHTML = `$${totalAmnt().toFixed(2)}`;

            const couponFrom = document.querySelector(".coupon-sec form");

            
            
            const getDiscountAmnt = JSON.parse(sessionStorage.getItem("discount-amount"));
            const navEntries = performance.getEntriesByType("navigation")[0];
            if(navEntries.type === "reload" || navEntries.type === "navigate" || navEntries.type === "back_forward"){
                if(getDiscountAmnt) {
                    document.querySelector(".discountAmount").innerHTML = `$${(+getDiscountAmnt).toFixed(2)}`;
                    document.querySelector(".total").innerHTML = `$${(totalAmnt() - getDiscountAmnt).toFixed(2)}`;
                }
            }

            couponFrom.addEventListener("submit", function(e){
                e.preventDefault();
                const appliedCoupon = this.querySelector("input").value;
                const matchedCoupon = coupon.find(c => c.couponCode === appliedCoupon);
                // const getDiscountAmnt = JSON.parse(sessionstorage.getItem("discount-amount"));
                
                // console.log(+getDiscountAmnt, matchedCoupon.discount);
                document.querySelector(".discountAmount").innerHTML = matchedCoupon ? `$${(+matchedCoupon.discount).toFixed(2)}` : "$0.00";

                const couponErr = function(errMsg){
                    if(couponFrom.querySelector(".form-err")){
                        couponFrom.querySelector(".form-err").innerHTML = `${errMsg}`;
                    } else {
                        couponFrom.insertAdjacentHTML("beforeend", `<span class='form-err w-100 mt-2 lh-1 text-danger'>${errMsg}</span>`);
                    }
                };

                if(appliedCoupon === ""){
                    couponErr("Enter a Coupon Code")
                } else if(!matchedCoupon){
                    couponErr("This Coupon Code Doesn't Exist");
                } else{
                    if(subtotal >= matchedCoupon?.discount * 1.2){
                        const discountAmnt = document.querySelector(".discountAmount").innerHTML.slice(1);
                        document.querySelector(".total").innerHTML = `$${(totalAmnt() - +discountAmnt).toFixed(2)}`;
                        couponFrom.querySelector(".form-err")?.remove();
                        this.querySelector("input").value = "";
                        sessionStorage.setItem("discount-amount", JSON.stringify(discountAmnt));
                    } else {
                        document.querySelector(".discountAmount").innerHTML = "$0.00";
                        couponErr(`Little more leaf, big coupon relief! Add a bit more to reach $${matchedCoupon?.discount * 1.2}`);
                        
                    }
                }
            })
        }
        if(allCartItem.length === 0) sessionStorage.removeItem("discount-amount");
        priceCal();

        const addNote = function(){
            if(subtotal < 2000 && !document.querySelector(".cart-total").querySelector(".note")){
                document.querySelector(".cart-total").insertAdjacentHTML("beforeend", "<div class='p-1 rounded note small text-center'>Just reach $2000 in Subtotal and your shipping is on us!</div>")
            };
        }
        addNote();

        const couponPopup = `
        <div class="showCoupon position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center opacity-0 visually-hidden">
            <div class="show-coupon-inner rounded-3 pt-2 bg-white position-relative">
                <button class="btn close-popup position-absolute top-0 end-0 mt-2 me-2 mt-md-3 me-md-3 p-0 lh-1"><i class="fa-solid fa-circle-xmark cursor-pointer"></i></button>
                <h4 class="p-3 pb-2 mb-2 border-bottom"> Our Available Coupons</h4>
                 <ul class="list-unstyled p-3">
                    ${coupon.map(coupon => 
                        `<li class="mb-3 mb-md-4">
                            <h5 class="mb-0 lh-1">${coupon.couponCode}</h5>
                            <p>Get a flat discount of $${coupon.discount}</p>
                        </li>`
                    ).join("")}
                </ul>
            </div>
        </div>`
        document.body.insertAdjacentHTML("beforeend", couponPopup);
        const couponClass = document.querySelector(".showCoupon").classList;
        document.querySelector("#coupons_available").addEventListener("click", function(){
            couponClass.remove("opacity-0", "visually-hidden");
        });
        document.querySelector(".showCoupon .close-popup").addEventListener("click", function(){
            couponClass.add("opacity-0", "visually-hidden");
        })
        const noCartItem = function(){
             if(!allCartItem.length){
                document.querySelector(".cart-table").insertAdjacentHTML("beforeend", "<div class='text-center px-2 py-3'><p class='mb-3'>No Item is Added</p><a href='plant-listing.html' class='btn btn-sm px-4 py-2 text-white'>Buy a Plant</a></div>");
                sessionStorage.removeItem("discount-amount");
            }
        }
        document.querySelectorAll(".removeItem").forEach(el => {
                el.addEventListener("click", function(){
                const removePlant = this.closest("tr").querySelector("h5").innerHTML;
                const removedItemIdx = allCartItem.findIndex(item => item.name === removePlant);
               
                allCartItem.splice(removedItemIdx, 1);
                localStorage.setItem("addToCart", JSON.stringify(allCartItem));
                this.closest("tr").remove();
                document.querySelector(".cart-num").innerHTML = allCartItem.reduce((acc, item) => acc + item.quantity, 0);

                const removeItemPrice = this.closest("tr").querySelector(".price").innerHTML.slice(1);
                document.querySelector(".subtotal").innerHTML = `$${(subtotal - removeItemPrice).toFixed(2)}`;
                subtotal = subtotal - removeItemPrice;
                noCartItem();
                priceCal();
                addNote();

                let discountedAmount = document.querySelector(".discountAmount").innerHTML.slice(1);
                if(subtotal < +discountedAmount * 1.2){
                    document.querySelector(".discountAmount").innerHTML = "$0.00";
                    sessionStorage.removeItem("discount-amount");
                    priceCal();
                }
                
            })
        })
       noCartItem();
    }
}

export default cart;