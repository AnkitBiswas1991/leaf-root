export function loader(parentEl){
    const loader = `
        <div class="position-absolute loader-wrapper top-0 bottom-0 start-0 end-0">
            <div class="loader position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
                <figure>
                    <img src="../images/loader-img.png" alt="loader">
                </figure>
            </div>
        </div>
    `
    document.querySelector(parentEl).insertAdjacentHTML("afterbegin", loader)
}

export function removeloader(){
    if(document.querySelector(".loader-wrapper")){
        document.querySelector(".loader-wrapper").remove();
    }
}