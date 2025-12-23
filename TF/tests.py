from django.test import TestCase, Client
from django.contrib.auth import authenticate, get_user_model
from TF.forms import SignUpForm

User = get_user_model()

class AuthTests(TestCase):
    def tearDown(self):
        User.objects.all().delete()

    def test_signup_saves_full_email_as_username(self):
        data = {
            'name': 'Alice Example',
            'email': 'alice@example.com',
            'password1': 'Str0ngP@ssw0rd!',
            'password2': 'Str0ngP@ssw0rd!'
        }
        form = SignUpForm(data)
        self.assertTrue(form.is_valid(), msg=form.errors.as_json())
        user = form.save()
        self.assertEqual(user.username, 'alice@example.com')
        # authenticate using email (which is now username)
        user_auth = authenticate(username='alice@example.com', password='Str0ngP@ssw0rd!')
        self.assertIsNotNone(user_auth)

    def test_duplicate_email_is_rejected(self):
        data = {
            'name': 'Bob Example',
            'email': 'bob@example.com',
            'password1': 'An0therG00dPass!',
            'password2': 'An0therG00dPass!'
        }
        form1 = SignUpForm(data)
        self.assertTrue(form1.is_valid())
        form1.save()

        form2 = SignUpForm(data)
        self.assertFalse(form2.is_valid())
        self.assertIn('email', form2.errors)

    def test_login_view_accepts_email(self):
        client = Client()
        # create user
        user = User.objects.create_user(username='carol@example.com', email='carol@example.com', password='MySecur3Pass!')
        # post to login view
        response = client.post('/login/', {'username': 'carol@example.com', 'password': 'MySecur3Pass!'})
        # Successful login should redirect (302) to dashboard
        self.assertIn(response.status_code, (302, 301))
        # confirm client is logged in
        response2 = client.get('/dashboard/')
        self.assertEqual(response2.status_code, 200)
