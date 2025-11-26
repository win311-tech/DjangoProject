from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_view, name='index'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('cart/', views.cart_view, name='cart'),
    path('order-history/', views.order_history_view, name='order-history'),
    path('contact/', views.contact_view, name='contact'),
    path('favorites/', views.favorites_view, name='favorites'),

    ]

