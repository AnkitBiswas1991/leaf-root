
import getProd from "./common.js";
import removeSession from "./removeSession.js";
import {loader, removeloader} from "./loader.js";

const productListing = function(){
    const productList = document.querySelector('#product-listing .container');
    if(productList){
        const productBlock = function(allPlants){
            let catArr = [];
            allPlants.forEach(plant => {
                const cat = plant.category;
                plant.plants.forEach(plant => plant.cat = cat);
            });

            const plants = allPlants.flatMap(el => el.plants);

            const applyFilter = function(){
                let filteredplant = [...plants];
                 
                if(catArr.length > 0)
                    filteredplant = filteredplant.filter(plant => catArr.includes(plant.cat))

                const instock = document.querySelector(".stock-check input[type='checkbox']");
                
                if(instock.checked)
                    filteredplant = filteredplant.filter(plant => plant.qty);
                

                document.querySelector("#product-listing .row.gx-3").innerHTML = filteredplant.map(plant => eactPlantBlock(plant)).join("");
                    
            }

            const catFilter = function(){
                const filterCat = document.querySelectorAll(".cat-check input[type='checkbox']");
                filterCat.forEach(cat => {
                    cat.addEventListener("change", function(){
                        if(this.checked) {
                            if(!catArr.includes(this.id)){
                                catArr.push(this.id);
                            }
                            console.log(catArr)
                        } else {
                            const removedItem = catArr.indexOf(this.id);
                            catArr.splice(removedItem, 1);
                            console.log(catArr)
                        }
                        applyFilter();
                    })
                });
            };

            const stockFilter = function(){
                instock.addEventListener("change", function(){
                    applyFilter();
                })
            };

            

            requestAnimationFrame(() => {
                catFilter();
                stockFilter();
            })

            const eactPlantBlock = function(plant){
                const rating = new Array(plant.rating);
                const totalRate = [...rating].map(el => "<i class='fa-solid fa-star'></i>").join("");

                return  `<div class="col-12 col-sm-6 col-xl-4 ">
                            <div class="plant-block mb-3 overflow-hidden rounded">
                                <a class="d-block text-decoration-none" href="plant-details.html?id=${plant.id}">
                                    <figure class="position-relative overflow-hidden border-1">
                                        <span class="position-absolute top-0 start-100 stock-sec small w-100 text-center text-white ${plant.qty ? "in-stock" : ""}">
                                            ${plant.qty ? `In Stock` : `Out of Stock`}
                                        </span>
                                        <div class="category position-absolute lh-1 text-white p-1 rounded-1">${plant.cat}</div>
                                        <img class="position-absolute top-0 start-0 w-100 h-100" src="${plant.image[0]}" alt="${plant.name}"/>
                                    </figure>
                                    <div class="plant-content p-2 p-md-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <h4 class="mb-0">${plant.name}</h4>
                                            <p>$${plant.price}</p>
                                        </div>
                                        <div class="rating-sec position-relative small">
                                            <div class="placeholder-rating small gap-2 flex align-items-center lh-1"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                                            <div class="flex gap-2 small align-items-center text-warning position-absolute top-0 start-0 lh-1">${totalRate}</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>`
            }

            const plantListHtml = `
                <div class="row">
                    <div class="col-lg-3 col-xl-2">
                        <div class="filter-sec">
                            <div id="filter-head" class="mb-2 pb-2 border-bottom border-dark d-flex align-items-center justify-content-between"><h3 class="mb-0">Filter</h3><i class="fa-solid fa-chevron-down d-block d-lg-none"></i></div>
                            <div class="filter-section">
                                <div class="mb-2 pb-2 border-bottom cat-check">
                                    <strong class="mb-2 d-block">Filter by Category</strong>
                                    <ul class="list-unstyled d-flex flex-row flex-lg-column flex-wrap gap-2 gap-md-3 gap-lg-1">
                                        ${allPlants.map(plant => `<li class="form-check cursor-pointer">
                                                <input type="checkbox" class="form-check-input cursor-pointer" id="${plant.category}">
                                                <label class="form-check-label cursor-pointer" for="${plant.category}">${plant.category}</label>
                                            </li>`).join("")}
                                    </ul>
                                </div>
                                <div class="mb-2 pb-2 stock-check">
                                        <strong class="mb-2 d-block">Exclude Out of Stock</strong>
                                        <div class="form-check cursor-pointer">
                                            <input type="checkbox" class="form-check-input cursor-pointer" id="instock">
                                            <label class="form-check-label cursor-pointer" for="instock">In Stock</label>
                                        </div>
                                </div>
                             </div>
                        </div>
                    </div>
                    <div class="col-lg-9 col-xl-10 mt-2 mt-lg-0">
                        <div class="row gx-3">
                                ${plants.map(plant => eactPlantBlock(plant)).join("")}
                        </div>
                    </div>
                </div>
            `;
            
            productList.insertAdjacentHTML("beforeend", plantListHtml);

            const filter_sec = document.querySelector(".filter-section");
            const filter_head = document.querySelector("#filter-head");
            const filterToggle = function(){
                if(window.getComputedStyle(filter_sec).display === "none"){
                    filter_sec.style.display = "block";
                } else{
                    filter_sec.style.display = "none";
                }
            }

            if(window.innerWidth < 992){
                filter_sec.style.display = "none";
                filter_head.addEventListener("click", filterToggle);
            } else {
                filter_sec.style.display = "block";
                filter_head.removeEventListener("click", filterToggle);
            }
            
            window.addEventListener("resize", function(){
                if(window.innerWidth < 992){
                    filter_sec.style.display = "none";
                    filter_head.addEventListener("click", filterToggle);
                } else {
                    filter_sec.style.display = "block";
                    filter_head.removeEventListener("click", filterToggle);
                }
            })
        };

        // window.addEventListener("resize", function(){
        //     if(window.innerWidth < 1200){
        //         console.log("1200")
        //     }
        // })
       
        // loader("main");
        (async function(){
            try{
                loader("main");
                const prod = await getProd();
                productBlock(prod);
            }catch(err){
                console.error(`Error Message: ${err.message}`)
            }finally{
                removeloader();
            }
        })()
        // getProd();
        removeSession()
    }
}

export default productListing;