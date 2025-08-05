const removeSession = function(){
    const orderPlaced = sessionStorage.getItem("order-placed");
    if(!orderPlaced){
        sessionStorage.removeItem("buy-product");
        sessionStorage.removeItem("discount-amount");
    }
    sessionStorage.removeItem("order-placed");
    sessionStorage.removeItem("buy-product");
    sessionStorage.removeItem("discount-amount");
}

export default removeSession;