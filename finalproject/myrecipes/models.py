from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass

class Recipe(models.Model):

    cat_choices = [
        ('vegetarian', 'Vegetarian'),
        ('vegan', 'Vegan'),
        ('dessert', 'Dessert'),
        ('sugar_free', 'Sugar-Free'),
        ('low_calorie', 'Low Calorie'),
        ('breakfast', 'Breakfast')
    ]

    title = models.CharField(max_length=255, null=True, blank=False)
    description = models.TextField(null=True, blank=True)
    image = models.URLField(null=True, blank=False)
    ingredients = models.TextField(null=True, blank=False)
    instructions = models.TextField(null=True, blank=False)
    category = models.CharField(
        max_length=50,
        choices=cat_choices, null=True, blank=True
    )
    isClicked = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def serialize(self):
        return {
            "id": self.id,
            "title":self.title,
            "image":self.image,
            "description":self.description,
            "ingredients":self.ingredients,
            "instructions":self.instructions,
            "category":self.category,
            "isClicked":self.isClicked
        }

class Pantry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mypantry")
    ingredients = models.JSONField(default=list, blank=True)
    ingredientsbyId = models.JSONField(default=list, blank=True)
    # ingredients = models.ManytoManyField(null=True, blank=True, related_name="ingredients", on_delete=models.CASCADE)
    # inPantry = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user}'s Groceries: {self.ingredients}"
    
    def serialize(self):
        return {
            "id": self.id,
            "ingredients": self.ingredients,
            "ingredientsbyId": self.ingredientsbyId
        }


class Ingredients(models.Model):
    item = models.CharField(max_length=200)

    def __str__(self):
        return self.item