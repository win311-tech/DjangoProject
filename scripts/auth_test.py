from TF.forms import SignUpForm
from django.contrib.auth import authenticate, get_user_model

print('--- Starting auth test ---')

data = {
    'name': 'Test User',
    'email': 'test@example.com',
    'password1': 'password123',
    'password2': 'password123'
}

form = SignUpForm(data)
print('SignUpForm valid:', form.is_valid())
print('SignUpForm errors:', form.errors.as_json())

if form.is_valid():
    user = form.save()
    print('Saved user -> username:', user.username, 'email:', user.email)
else:
    print('User not saved due to form errors')

# Try to authenticate with email and password
user_auth = authenticate(None, username='test@example.com', password='password123')
print('Authentication attempt (username=test@example.com):', 'Success' if user_auth else 'Failure')

# Attempt to sign up again with same email to test uniqueness validation
form2 = SignUpForm(data)
print('Second SignUpForm valid (should be False):', form2.is_valid())
print('Second SignUpForm errors:', form2.errors.as_json())

# Cleanup: remove test user if created
User = get_user_model()
existing = User.objects.filter(username='test@example.com').first()
if existing:
    existing.delete()
    print('Cleaned up test user')

print('--- Auth test finished ---')