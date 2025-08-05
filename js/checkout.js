import priceCal from "./priceCal.js";

const checkout = function(){
    const checkoutForm = document.querySelector(".checkout-form");
    if(checkoutForm){
        const firstNameField = document.querySelector("#firstname");
        const lastNameField = document.querySelector("#lastname");
        const emailField = document.querySelector("#email");
        const phoneField = document.querySelector("#phone");
        const address1Field = document.querySelector("#address-1");
        const address2Field = document.querySelector("#address-2");
        const cityField = document.querySelector("#city");
        const stateField = document.querySelector("#state");
        const zipField = document.querySelector("#zip");
        const billFirstNameField = document.querySelector("#bill-firstname");
        const billLastNameField = document.querySelector("#bill-lastname");
        const billEmailField = document.querySelector("#bill-email");
        const billPhoneField = document.querySelector("#bill-phone");
        const billAddress1Field = document.querySelector("#bill-address-1");
        const billAddress2Field = document.querySelector("#bill-address-2");
        const billCityField = document.querySelector("#bill-city");
        const billStateField = document.querySelector("#bill-state");
        const billZipField = document.querySelector("#bill-zip");
        const cardnum = document.querySelector("#cardnum");
        const expiryDate = document.querySelector("#expiry-date");
        const cvv = document.querySelector("#CVV");
        const fullname = document.querySelector("#fullname");

        const errmsgArr = [
            {element: firstNameField, errmsg: "Please Add First Name"},
            {element: lastNameField, errmsg: "Please Add Last Name"},
            {element: emailField, errmsg: "Please Enter Email Address"},
            {element: phoneField, errmsg: "Please Enter Phone Number"},
            {element: address1Field, errmsg: "Please Enter Address"},
            {element: address2Field, errmsg: "Please Enter Address"},
            {element: cityField, errmsg: "Please Enter City"},
            {element: stateField, errmsg: "Please Enter State"},
            {element: zipField, errmsg: "Please Enter a ZIP Code"},
            {element: billFirstNameField, errmsg: "Please Add First Name"},
            {element: billLastNameField, errmsg: "Please Add Last Name"},
            {element: billEmailField, errmsg: "Please Enter Email Address"},
            {element: billPhoneField, errmsg: "Please Enter Phone Number"},
            {element: billAddress1Field, errmsg: "Please Enter Address"},
            {element: billAddress2Field, errmsg: "Please Enter Address"},
            {element: billCityField, errmsg: "Please Enter City"},
            {element: billStateField, errmsg: "Please Enter State"},
            {element: billZipField, errmsg: "Please Enter a ZIP Code"},
            {element: cardnum, errmsg: "Please Enter Card Numver"},
            {element: expiryDate, errmsg: "Please Enter Expiry Date"},
            {element: cvv, errmsg: "Please Enter CVV Number"},
            {element: fullname, errmsg: "Please Enter Full Name on Card"},
        ]
        const createErr = function(field, errmsg){
            if(!field.closest(".form-group").querySelector(".errMsg")){
                const hugeAmnt = document.createElement("p");
                hugeAmnt.textContent = errmsg;
                field.after(hugeAmnt)
                hugeAmnt.classList.add("small", "text-danger", "errMsg");
            }
        };

        const removeErr = function(field){
            if(field.closest(".form-group").querySelector(".errMsg"))
            field.closest(".form-group").querySelector(".errMsg").remove();
            
        };

        const checkOnKeyUp = function(elm, errMsg){
            elm.addEventListener("blur", function(){
                elm.value === "" ? createErr(elm, errMsg) : removeErr(elm);
            })
        };

        checkoutForm.addEventListener("submit", function(e){
            e.preventDefault();
            errmsgArr.forEach((el) => {
                if(el.element.value === "") createErr(el.element, el.errmsg);
            })
            
            if(checkoutForm.querySelector(".errMsg")){
                console.log("Please fix all these errors");
            } else {
                sessionStorage.setItem("order-placed", "true");
                window.location.href = "order-confirmed.html";
                
                if(sessionStorage.getItem("buy-product")){
                    const boughtItem = JSON.parse(sessionStorage.getItem("buy-product"));
                    const cartedItem = JSON.parse(localStorage.getItem("addToCart"));
                    const getplant = cartedItem.find(item => item.id === boughtItem.id);
                    const getplantIdx = cartedItem.findIndex(item => item.id === boughtItem.id);
                    if(boughtItem.quantity === getplant.quantity){
                        cartedItem.splice(getplantIdx, 1);
                        localStorage.setItem("addToCart", JSON.stringify(cartedItem));
                    } else {
                        const remainingQty = getplant.quantity - boughtItem.quantity;
                        cartedItem[getplantIdx].quantity = remainingQty;
                        localStorage.setItem("addToCart", JSON.stringify(cartedItem));
                    }
                } else {
                    const cartData = JSON.parse(localStorage.getItem("addToCart"))
                    sessionStorage.setItem("addToCart", JSON.stringify(cartData));
                    document.querySelector(".discountAmount").textContent = '-';
                    localStorage.removeItem("addToCart");
                }
                const billshippDetail = {
                    firstname: firstNameField.value,
                    lastname: lastNameField.value,
                    email: emailField.value,
                    phone: phoneField.value,
                    address1: address1Field.value,
                    address2: address2Field.value,
                    city: cityField.value,
                    state: stateField.value,
                    zip: zipField.value,
                    billFirstname: billFirstNameField.value,
                    billLastname: billLastNameField.value,
                    billEmail: billEmailField.value,
                    billPhone: billPhoneField.value,
                    billAddress1: billAddress1Field.value,
                    billAddress2: billAddress2Field.value,
                    billCity: billCityField.value,
                    billState: billStateField.value,
                    billZip: billZipField.value,
                };
                sessionStorage.setItem("Bill-Ship-Detail", JSON.stringify(billshippDetail));
            }
            
        })

        errmsgArr.forEach((el) => checkOnKeyUp(el.element, el.errmsg));

        const showOrUpdateErr = function(elm, errmessage){
            if(elm.closest(".form-group").querySelector(".errMsg")){
                elm.closest(".form-group").querySelector(".errMsg").textContent = errmessage;
            } else {
                createErr(elm, errmessage);
            }
        }

        const validateNum = function(element, numErrMsg, numLength){
            element.addEventListener("input", function(){
                if(isNaN(+this.value)){
                    this.value = this.value.replace(/\D/g, "");
                    showOrUpdateErr(this, numErrMsg)
                    
                } else{
                    removeErr(this) 
                }
            })
            element.addEventListener("blur", function(){
                if(this.value){
                    if(this.value.length > 0 && this.value.length !== numLength){
                        showOrUpdateErr(this, `Please enter a valid ${numLength}-digit number.`)
                    }else{
                        removeErr(this) 
                    }
                } else {
                    createErr(this, numErrMsg);
                }
            })
        };

        const validateEmail = function(elm, errMsg){
            elm.addEventListener("blur", function(){
                if(elm.value){
                    if(!this.value?.includes("@") || !this.value?.includes(".")){
                        const atPos = this.value?.indexOf("@");
                        const dotPos = this.value?.indexOf(".");
                        if(atPos > 0 || dotPos > atPos || dotPos < this.value.length - 1){
                            createErr(this, errMsg);
                        }else {
                            removeErr(this);
                        }
                    }else {
                        removeErr(this);
                    }
                }
            })
        };

        validateNum(phoneField, "Phone Number Should Contain Only Number", 10);
        validateNum(billPhoneField, "Phone Number Should Contain Only Number", 10);
        validateNum(zipField, "Zip Code Should Contain Only Number", 5);
        validateNum(billZipField, "Zip Code Should Contain Only Number", 5);
        validateNum(cardnum,  "Card Number Should Contain Only Number", 16);
        validateNum(cvv,  "Enter Proper CVV", 3);

        validateEmail(emailField, "Enter Proper Email");
        validateEmail(billEmailField, "Enter Proper Email");

        const expDateValidate = function(el){
            if(el?.value?.length === 5){
                const mmyy = el.value.split("/");

                const now = new Date();
                const month = String(now.getMonth() + 1);
                const year = String(now.getFullYear()).slice(2);

                if(+mmyy[0] === 0 || +mmyy[0] > 12){
                    if(el.closest(".form-group").querySelector(".errMsg")){
                        el.closest(".form-group").querySelector(".errMsg").textContent = "Enter a Valid Month";
                    } else {
                        createErr(el, "Enter a Valid Month");
                    }
                }else if(+mmyy[1] < +year || (+mmyy[0] < +month && +mmyy[1] <= +year)){
                    if(el.closest(".form-group").querySelector(".errMsg")){
                        el.closest(".form-group").querySelector(".errMsg").textContent = "Enter a Future Date";
                    } else {
                        createErr(el, "Enter a Future Date");
                    }
                }else {
                    removeErr(el);
                }

            }
        }

        // fullname.addEventListener("input", function(){
        //         if(/[^a-zA-Z]/g.test(this.value)){
        //             showOrUpdateErr(this, `Enter a Valid name`)
        //         }else {
        //             removeErr(this);
        //         }
        //         this.value = this.value.replace(/[^a-zA-Z]/g, "");
        // })

        expiryDate.addEventListener("input", function () {
            // Remove all spaces first
            let val = this.value.replace(/\D/g, '');
            if (val.length >= 3) {
                val = val.slice(0, 2) + "/" + val.slice(2, 4);
            }
            this.value = val;

            return expDateValidate(this);

        });

        expiryDate.addEventListener("blur", function(){
            expDateValidate(this);
            if(this.value.length < 5) {
                showOrUpdateErr(this, `Enter a proper month and year`)
            }
        })

        const addressCheck = document.querySelector("#address-check");
        addressCheck.addEventListener("change", function(){
            if(this.checked){
                billFirstNameField.value = firstNameField.value;
                billLastNameField.value = lastNameField.value;
                billEmailField.value = emailField.value;
                billPhoneField.value = phoneField.value;
                billAddress1Field.value = address1Field.value;
                billAddress2Field.value = address2Field.value;
                billCityField.value = cityField.value;
                billStateField.value = stateField.value;
                billZipField.value = zipField.value;

                if(billFirstNameField.value !== "") removeErr(billFirstNameField);
                if(billLastNameField.value !== "") removeErr(billLastNameField);
                if(billEmailField.value !== "") removeErr(billEmailField);
                if(billPhoneField.value !== "") removeErr(billPhoneField);
                if(billAddress1Field.value !== "") removeErr(billAddress1Field);
                if(billAddress2Field.value !== "") removeErr(billAddress2Field);
                if(billCityField.value !== "") removeErr(billCityField);
                if(billStateField.value !== "") removeErr(billStateField);
                if(billZipField.value !== "") removeErr(billZipField);
            } else {
                billFirstNameField.value = "";
                billLastNameField.value = "";
                billEmailField.value = "";
                billPhoneField.value = "";
                billAddress1Field.value = "";
                billAddress2Field.value = "";
                billCityField.value = "";
                billStateField.value = "";
                billZipField.value = "";
            }
        })
        
    }

    if(document.querySelector(".order-detail")){
        const allCartItem = JSON.parse(localStorage.getItem("addToCart"));
        const curData = JSON.parse(sessionStorage.getItem("buy-product"));
        const price = priceCal();
        let curdataPrice;
        let curDataShipping;
        let curdataTotal;
        if(curData){
            curdataPrice = curData.quantity * curData.price;
            curDataShipping = curdataPrice > 2000 ? "Free" : `$500`;
            curdataTotal = curdataPrice > 2000 ? curdataPrice : curdataPrice + 500;
        }
  
        const orderDetailHtml = `
            <ul class="list-unstyled mt-3 mt-md-4">
                ${
                curData ?
                    `<li class="row align-items-center border-bottom pb-3 mb-3 gx-0">
                        <div class="mb-3 mb-sm-0 me-sm-3 col-sm-4 col-lg-6 col-xl-5">
                            <figure class="position-relative overflow-hidden">
                                <img src='${curData.image[0]}' alt="${curData.name}" class="position-absolute top-50 start-50 translate-middle w-100 h-100"/>
                            </figure>
                        </div>
                        <div class="col-sm-7 col-lg-5 col-xl-6 small">
                            <h5 class="mb-0">${curData.name}</h5>
                            <p>Qty: ${curData.quantity}</p>
                            <p>Amount: $${curdataPrice}</p>
                            <p>Shipping Charge: ${curDataShipping}</p>
                        </div>
                    </li>`
                :
                allCartItem?.map(item => 
                     `<li class="row align-items-center pb-3 mb-3 border-bottom gx-0">
                        <div class="mb-3 mb-sm-0 me-sm-3 col-sm-4 col-lg-6 col-xl-5">
                            <figure class="position-relative overflow-hidden">
                                <img src='${item.image[0]}' alt="${item.name}" class="position-absolute top-50 start-50 translate-middle w-100 h-100"/>
                            </figure>
                        </div>
                        <div class="col-sm-7 col-lg-5 col-xl-6 small">
                            <h5 class="mb-0">${item.name}</h5>
                            <p>Qty: ${item.quantity}</p>
                            <p>Amount: $${item.quantity * item.price}</p>
                        </div>
                     </li>`
                ).join("")}
            </ul>
            ${curData ? '' : `<ul class="list-unstyled mb-3 pb-3 border-bottom">
                <li class="d-flex align-items-center justify-content-between mb-2">
                    <strong>Subtotal</strong>
                    <span class="subtotal">$${price.subtotal}</span>
                </li>
                <li class="d-flex align-items-center justify-content-between mb-2">
                    <strong>Shipping Charge</strong>
                    <span class="shipping">${price.shipping}</span>
                </li>
                <li class="d-flex align-items-center justify-content-between mb-2">
                    <strong>Sales Tax <span class="fw-normal small">(5%)</span></strong>
                    <span class="tax">$${price.tax}</span>
                </li>
                <li class="d-flex align-items-center justify-content-between text-danger">
                    <strong>Discount</strong>
                    <span class="discountAmount">$${price.discount}</span>
                </li>
            </ul>`}
            <ul class="list-unstyled">
                <li class="d-flex align-items-center justify-content-between mb-2">
                    <strong>Total Amount</strong>
                    <span class="total">$${curData ? curdataTotal : price.total}</span>
                </li>
            </ul>
            
        `
        document.querySelector(".order-detail").insertAdjacentHTML("beforeend", orderDetailHtml);

        const addNote = function(){
             if(curData){
                if(curdataPrice < 2000 && !document.querySelector(".order-detail").querySelector(".note")){
                    document.querySelector(".order-detail").insertAdjacentHTML("beforeend", "<div class='p-1 rounded note small text-center'>Add plants worth $2000 or more to enjoy Free Shipping!</div>")
                };
             } else{
                if(price.subtotal < 2000 && !document.querySelector(".order-detail").querySelector(".note")){
                    document.querySelector(".order-detail").insertAdjacentHTML("beforeend", "<div class='p-1 rounded note small text-center'>Just reach $2000 in Subtotal and your shipping is on us!</div>")
                };
            }
        }
        // addNote();
        if(window.location.href.split("/").pop() !== "order-confirmed.html"){
            addNote();
        }
    }
    
}

export default checkout;