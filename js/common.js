import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { plantData } from "./plant.js";
  const firebaseConfig = {
    apiKey: "AIzaSyB2XZUYDffCEcBzsLdL2e4CV6Qz2l_zH8k",
    authDomain: "leaf-root-e9d10.firebaseapp.com",
    databaseURL: "https://leaf-root-e9d10-default-rtdb.firebaseio.com",
    projectId: "leaf-root-e9d10",
    storageBucket: "leaf-root-e9d10.firebasestorage.app",
    messagingSenderId: "721257593410",
    appId: "1:721257593410:web:e00f360c17fa72ed484bdb",
    measurementId: "G-H9GM9T46FH"
  };

  const getProd = function(){
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        // console.log(db);

        const plantArr = async function(){
            try{
                const getSnapshot = await getDocs(collection(db, 'categories'));
                
                const allData = [];
                getSnapshot.forEach(el => {
                   //console.log(el.data())
                    allData.push(el.data())
                });
                return allData;

            }catch(err){
                console.error(err.message)
            }
        };

        return plantArr();

        // document.getElementById("seedBtn").addEventListener("click", async () => {
        //     try {
        //         for (const category of plantData) {
        //         await addDoc(collection(db, "categories"), category);
        //         console.log(`✅ Added: ${category.category}`);
        //         }
        //         alert("🌱 Data added successfully!");
        //     } catch (err) {
        //         console.error("❌ Error:", err);
        //         alert("Failed to add data");
        //     }
        // });
    }
 
export default getProd;