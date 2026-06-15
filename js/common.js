import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { plantData } from "./plant.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAXj6DsHOEzpx903oBjEeeFCvmHiD7ongk",
    authDomain: "leaf-root-6b43b.firebaseapp.com",
    projectId: "leaf-root-6b43b",
    storageBucket: "leaf-root-6b43b.firebasestorage.app",
    messagingSenderId: "378640352621",
    appId: "1:378640352621:web:973d8199755a118e23c664",
    measurementId: "G-C0RY56D713"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const getProd = function(){
        
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