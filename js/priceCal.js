const priceCal = function(){
    const allCartItem = JSON.parse(localStorage.getItem("addToCart"));

    let subtotal = allCartItem?.reduce((acc, item) => acc +  (item.price * item.quantity),0);

    const shippamnt = subtotal < 2000 && subtotal > 0 ? '$500.00' : 'Free Shipping';
    const taxAmount = (subtotal * 0.05).toFixed(2);
  
    let total = subtotal < 2000 && subtotal > 0 ? (+taxAmount + subtotal + +shippamnt.slice(1)).toFixed(2) : (+taxAmount + subtotal).toFixed(2);

    const discountAmnt = JSON.parse(sessionStorage.getItem("discount-amount"));
    if(discountAmnt){
        total = (+total - +discountAmnt).toFixed(2);
    }
    // console.log(subtotal.toFixed(2), total, shippamnt, taxAmount, discountAmnt);

    return {
        subtotal: subtotal?.toFixed(2),
        total: total,
        shipping: shippamnt,
        tax: taxAmount,
        discount: (+discountAmnt).toFixed(2),
    }
}

export default priceCal;