import getProd from "./common.js";
import {loader, removeloader} from "./loader.js";

const index = function(){
    const bannerSliders = document.querySelectorAll('.banner-slider .slider');
    const sliderWrapper = document.querySelector(".banner-slider");
    const sliderNum = document.querySelectorAll('.banner-slider .slider').length;

    if(sliderWrapper){
        const slidedots = document.createElement('div');
        slidedots.classList.add("dots", "position-absolute", "start-50", "translate-middle-x", "d-flex", "gap-4");
        sliderWrapper.append(slidedots);

        const leftArror = document.createElement("div");
        leftArror.classList.add("slider-nav", "left-arrow", "position-absolute", "top-50", "translate-middle-y", "d-flex", "align-items-center", "justify-content-center", "cursor-pointer");
        leftArror.insertAdjacentHTML("afterbegin", "<i class='fa-solid fa-chevron-left'></i>");
        sliderWrapper.append(leftArror);

        const rightArror = document.createElement("div");
        rightArror.classList.add("slider-nav", "right-arrow", "position-absolute", "top-50", "translate-middle-y", "d-flex", "align-items-center", "justify-content-center", "cursor-pointer");
        rightArror.insertAdjacentHTML("afterbegin", "<i class='fa-solid fa-chevron-right'></i>");
        sliderWrapper.append(rightArror);

        bannerSliders.forEach((slider, i) => {
            slider.style.transform = `translateX(${(i * 100)}%)`;
            slider.style.zIndex = `${sliderNum - i}`;
            const dot = document.createElement('div');
            dot.classList.add("dot", "cursor-pointer");
            slidedots.append(dot);
        })

        const eachDot = document.querySelectorAll(".dots .dot");
        let curSlide = 0;
        const gotoSlide = function(index){
            bannerSliders.forEach((slider, i) => {
                slider.style.transform = `translate(${(i - index)*100}%)`;
            })
            curSlide = index;

            eachDot.forEach((dot, i) => {
                i === curSlide ? dot.classList.add("dot-active") : dot.classList.remove("dot-active");
            })
        }
        
        gotoSlide(0);

        eachDot.forEach((dot, i) => {
            dot.addEventListener("click", function(){
                gotoSlide(i);
            })
        })

        rightArror.addEventListener("click", function(){
            gotoSlide((curSlide + 1) % sliderNum);
        })

        leftArror.addEventListener("click", function(){
            gotoSlide((curSlide - 1 + sliderNum) % sliderNum);
        })

        setInterval(() => {
            gotoSlide((curSlide + 1) % sliderNum)
        }, 3000);
    }

    const tabWrapper = document.querySelector(".tab-wrapper");
    if(tabWrapper){
        const tab = function(res){
            const tabHtml = `
            <div class="tab_heads d-md-flex gap-2">
                ${res.map((plants, i) => `<div class="tab-head cursor-pointer text-center px-2 py-1 px-lg-3 py-lg-2 rounded-top border border-bottom-0" data-tab-head=${i + 1}>${plants.category}</div>`).join("")}
            </div>
            <div class="tab-body">
                ${res.map((plants, i) => `
                    <div class="tab p-3 border rounded-bottom" data-tab-body=${i + 1}>
                        <div class="row gx-3">
                            ${plants.plants.slice(0, 3).map(eachPlant => `
                                <div class="col-12 col-sm-6 col-xl-4">
                                    <div class="plant-block overflow-hidden rounded mb-3 mb-xl-4">
                                        <a class="d-block text-decoration-none" href="plant-details.html?id=${eachPlant.id}">
                                            <figure class="position-relative overflow-hidden border-1">
                                                <img class="position-absolute top-0 start-0 w-100 h-100" src="${eachPlant.image[0]}" alt="${eachPlant.name}"/>
                                            </figure>
                                            <div class="plant-content p-2 p-md-3">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <h4 class="mb-0">${eachPlant.name}</h4>
                                                    <p>$${eachPlant.price}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>`
                            ).join("")}
                        </div>
                        <div class="text-center">
                            <a class="btn text-white" href="plant-listing.html">See All Our Plants</a>
                        </div>
                    </div>`
                ).join("")}
            </div>`;

            const accordianHtml = `
                <div class="accordian">
                    ${res.map((plants, i) => `
                    <div class="accordian-wrapper">
                        <div class="accordian-head cursor-pointer px-3 py-2 border d-flex align-items-center justify-content-between" data-acc-head=${i + 1}>${plants.category} <i class="fa-solid fa-chevron-down"></i></div>
                        <div class="accordian-body border-start border-end p-3" data-acc-body=${i + 1}>
                            <div class="row gx-3">
                                ${plants.plants.slice(0, 3).map(eachPlant => `
                                    <div class="col-12 col-sm-6 col-xl-4">
                                        <div class="plant-block overflow-hidden mb-3">
                                            <a class="d-block text-decoration-none" href="plant-details.html?id=${eachPlant.id}">
                                                <figure class="position-relative overflow-hidden border-1">
                                                    <img class="position-absolute top-0 start-0 w-100 h-100" src="${eachPlant.image[0]}" alt="${eachPlant.name}"/>
                                                </figure>
                                                <div class="plant-content p-2 p-md-3">
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        <h4 class="mb-0">${eachPlant.name}</h4>
                                                        <p>$${eachPlant.price}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>`
                                ).join("")}
                            </div>
                        </div>
                    </div>
                    `).join("")}</div>`;

            if(window.innerWidth > 767){
                tabWrapper.insertAdjacentHTML("beforeend", tabHtml);
            } else {
                tabWrapper.insertAdjacentHTML("beforeend", accordianHtml);
            }
        }


        const tabFn = function(){
            document.querySelectorAll(".tab-body .tab").forEach(tab => {
                if(tab.dataset.tabBody !== "1")
                    tab.style.display = "none";

            });
            document.querySelectorAll(".tab_heads .tab-head").forEach(tabHead => {
                if(tabHead.dataset.tabHead === "1"){tabHead.classList.add("tab-active")};

                tabHead.addEventListener("click", function(){
                    this.closest(".tab_heads").querySelectorAll(".tab-head").forEach(tabhead => {
                        tabhead.classList.remove("tab-active");
                    })

                    this.classList.add("tab-active")
                    const showTabContent = this.dataset.tabHead;
                    document.querySelectorAll(".tab-body .tab").forEach(tab => {
                        tab.style.display = "none";
                        if(tab.dataset.tabBody === showTabContent){
                            tab.style.display = "block";
                        }
                    })
                })
            })
        }
        
        const accordianFn = function(){
            const accbodySec = document.querySelectorAll(".accordian-body");
            const accheadSec = document.querySelectorAll(".accordian-head");
            const accwrapper = document.querySelectorAll(".accordian-wrapper");
            accbodySec.forEach(accbody => {
                if(accbody.dataset.accBody !== "1"){
                    accbody.style.display = "none";
                    
                } else {
                    accbody.closest(".accordian-wrapper").classList.add("acc-active");
                    accbody.closest(".accordian-wrapper").querySelector(".accordian-head").classList.add("rounded-top")
                }
            });
            accheadSec.forEach(accHead => {
                accHead.addEventListener("click", function(){
                    const wrapper = this.closest(".accordian-wrapper");
                    const isActive = wrapper.classList.contains("acc-active");

                    accwrapper.forEach(acc => acc.classList.remove("acc-active"));
                    accbodySec.forEach(accbody => accbody.style.display = "none");
                    
                    if(!isActive){
                        // console.log(this.closest(".accordian-wrapper").classList)
                        wrapper.classList.add("acc-active");

                        accbodySec.forEach(accbody => {
                            if(accbody.dataset.accBody === this.dataset.accHead){
                                accbody.style.display= "block";
                            }})
                        }
                    
                    // this.closest(".accordian-wrapper").classList.add("acc-active");
                })
            })
        }

        const allPlants = async function() {
            try{
                loader(".tab-wrapper");
                const res = await getProd();
                tab(res);
                if(window.innerWidth > 767){
                    tabFn();
                }else{
                    accordianFn();
                }
            } catch(err){
                console.error(`Error Message: ${err}`);
            } finally{
                removeloader();
            }
        };
        allPlants();
    }

 
    

    const counterSec = document.querySelector(".counter-sec");

    if(counterSec){
        const counterFn = function(entries){
            const [entry] = entries;
            console.log(entry);
            if(entry.isIntersecting){
                document.querySelectorAll(".counter-wrapper").forEach(countWrap => {
                    const counter = countWrap.querySelector(".counter-num");
                    const finalNum = +counter.textContent;
                    let currentNum = 0;

                    counter.textContent = 0;

                setInterval(() => {
                        if(currentNum < finalNum){
                            currentNum += 1;
                            counter.textContent = currentNum;
                        }
                    }, 0.1);
                    
                })
                counterIntersect.unobserve(entry.target); 
            }
        }

        const counterObj = {
            root: null,
            threshold: 0.5,
        };
        const counterIntersect = new IntersectionObserver(counterFn, counterObj)
        counterIntersect.observe(counterSec);
    }
}

export default index;
