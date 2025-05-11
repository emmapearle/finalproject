document.addEventListener("DOMContentLoaded", function(){
    index();

})

const myHeader ={
    'Content-Type': 'application/json',
    'x-api-key': '02ba26bf19de45318b79c306fb550f93',
    
  };

function index(){
    const recipe_list = document.getElementById("recipe-list");
    recipe_list.innerHTML="";

    //Fetch recipes from MealDB public API, starting with letter A
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a", {
        method: "GET",
    })
    .then((response) => (response.json()))
    .then((data) => {

        document.getElementById('recipe-header').innerHTML=`Click on recipes to view more details`;

        //retrive array of recipes "meals" from data
        const recipes = data.meals;

        //Create div for each recipe and add to recipe_list div
        recipes.forEach((recipe) => {
            const recipeDiv = document.createElement("div");
            recipeDiv.id = `recipeDiv-${recipe.idMeal}`;
            recipeDiv.className ="recipeDiv";
            let isClicked = false;
            recipeDiv.innerHTML = `
                <h2>${recipe.strMeal}</h2>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            `;
            recipe_list.appendChild(recipeDiv);

            document.querySelector(`#recipeDiv-${recipe.idMeal}`).addEventListener("click", function(){
                if (!isClicked){
                    showMealDetails(recipe.idMeal);
                    isClicked = true;
                } else {
                    document.querySelector(`#recipeDiv-${recipe.idMeal}`).innerHTML=
                    `
                        <h2>${recipe.strMeal}</h2>
                        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                    `;
                    isClicked = false;

                }
            });

        })

        //Repeat fetch recipes from api starting witih letter B
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=b")
        .then((response) => (response.json()))
        .then((data) => {
            console.log(data);  
            const recipes = data.meals;

            recipes.forEach((recipe) => {
                const recipeDiv = document.createElement("div");
                recipeDiv.id = `recipeDiv-${recipe.idMeal}`;
                recipeDiv.className ="recipeDiv";
                let isClicked = false;
                
                recipeDiv.innerHTML = `
                    <h2>${recipe.strMeal}</h2>
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                `;
                recipe_list.appendChild(recipeDiv);

                document.querySelector(`#recipeDiv-${recipe.idMeal}`).addEventListener("click", function(){
                    if (!isClicked){
                        showMealDetails(recipe.idMeal);
                        isClicked = true;
                    } else {
                        document.querySelector(`#recipeDiv-${recipe.idMeal}`).innerHTML=
                        `
                            <h2>${recipe.strMeal}</h2>
                            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                        `;
                        isClicked = false;
    
                    }
                });
            });
        });
        
    });
} 


//Get random recipe from Spoonacular API
function getRandom(){

    //elements will vary depending on the page; check for elements and change their displays to none

    if(document.querySelector('#filters')){
        document.querySelector('#filters').style.display="none";
    }

    if (document.querySelector('#search-container')){
        document.querySelector('#search-container').style.display="none";
    }

    if (document.querySelector('#main-head')){
        document.querySelector('#main-head').innerHTML="Bon Appetit!";
    }
     
    if (document.querySelector('#recipe-header')){
        document.querySelector('#recipe-header').innerHTML="";
    }

    if (document.querySelector("#recipe-list")){
        document.querySelector("#recipe-list").innerHTML="";
    }

    if (document.querySelector('#create-form')){
        document.querySelector('#create-form').style.display="none";
    }

    if(document.querySelector('#view-recipe')){
        document.querySelector('#view-recipe').style.display="none";
    }

    if (document.querySelector('#myrecipe-title')){
        document.querySelector('#myrecipe-title').style.display="none";
    }

    if (document.getElementById('my-recipe-list')){
        document.getElementById('my-recipe-list').innerHTML="";
    }


    //fetch random recipe data from spoonacular API
    fetch("https://api.spoonacular.com/recipes/random?apiKey=02ba26bf19de45318b79c306fb550f93", {
        headers: myHeader
    })

    .then((response) => response.json())
    .then((data) => {

        const targetDiv = document.getElementById("random-recipe");
        targetDiv.style.display="block";
        targetDiv.innerHTML="";

        recipe = data.recipes[0];
        const ingredientList = [];
        const extendedIngredients = recipe.extendedIngredients;

        for (let i=0; i<extendedIngredients.length; i++){
            const ingredient = extendedIngredients[i].original;
            ingredientList.push(ingredient);
        }

        targetDiv.innerHTML=`
            
            <h3 style="text-align:center;">${recipe.title}</h3>
            <img style="border-radius:10vh;margin:3vh;" src=${recipe.image}>
            <p>Ready in: ${recipe.readyInMinutes} minutes</p>
            <p>Servings: ${recipe.servings}</p>
            <h5>Ingredients:</h5>
            <ul id="ingredient-ul"></ul>
            <h5>Instructions:</h5>
            <p>${recipe.instructions}</p>

        `;

        let ingredients = document.getElementById("ingredient-ul");
        ingredientList.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            ingredients.appendChild(li);
        })
    })

    .catch((error) => {
    console.error("Error fetching recipe:", error)
    });

}

