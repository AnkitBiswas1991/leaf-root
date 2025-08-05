
const orderConfirmed = function(){
    const orderConfirmed = document.querySelector(".order-confirmed");
    const billShip = document.querySelector(".billing-shipping");
    const curData = JSON.parse(sessionStorage.getItem("buy-product"));
    const allCartItem = JSON.parse(sessionStorage.getItem("addToCart"));
    const discount = JSON.parse(sessionStorage.getItem("discount-amount"));
    const billShipDetail = JSON.parse(sessionStorage.getItem("Bill-Ship-Detail"));
    let curdataPrice;
        let curDataShipping;
        let curdataTotal;
        if(curData){
            curdataPrice = (curData.quantity * curData.price).toFixed(2);
            curDataShipping = curdataPrice > 2000 ? "Free" : `$500`;
            curdataTotal = curdataPrice > 2000 ? (+curdataPrice).toFixed(2) : (+curdataPrice + 500).toFixed(2);
        }
        const subtotal = allCartItem?.reduce((acc, item) => acc +  (item.price * item.quantity),0);
        const shippamnt = subtotal < 2000 && subtotal > 0 ? '$500.00' : 'Free Shipping';
        const taxAmount = (subtotal * 0.05).toFixed(2);
        let total = subtotal < 2000 && subtotal > 0 ? (+taxAmount + subtotal + +shippamnt.slice(1)).toFixed(2) : (+taxAmount + subtotal).toFixed(2);
        if (discount){total = total - discount};
        // let total = subtotal < 2000 && subtotal > 0 ? (+taxAmount + subtotal + +shippamnt.slice(1)).toFixed(2) : (+taxAmount + subtotal).toFixed(2);

    if(orderConfirmed){
        const orderDetailHtml = `
            <ul class="list-unstyled mt-4">
                ${
                curData ?
                    `<li class="row align-items-center border-bottom pb-3 mb-3 gx-0">
                        <div class="mb-3 mb-sm-0 me-sm-3 col-sm-4 col-xl-3">
                            <figure class="position-relative overflow-hidden">
                                <img src='${curData.image[0]}' alt="${curData.name}" class="position-absolute top-50 start-50 translate-middle w-100 h-100"/>
                            </figure>
                        </div>
                        <div class="col-sm-7 col-xl-8 small">
                            <h5 class="mb-0">${curData.name}</h5>
                            <p>Qty: ${curData.quantity}</p>
                            <p>Amount: $${curdataPrice}</p>
                            <p>Shipping Charge: ${curDataShipping}</p>
                        </div>
                    </li>`
                :
                allCartItem?.map(item => 
                        `<li class="row align-items-center pb-3 mb-3 border-bottom gx-0">
                        <div class="mb-3 mb-sm-0 me-sm-3 col-sm-4 col-xl-3">
                            <figure class="position-relative overflow-hidden">
                                <img src='${item.image[0]}' alt="${item.name}" class="position-absolute top-50 start-50 translate-middle w-100 h-100"/>
                            </figure>
                        </div>
                        <div class="col-sm-7 col-xl-8 small">
                            <h5 class="mb-0">${item.name}</h5>
                            <p>Qty: ${item.quantity}</p>
                            <p>Amount: $${item.quantity * item.price}</p>
                        </div>
                        </li>`
                ).join("")}
            </ul>
            ${curData ? `` : `<ul class="list-unstyled mb-3 pb-3 border-bottom">
                <li class="d-flex align-items-center justify-content-between mb-2">
                    <strong>Subtotal</strong>
                    <span class="subtotal">$${subtotal.toFixed(2)}</span>
                </li>
                <li class="d-flex align-items-center justify-content-between mb-2">
                    <strong>Shipping Charge</strong>
                    <span class="shipping">${shippamnt}</span>
                </li>
                <li class="d-flex align-items-center justify-content-between mb-2">
                    <strong>Sales Tax <span class="fw-normal small">(5%)</span></strong>
                    <span class="tax">$${taxAmount}</span>
                </li>
                <li class="d-flex align-items-center justify-content-between text-danger">
                    <strong>Discount</strong>
                    <span class="discountAmount">${discount ? `$${discount}` : '$0.00'}</span>
                </li>
            </ul>`}
            <ul class="list-unstyled">
                <li class="d-flex align-items-center justify-content-between mb-2">
                    <strong>Total Amount</strong>
                    <span class="total">$${curData ? curdataTotal : (+total).toFixed(2)}</span>
                </li>
            </ul>`;

        orderConfirmed.insertAdjacentHTML("beforeend", orderDetailHtml);
    }

    if(billShip){
        const billingShipping = `
        <div class="row">
            <div class="col-md-6">
                <h3 class="fs-4">Shipping Address</h3>
                <ul class="list-unstyled">
                    <li class="mb-2">First Name: ${billShipDetail.firstname}</li>
                    <li class="mb-2">Last Name: ${billShipDetail.lastname}</li>
                    <li class="mb-2">Email: ${billShipDetail.email}</li>
                    <li class="mb-2">Phone No.: ${billShipDetail.phone}</li>
                    <li class="mb-2">Address 1 (Street or PO Box): ${billShipDetail.address1}</li>
                    <li class="mb-2">Address 2 (APT, SUITE, FLOOR): ${billShipDetail.address2}</li>
                    <li class="mb-2">City: ${billShipDetail.city}</li>
                    <li class="mb-2">State: ${billShipDetail.state}</li>
                    <li class="mb-2">ZIP Code: ${billShipDetail.zip}</li>
                </ul>
            </div>
            <div class="col-md-6">
                <div class="billing-sec pt-3 pt-md-0 mt-3 mt-md-0">
                    <h3 class="fs-4">Billing Address</h3>
                    <ul class="list-unstyled">
                        <li class="mb-2">First Name: ${billShipDetail.billFirstname}</li>
                        <li class="mb-2">Last Name: ${billShipDetail.billLastname}</li>
                        <li class="mb-2">Email: ${billShipDetail.billEmail}</li>
                        <li class="mb-2">Phone No.: ${billShipDetail.billPhone}</li>
                        <li class="mb-2">Address 1 (Street or PO Box): ${billShipDetail.billAddress1}</li>
                        <li class="mb-2">Address 2 (APT, SUITE, FLOOR): ${billShipDetail.billAddress2}</li>
                        <li class="mb-2">City: ${billShipDetail.billCity}</li>
                        <li class="mb-2">State: ${billShipDetail.billState}</li>
                        <li class="mb-2">ZIP Code: ${billShipDetail.billZip}</li>
                    </ul>
                </div>
            </div>
        </div>`
        billShip.insertAdjacentHTML("beforeend", billingShipping);
    }
}

export default orderConfirmed;