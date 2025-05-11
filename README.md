Welcome to Cookbook! Cookbook is made to provide a resource for easy recipes and meal lookup. Users can easily search ingredients, keywords, or use the category filters to find recipes for them to try. 
Link to Project:

Languages Used: Python, Django Web Framework, Javascript, HTML, CSS

Public APIs: 
https://www.themealdb.com/api.php
https://spoonacular.com/food-api/

Home Page: 

Whether the user is or is not logged in, they can peruse the recipe database at their leisure. The home page greets the visitor with the option to search for meals, filter by the categories shown, or scroll to browse. For the code, I pulled from two different recipe APIs- Spoonacular API and MealDB API. I began with Spoonacular but soon discovered that there is a maximum of 10 items shown in every resulting array, and was unable to find a straightforward route to display a list of recipes on the homepage. Thus, MealDB provided the solution. Although MealDB also did not have a route that allowed for the display of all recipes in the database, I was able to use the API route to list recipes by alphabet order. For simplicity for the sake of the project, I only loaded recipes from letters A and B, which is why all the recipes are currently only beginning with A or B, but I will be considering continuing to add more in the future and observing the effect of adding more recipes on the subsequent load times. 

About the Design:

From a design standpoint, I wanted to the website to be enticing and fun, giving a sense of warmth and safety. To achieve this, I leaned towards warm beiges and browns, rounded corners, and subtle shadows, along with the fun pixel at background for more character. I'd wanted to add more pixel food elements and icons as well throughout, but found it a bit difficult to integrate into elements consistently. For future development, I may consider using pixel art images as the filter buttons, similarly to the style of Airbnb's homepage filters. 

The recipe divs are laid out in a grid, allowing users to view more information about the recipe simply by clicking the div. This grid-style layout adds to the playfulness of the website while making browsing fast and easy. 

Create / My Recipes:

To integrate more user functionality, I added the option to add their own recipe to their account using Django models and forms. Keeping the same design tone as previously stated, the create page allows for easy addition to the user's recipe book, which is accessed in the My Recipes tab of the navbar. Each recipe created by the user is also directed to its own recipe page once clicked on, displaying its full list of instructions, ingredients, and more. 

Unlike the homepage's recipe divs, these divs do not change internally to  show more information, but instead redirect the user to a completely different page. This was a result of a compromise following issues arising when attempting to alter the div's innerHTML. I'd assumed there would not be much difficulty in switching back and forth between the model Recipes and the public API recipes, but there was difficulty in going between Python and Javascript, as some of the attributes accessed in the JS functions were in the public APIs, but not in the model.

Additionally, I'd wanted to challenge myself and experiment a bit with going between Python urls and using Javascript to edit a single page, especially as I had noticed in previous projects the lag time for loading the website when I accomplished all front-end changes in Javascript only. Because of this, I came across some errors when going between views.py to script.js and back to the HTML page. While progress was being made in debugging the issues, time unfortunately did not permit for further exploration, and a compromise had to be made.


Surprise Me!

The Surpise Me page retrieves a random recipe from the Spoonacular API recipe database and displays it to the user. This page can be accessed even when a user is not logged in with an account. 

The code uses a basic fetch request to obtain and display a random recipe. As the code was originally created assuming the user was navigating to the page from index.html, the code begins with setting the current displays of HTML elements to none and accessing the innerHTML of the div "random-recipe." However, as testing continued, the user was unable to navigate to the surprise me page from other webpages such as recipes.html or create.html due to the modified HTML elements not being present. While it could have been made so that the Surprise Me button was only visible on the home page, I wanted to keep it in the global navbar, and so had to make modifications to the Javascript in order to check what HTML elements were present on the page, as well as add the necessary divs to all the html scripts.