//Search recipes from Spoonacular API
function searchRecipe(){
    const searchQuery = document.getElementById("search").value;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=02ba26bf19de45318b79c306fb550f93&addRecipeInstructions=true`;
    const recipe_list = document.getElementById("recipe-list");

    if (searchQuery===""){
        alert("Search field cannot be empty!");
    } else {

        fetch(url, {
            headers: myHeader
        })
        .then((response) => (response.json()))
        .then((data) => {
            console.log(data);

            if (data.results.length===0){
                recipe_list.innerHTML=`<h4>No results found for "${searchQuery}"</h4>`;
            } else {

                document.getElementById("recipe-header").innerHTML=`Showing Search Results for "${searchQuery}"`;
                recipe_list.innerHTML="";

                const recipes = data.results;

                recipes.forEach((recipe) => {
                    const recipeDiv = document.createElement("div");
                    recipeDiv.id = `recipeDiv-${recipe.id}`;
                    recipeDiv.className ="recipeDiv";
                    let isClicked = false;
                    recipeDiv.innerHTML = `
                        <h2>${recipe.title}</h2>
                        <img src="${recipe.image}" alt="${recipe.title}">
                    `;
                    recipe_list.appendChild(recipeDiv);

                    document.querySelector(`#recipeDiv-${recipe.id}`).addEventListener("click", function(){
                        if (!isClicked){
                            showRecipeDetails(recipe.id);
                            isClicked = true;
                        } else {
                            document.querySelector(`#recipeDiv-${recipe.id}`).innerHTML=
                            `
                                <h2>${recipe.title}</h2>
                                <img src="${recipe.image}" alt="${recipe.title}">
                            `;
                            isClicked = false;

                        }
                    })
                })

            }
        });
    }
}

//Show recipe details from Spoonacular API recipes
function showRecipeDetails(recipeId){
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=02ba26bf19de45318b79c306fb550f93`,{
        headers:myHeader
    })
    .then((response) => (response.json()))
    .then((data) => {
        console.log(data);

        const recipeDiv = document.getElementById(`recipeDiv-${recipeId}`);
        const ingredientList = [];

        for (let i=0; i<data.extendedIngredients.length; i++){
            const ingredient = data.extendedIngredients[i].original;
            ingredientList.push(ingredient);
        }

        recipeDiv.innerHTML = `
            <h2>${data.title}</h2>
        
            <h5>Ready in: ${data.readyInMinutes} minutes</h5>
            <h5>Servings: ${data.servings}</h5>
            <h5>Ingredients:</h5>
            <p><ul>${ingredientList}</ul></p>

            <a href="${data.sourceUrl}" target="_blank">View Full Recipe</a>
            <a href="addtoFavorites(${data.id},${data.title})>Favorite</a>
        `;

    })
}

//show recipe details from MealDB API recipes
function showMealDetails(recipeId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((response) => (response.json()))
    .then((data) => {
        recipe = data.meals[0];

        const recipeDiv = document.getElementById(`recipeDiv-${recipeId}`);

        recipeDiv.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <h5>Category: ${recipe.strCategory}</h5>

            <h5>Instructions:</h5>
            <p>${recipe.strInstructions}</p>

            <a href="${recipe.strSource}" target="_blank">View Full Recipe</a>
        `;
    })
}

