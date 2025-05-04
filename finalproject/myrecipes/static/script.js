document.addEventListener("DOMContentLoaded", function(){

})

const myHeader ={
    'Content-Type': 'application/json',
    'x-api-key': '02ba26bf19de45318b79c306fb550f93',
    
  };

function getRandom(){

    fetch("https://api.spoonacular.com/recipes/random?apiKey=02ba26bf19de45318b79c306fb550f93", {
        headers: myHeader
    })

    .then((response) => response.json())
    .then((data) => {
        console.log(data)

        const targetDiv = document.getElementById("recipe-list");
        targetDiv.innerHTML="";

        recipe = data.recipes[0];
        const ingredientList = [];
        const extendedIngredients = recipe.extendedIngredients;

        for (let i=0; i<extendedIngredients.length; i++){
            const ingredient = extendedIngredients[i].original;
            ingredientList.push(ingredient);
        }

        targetDiv.innerHTML=`
            <h2>Bon Appetit!</h2>
            
            <h3>${recipe.title}</h3>
            <img src=${recipe.image}>
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

function searchRecipe(){
    const searchQuery = document.getElementById("search").value;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=02ba26bf19de45318b79c306fb550f93&addRecipeInstructions=true`;
    const recipe_list = document.getElementById("recipe-list");

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

