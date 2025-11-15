from django import forms

"""
  UserRegistration
   username
   email
   password
   confirm


   LoginForm
   username
   password

"""


class UserRegistrationForm(forms.Form):
    username = forms.CharField(
        max_length=100, widget=forms.TextInput(attrs={"class": "form-control"})
    )
    email = forms.EmailField(widget=forms.TextInput(attrs={"class": "form-control"}))
    password = forms.CharField(
        max_length=100, widget=forms.PasswordInput(attrs={"class": "form-control"})
    )
    confirm = forms.CharField(
        max_length=100, widget=forms.PasswordInput(attrs={"class": "form-control"})
    )


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=100, widget=forms.TextInput(attrs={"class": "form-control"})
    )
    password = forms.CharField(
        max_length=100, widget=forms.PasswordInput(attrs={"class": "form-control"})
    )
