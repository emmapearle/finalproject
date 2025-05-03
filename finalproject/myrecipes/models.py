from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    # description = models.TextField()
    #servings = models.IntegerField()
    ingredients = models.TextField()
    instructions = models.TextField()
    # category = models.TypeField(
    #     max_length=50,
    #     choices=[
    #         ('vegetarian', 'Vegetarian'),
    #         ('vegan', 'Vegan'),
    #         ('dessert', 'Dessert'),
    #         ('sugar_free', 'Sugar-Free'),
    #         ('low_calorie', 'Low Calorie')
    #     ]
    # )
    # creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cooks")

    def __str__(self):
        return self.title