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

    document.querySelector('#filters').style.display="none";
    document.querySelector('#search-container').style.display="none";
    document.querySelector('#main-head').innerHTML="Bon Appetit!";
    document.querySelector('#recipe-header').innerHTML="";
    document.getElementById("recipe-list").innerHTML="";

    fetch("https://api.spoonacular.com/recipes/random?apiKey=02ba26bf19de45318b79c306fb550f93", {
        headers: myHeader
    })

    .then((response) => response.json())
    .then((data) => {

        const targetDiv = document.getElementById("random-recipe");
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
        
            <p>Ready in: ${data.readyInMinutes} minutes</p>
            <p>Servings: ${data.servings}</p>
            <p>Ingredients:</p>
            <ul>${ingredientList}</ul> 

            <a href="${data.sourceUrl}" target="_blank">View Full Recipe</a>
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
        // const ingredientList = [];

        // for (let i=0; i<data.extendedIngredients.length; i++){
        //     const ingredient = data.extendedIngredients[i].original;
        //     ingredientList.push(ingredient);
        // }

        recipeDiv.innerHTML = `
            <h2>${recipe.strMeal}</h2>

            // <p>Ingredients:</p>

            <a href="${recipe.strYoutube}" target="_blank">View Full Recipe</a>
        `;
    })
}

//Show recipe details from user-created recipes (from models, not from public API)
function showDetails(recipeId){
    
    // myrecipeDiv.addEventListener("click", showDetails(recipeId));

    console.log('clicked', recipeId);

    fetch(`/my_recipes/${recipeId}`)
    .then((response) => (response.json()))
    .then((recipe) => {
        let isclicked = recipe.isClicked;
        const myrecipeDiv = document.getElementById(`myrecipeDiv-${recipeId}`);

    
        if (isclicked===false){

            console.log('if', recipe.isClicked);
            recipe.isClicked=true;

            myrecipeDiv.innerHTML = `
            <a onclick="showDetails('${recipe.id}');">
                    <h2>${recipe.title}</h2>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <p>Ingredients:</p>
                    <ul>${recipe.ingredients}</ul> 
                </a>
            `;
            console.log('end if', recipe.isClicked);
            console.log(recipe);

        } else if (isclicked===true) {
            console.log('else');
            recipe.isClicked=false;

            myrecipeDiv.innerHTML = `
                <a onclick="showDetails('${recipe.id}');">
                    <h2>${recipe.title}</h2>
                    <img src="${recipe.image}" alt="${recipe.title}">
                </a>
            `;

        }
    });
    // });
}

function filterBy(category){
    const recipe_list= document.getElementById('recipe-list');
  //  const categoryButton = document.querySelector(`.categoryFilter`)
    
    console.log(category);
    
    recipe_list.innerHTML="";

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