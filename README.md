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

Create:
To integrate more user functionality, I added the option to add their own recipe to their account using Django models and forms. Keeping the same design tone as previously stated, the create page allows for easy addition to the user's recipe book, accessed in the My Recipes tab of the navbar.

 a full write-up describing your project, what’s contained in each file you created, why you made certain design decisions, and any other additional information the staff should know about your project. This document should be sufficiently thorough for your teaching fellow to run your project without any need to contact you further with questions.
