from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # path("admin/", admin.site.urls),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/",views.register, name="register"),
    path("create/", views.new_recipe, name="create"),
    path("my_recipes/", views.my_recipes, name="my_recipes"),

    path("my_recipes/<int:recipe_id>", views.get_recipe, name="myrecipe"),
]