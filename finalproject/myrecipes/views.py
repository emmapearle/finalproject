import json
from django import forms
from django.forms import ModelForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import User, Recipe

class CreateRecipe(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = "__all__"

        widgets = {
            'title': forms.TextInput(attrs={'class':'form-control','placeholder': 'Recipe Name'}),
            'description': forms.TextInput(attrs={'class':'form-control','placeholder': 'Description'}),
            'ingredients': forms.TextInput(attrs={'class':'form-control','placeholder':'Ingredients, Separated by commas'}),
            'instructions': forms.Textarea(attrs={'class':'form-control','placeholder': 'Instructions, numbered'}),
            'image': forms.URLInput(attrs={'class':'form-control','placeholder':'Image URL'}),
            'category': forms.Select(attrs={'class':'form-control','placeholder':'Category'}),
        }

def index(request):
    return render(request, "index.html")

def show_recipes(request):
    recipes = Recipe.objects.all()
    form = CreateRecipe()

    recipes = [recipe.serialize() for recipe in recipes]
    return JsonResponse(recipes, safe=False)

def new_recipe(request):
    if request.method != "POST":
        form = CreateRecipe()
        return render(request, "create.html", {"form":form})
    
    else:
        form = CreateRecipe(request.POST)
        recipes = Recipe.objects.all()

        if form.is_valid():
            form.save()
            return render(request, "recipes.html", {"recipes": recipes})
        
# use json or py?        
# data = json.loads(request.body)

#         title = data.get("title", "")
#         ingredients = data.get("ingredients", "")
#         instructions = data.get("instructions", "")

#         if title == "" or ingredients == "" or instructions == "":
#             return JsonResponse({"error": "All fields are required."}, status=400)
#         else:
#             recipe = Recipe(
                
#                 title=title,
#                 ingredients=ingredients,
#                 instructions=instructions
#             )
#             recipe.save()
#             return render(request, "index.html", {"message": "Recipe created successfully."})
# #


def get_recipe(request, recipe_id):
    try:
        recipe = Recipe.objects.get(pk=recipe_id)
        print(recipe, ":in get recipe")
        
    except Recipe.DoesNotExist:
        return JsonResponse({"error": "Recipe not found."}, status=404)

    # return render(request, "recipe.html", {
    #         "this_recipe": recipe, "recipe_id": recipe_id
    #     }) 
    return JsonResponse(recipe.serialize(), safe=False)

@login_required
def my_recipes(request):
    # get recipes saved by the user
    # recipes = Recipe.objects.filter(user=request.user)
    recipes = Recipe.objects.all()
    
    return render(request, "recipes.html", {
        "recipes": recipes
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "login.html")
    

def register(request):
    if request.method == "POST":
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "register.html", {
                "message": "Email address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "register.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))