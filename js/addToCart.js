import getProd from "./common.js";
import cartItem from "./cartItem.js";

const addToCart = async function(id){
    try{
        const plants = await getProd();
        const getPlant = plants.flatMap(el => el.plants);
        const plantAdded = getPlant.find(eachPlant => eachPlant.id == id);

        const plantData = JSON.parse(localStorage.getItem("addToCart")) || [];
        const existingCartPlant = plantData.find(plant => plant.id === plantAdded.id);

        const qtyNum = parseInt(document.querySelector("#qty-input").value);
        
        if(existingCartPlant){
            existingCartPlant.quantity = existingCartPlant.quantity + qtyNum;
        } else {
            plantData.push({...plantAdded, quantity: qtyNum})
        }

        // for(let i = 0; i < qtyNum; i++){
        //     plantData.push(plantAdded);
        // }
        localStorage.setItem("addToCart", JSON.stringify(plantData));

        cartItem();
    }catch(err){
        console.error(`Error Message: ${err.message}`);
    }
}

export default addToCart;