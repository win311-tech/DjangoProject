from django.urls import path

from TF import views


urlpatterns = [
    path(
        "",
        views.index,
        name="index",
    ),
    path(
        "login/",
        views.login_views,
        name="login",
    ),
    path(
        "signup/",
        views.signup_views,
        name="signup",
    ),
    path(
        "logout/",
        views.logout_views,
        name="logout",
    ),
]
