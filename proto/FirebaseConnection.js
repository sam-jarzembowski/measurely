// 1. IMPORT (Using full URLs)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 2. CONFIG (Paste your specific config here)
const firebaseConfig = {
    apiKey: "AIzaSyC-Rm6at6ir7lRGx2ZpJvHYDtB_Y6JWME0",
    authDomain: "measurely-ctd-capstone.firebaseapp.com",
    databaseURL: "https://measurely-ctd-capstone-default-rtdb.firebaseio.com",
    projectId: "measurely-ctd-capstone",
    storageBucket: "measurely-ctd-capstone.firebasestorage.app",
    messagingSenderId: "130241754874",
    appId: "1:130241754874:web:e201593781a7212e75fb43",
    measurementId: "G-LJ2HBQ144K"
};


// 3. INITIALIZE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. READ FUNCTION
async function checkConnection() {
    const display = document.getElementById('status-display');
    
    try {
        // Look for the document we created in the previous step
        const docRef = doc(db, "testCollection", "testDoc");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            display.innerText = "Success! Firebase says: " + data.status;
            display.style.color = "green";
        } else {
            display.innerText = "Connected, but no document found. Did you run the 'Write' test first?";
        }
    } catch (error) {
        console.error("Connection failed:", error);
        display.innerText = "Error: Check console for details.";
        display.style.color = "red";
    }
}

checkConnection();

// Pull Test Recipe Titles
async function fetchTestRecipes() {
    const dataDisplay = document.getElementById('data-display');
    const recipeNameDisplay = document.getElementById('recipeName');
    const numServingsDisplay = document.getElementById('numServings');
    const numStepsDisplay = document.getElementById('numSteps');
    const numIngredientsDisplay = document.getElementById('numIngredients');

    try {
        const recipesRef = doc(db, "testCollection", "testRecipes");
        const recipesSnap = await getDoc(recipesRef);

        if (recipesSnap.exists()) {
            const recipesData = recipesSnap.data();
            dataDisplay.innerText = recipesData.title;
            // dataDisplay.innerText = "Raw Data: " + JSON.stringify(recipesData);
            // const titles = recipesData.recipes.map(recipe => recipe.title).join(", ");
            // dataDisplay.innerText = "Test Recipe Titles: " + titles;
        } else {
            dataDisplay.innerText = "No test recipes found.";
        }

        const statsRef = doc(db, "testCollection", "testRecipes", "THCCCookies", "THCCCookies");
        const statsSnap = await getDoc(statsRef);   
        if (statsSnap.exists()) {   
            const statsData = statsSnap.data();
            console.log("THCCookies Data:", statsData);
            recipeNameDisplay.innerText = "Recipe Name: " + statsData.name;
            numServingsDisplay.innerText = "Number of Servings: " + statsData.servings;
            numStepsDisplay.innerText = "Number of Steps: " + statsData.numSteps;
            numIngredientsDisplay.innerText = "Number of Ingredients: " + statsData.numIngredients;
        }

    } catch (error) {
        console.error("Failed to fetch test recipes:", error);
        dataDisplay.innerText = "Error fetching test recipes. Check console for details.";
    }   
}   

fetchTestRecipes();