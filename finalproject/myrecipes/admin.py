from django.contrib import admin
from myrecipes.models import User, Recipe

admin.site.register(Recipe)
admin.site.register(User)