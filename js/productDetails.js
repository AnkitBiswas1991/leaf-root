import getProd from "./common.js";
import addToCart from "./addToCart.js";
import removeSession from "./removeSession.js";
import {loader, removeloader} from "./loader.js";

const productDetails = function(){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url)
    const urlId = urlParams.get("id");
    // console.log(urlId);

    const productDetail = document.querySelector("#product-details .container");

    if(productDetail){
        const showPlant = function(plantname, plantDes, inStock, price, images, qty, rating){
            const ratingArr = new Array(rating);// new Array(rating).fill(0) can be used instead of destructuring as it doesnot keep the array empty
            const totalRating = [...ratingArr].map(star => "<i class='fa-solid fa-star'></i>").join("");
            const plantDetailHtml = `
                <div class="row">
                    <div class="col-md-6">
                        <div class="prod-slide ${qty ? "" : "out-of-stock"}">
                            <div class="prod-main position-relative overflow-hidden mb-3 rounded">
                            ${qty ? `` : `<span class="bg-white py-2 shadow-sm position-absolute stock-label top-50 translate-middle-y w-100 text-danger text-center">Out of Stock</span>`}
                                ${images.map(
                                    (img, i) => `<figure class="mb-0 position-absolute top-0 start-0 w-100 h-100" style="transform:translateX(${i * 100}%)"><img class="position-absolute w-100 h-100 top-50 start-50 translate-middle" src="${img}" alt="${plantname}"/></figure>`).join("")}
                            </div>
                            <div class="prod-thumb d-flex gap-2 gap-lg-3 justify-content-center">
                                 ${images.map(
                                    (img, i) => `<figure class="mb-0 position-relative cursor-pointer overflow-hidden rounded"><img class="position-absolute w-100 h-100 top-50 start-50 translate-middle" src="${img}" alt="${plantname}"/></figure>`).join("")}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="prod-detail mt-3 mt-sm-4 mt-md-0">
                            <h1 class="mb-2 mb-lg-3">${plantname}</h1>
                            <div class="d-flex align-items-center gap-2 price-sec mb-2 mb-md-3 mb-lg-4"><h5 class="mb-0">Price:</h5> <span class="fs-5">$${price}</span></div>
                            <div class="d-flex align-items-center gap-2 rating mb-2 mb-md-3 mb-lg-4">
                                <h5 class="mb-0">Rating:</h5>
                                <div class="rating-sec position-relative">
                                    <div class="placeholder-rating gap-2 flex align-items-center lh-1"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                                    <div class="flex gap-2 align-items-center text-warning position-absolute top-0 start-0 lh-1">
                                        ${totalRating}
                                    </div>
                                </div>
                            </div>
                            <div class="qty_sec mb-2 mb-md-3">
                                <h5 class="mb-2">Quantity:</h5>
                                <div class="d-flex ${qty ? "" : "disabled"}">
                                    <span class="px-3 py-2 border cursor-pointer bg-white decrease">-</span>
                                    <input class="form-control text-center rounded-0 border-start-0 border-end-0" name="qty" id="qty-input" type="number" min="1" value="1" maxValue="20"/>
                                    <span class="px-3 py-2 border cursor-pointer bg-white increase">+</span>
                                </div>
                            </div>
                            <div class="d-grid d-sm-flex align-items-center gap-2">
                                <button class="btn text-white ${qty ? "" : "disabled"}" id="add-to-cart">Add To Cart</button>
                                <button class="btn text-white ${qty ? "" : "disabled"}" id="buy-now">${qty ? `Buy Now` : `Out of Stock`}</button>
                            </div>
                            ${qty ? "" : 
                            `<p class="text-danger small mt-2">This plant is out of stock now. It will be available soon</p>`}
                        </div>
                    </div>
                </div>
                <div class="plant_des mt-3 mt-lg-4 mt-xl-5">
                    <h4 class="mb-2">Description</h4>
                    <p>${plantDes} <span class="fs-5">🌱</span></p>
                </div>
                `
                
                productDetail.insertAdjacentHTML("afterbegin", plantDetailHtml);
                
                //Product Image Slider//
                const allMain = document.querySelectorAll(".prod-slide .prod-main figure");
                const mainArr = Array.from(allMain);
                // console.log(mainArr)
                const allThumb = document.querySelectorAll(".prod-slide .prod-thumb figure");
                const thumbArr = Array.from(allThumb);
                // console.log(thumbArr)

                let currentIndex;
                const gotoSlide = function(index){
                    mainArr.forEach((img, i) => img.style.transform = `translateX(${(i - index)*100}%)`)
                    currentIndex = index;
                }
                
                thumbArr[0].classList.add("active");

                thumbArr.map(img => img.addEventListener("click", function(){
                    const thumbIndex = thumbArr.indexOf(this);
                    gotoSlide(thumbIndex);
                    document.querySelectorAll(".prod-thumb figure").forEach(fig => fig.classList.remove("active"));
                    this.classList.add("active");
                }))
                //Product Image Slider End//

                //Quantity Sec//
                const qtySec = document.querySelector(".qty_sec");
                const qtyInput = qtySec.querySelector("input[type='number']");
                const createErr = function(errmsg){
                    if(!document.querySelector(".qty_sec .error")){
                        qtySec.insertAdjacentHTML("beforeend", "<div class='error small text-danger'></div>")
                    };
                    const hugeAmnt = `<p>${errmsg}</p>`;
                    document.querySelector(".qty_sec .error").innerHTML = hugeAmnt;
                }

                if(!qty){qtyInput.value = 0};

                qtyInput.addEventListener("change", function(){
                    if(qtyInput.value > qty){
                       createErr("We don't have this much amount in stock");
                    } else if (qtyInput.value < 1){
                        createErr("Minimum Order Quantity is 1");
                    } else {
                        if(document.querySelector(".qty_sec").querySelector(".error"))
                        document.querySelector(".qty_sec .error").remove();
                    }
                })
                qtySec.querySelector(".increase").addEventListener("click", function(){
                    let curVal = Number(qtyInput.value);
                    if(curVal < qty){
                        qtyInput.value = curVal + 1;
                    }
                    if(curVal === qty){
                        createErr("You have reached our maximum stock amount");
                        return;
                    }else {
                        if(document.querySelector(".qty_sec").querySelector(".error"))
                        document.querySelector(".qty_sec .error").remove();
                    }
                })
                qtySec.querySelector(".decrease").addEventListener("click", function(){
                    let curVal = Number(qtyInput.value);
                    if(curVal > 1){
                        qtyInput.value = curVal - 1;
                    }
                    if(curVal === 1){
                        createErr("Minimum Order Quantity is 1");
                        return;
                    }else {
                        if(document.querySelector(".qty_sec").querySelector(".error"))
                        document.querySelector(".qty_sec .error").remove();
                    }
                })
                //Quantity Sec End//
        };

        const getPlant = async function(){
            try{
                loader("main");
                const prod = await getProd();
                const getplants = prod.flatMap(el => el.plants)
                const plant = getplants.find(eachPlant => eachPlant.id === Number(urlId));
                showPlant(plant.name, plant.description, plant.inStock, plant.price, plant.image, plant.qty, plant.rating);

                const cartBtn = document.querySelector("#add-to-cart");
                const buynowBtn = document.querySelector("#buy-now");

                cartBtn.addEventListener("click", async function(){
                    await addToCart(urlId);
                });

                buynowBtn.addEventListener("click", async function(){
                    const qtyNum = parseInt(document.querySelector("#qty-input").value)
                    const buyProd = await {...plant, quantity: qtyNum};
                    sessionStorage.setItem("buy-product", JSON.stringify(buyProd));

                    await addToCart(urlId);
                    window.location.href="checkout.html";
                })
            }catch(err){
                console.error(`Error Message: ${err.message}`)
            }finally{
                removeloader();
            }
        };

        getPlant();
        removeSession();

    }
    
}

export default productDetails;