function filterBy(category){
    const recipe_list= document.getElementById('recipe-list');
        
    recipe_list.innerHTML="";
    document.querySelector('#recipe-header').innerHTML=`Showing ${category} Recipes`;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => (response.json()))
    .then((data) => {
       recipes = data.meals;
       console.log(recipes);

       recipes.forEach((recipe) => {
            const recipeDiv = document.createElement("div");

            recipeDiv.id = `recipeDiv-${recipe.idMeal}`;
            recipeDiv.className ="recipeDiv";
            let isClicked = false;

            recipeDiv.innerHTML = `
                <h2>${recipe.strMeal}</h2>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            `;
            
            recipe_list.appendChild(recipeDiv);

            document.querySelector(`#recipeDiv-${recipe.idMeal}`).addEventListener("click", function(){
                if (!isClicked){
                    showMealDetails(recipe.idMeal);
                    isClicked = true;
                } else {
                    document.querySelector(`#recipeDiv-${recipe.idMeal}`).innerHTML=
                    `
                        <h2>${recipe.strMeal}</h2>
                        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                    `;
                    isClicked = false;

                }
            });

        })

    });
}

//Search ingredients from Spoonacular API
function searchIngredients(){
    const searchQuery = document.getElementById("search-ing").value;
    const url =`https://api.spoonacular.com/food/ingredients/search?query=${searchQuery}&number=10&addChildren=true&apiKey=02ba26bf19de45318b79c306fb550f93`;
    const ing_list = document.getElementById("ing-list");

    if (searchQuery===""){
        alert("Search field cannot be empty!");
    } else {

        fetch(url, {
            headers: myHeader
        })
        .then((response) => (response.json()))
        .then((data) => {
            console.log(data);

            if (data.results.length===0){
                ing_list.innerHTML=`<h4>No results found for "${searchQuery}"</h4>`;
            } else {

                document.getElementById("add-pantry").innerHTML=`Showing Search Results for "${searchQuery}"`;
                ing_list.innerHTML="";

                const ingredients = data.results;
                console.log(ingredients);

                ingredients.forEach((ing) => {
                    const ingDiv = document.createElement("div");
                    ingDiv.id = `ingDiv-${ing.id}`;
                    ingDiv.className ="ingDiv";
                    let isClicked = false;
                    ingDiv.innerHTML = `
                        <h4>${ing.name}</h4> 
                    `;
                    ing_list.appendChild(ingDiv);
                    
                    document.querySelector(`#ingDiv-${ing.id}`).addEventListener("click", function(){


                        fetch(`add/${ing.id}`,{
                            method: "POST",
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(ing)
                        })
                        .then((response) => (response.json()))
                        .then((data) => {
                            console.log(body);
                            console.log(data);
                        });
                        // if (!inPantry){
                        //     //addtoPantry(ing.id);

                        //     fetch(`add_to_pantry/${ing.id}`)
                        //     .then((response) => (response.json()))
                        //     .then((data) => {
                        //         console.log(data);
                        //     });

                        // } else {
                        //     removefromPantry(ing.id);
                        // }
                    });
                });

           }
        });
    }
}


function addtoPantry(ingredientId){
    const ingDiv = document.getElementById(`ingDiv-${ingredientId}`);

    const pantryItem = {
        id: ingredientId,
        name: ingredientName,
        image: ingredientImage
    };

    fetch("/add_to_pantry", {
        method: "POST",
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(ingredientData)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.message);
    });
}