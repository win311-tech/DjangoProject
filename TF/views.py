from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import LoginForm, UserRegistrationForm

# Home page
def index(request):
    return render(request, 'index.html')


# Signup / Registration
def signup_views(request):
    form = UserRegistrationForm()
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm = request.POST.get("confirm_password")

        # Check required fields
        if not username or not email or not password or not password:
            messages.error(request, "All fields are required.")
            return redirect("signup")

        # Password match check
        if password != confirm:
            messages.error(request, "Password do not match.")
            return redirect("signup")

        # Check if username exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("signup")

        # Check if email exists
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect("signup")

        # Create user
        new_user = User.objects.create_user(username=username, email=email , password=password)
        new_user.set_password(password)
        new_user.save()
        messages.success(request, "Account created successfully. Please log in.")
        return redirect("login")

    return render(request, "signup.html")


# Login
def login_views(request):
    form = LoginForm()

    if request.method == 'POST':
        email = request.POST.get('username')
        password = request.POST.get('password')

        try:
            # Get user by email
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None:
            login(request, user)
            return redirect('index')
        else:

            return render(request, 'login.html', {'form': form})

    return render(request, 'login.html', {'form': form})


# Logout
def logout_views(request):
    logout(request)
    return redirect("login")
