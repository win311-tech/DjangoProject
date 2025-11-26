# Tasty Foods - Restaurant Website 🍕

A full-featured Django restaurant website with user authentication, dynamic menu display, and modern responsive design.

## 📋 Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication System](#authentication-system)
- [Issues Fixed](#issues-fixed)
- [Contributing](#contributing)

---

## 🎯 About the Project

**Tasty Foods** is a modern restaurant web application built with Django. The application allows users to browse the restaurant's menu, learn about services, and create accounts to access personalized features. The system includes a complete authentication flow with user registration, login, logout, and a dedicated user dashboard.

### What Makes This Special?
- Modern, responsive UI with smooth animations
- Secure user authentication system
- Separate user dashboard (not redirecting to admin panel)
- Clean separation of public and authenticated content
- Mobile-friendly design

---

## ✨ Features

### Public Features (No Login Required)
- 🏠 **Homepage** - Beautiful landing page with hero section
- 📖 **About Section** - Information about the restaurant
- 🍽️ **Menu Display** - Weekly special menu with pricing
- 🚚 **Services Showcase** - Delivery, fast food, excellent quality
- 📱 **Mobile App Promotion** - App download links
- 📞 **Contact Section** - Customer service information

### Authenticated Features (Login Required)
- 👤 **User Dashboard** - Personalized user interface
- 📊 **Account Information** - View profile details
- 🔐 **Secure Authentication** - Email-based login system
- 🔄 **Session Management** - Stay logged in across pages

### Authentication Features
- ✅ User Registration (Signup)
- ✅ User Login
- ✅ User Logout
- ✅ Password Validation
- ✅ Email-based Authentication
- ✅ Protected Routes (Dashboard accessible only when logged in)
- ✅ Redirect Management (Login redirects to dashboard, not admin)

---

## 🛠️ Technologies Used

### Backend
- **Django 5.2.8** - Python web framework
- **Python 3.11** - Programming language
- **SQLite** - Database (default, can be changed to PostgreSQL/MySQL)
- **Django Extensions** - Additional Django utilities
- **Django SASS Processor** - SASS/SCSS compilation

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with custom properties
- **JavaScript (Vanilla)** - Client-side interactions
- **SASS/SCSS** - CSS preprocessing
- **Responsive Design** - Mobile-first approach
- **Boxicons** - Icon library

### Authentication
- **Django Auth System** - Built-in authentication
- **Session Management** - Cookie-based sessions
- **CSRF Protection** - Cross-site request forgery protection

---

## 📁 Project Structure

```
DjangoProject/
├── RESTAURANT/                 # Django project settings
│   ├── __init__.py
│   ├── settings.py            # Project configuration
│   ├── urls.py                # Main URL routing
│   ├── wsgi.py                # WSGI configuration
│   └── asgi.py                # ASGI configuration
│
├── TF/                        # Main Django app (Tasty Foods)
│   ├── __init__.py
│   ├── apps.py                # App configuration
│   ├── models.py              # Database models
│   ├── views.py               # View functions (login, signup, dashboard)
│   ├── urls.py                # App URL routing
│   ├── forms.py               # Django forms (SignUpForm, LoginForm)
│   └── migrations/            # Database migrations
│       └── __init__.py
│
├── templates/                 # HTML templates
│   ├── base.html              # Base template
│   ├── index.html             # Homepage
│   ├── login.html             # Login page
│   ├── signup.html            # Signup page
│   └── dashboard.html         # User dashboard
│
├── static/                    # Static files
│   ├── css/
│   │   ├── styles.css         # Main styles
│   │   ├── login.css          # Login page styles
│   │   └── signup.css         # Signup page styles
│   ├── js/
│   │   ├── main.js            # Main JavaScript
│   │   ├── login.js           # Login page logic
│   │   └── signup.js          # Signup validation
│   └── img/                   # Images
│       ├── home.png
│       ├── about.jpg
│       ├── plate1.png
│       └── ... (more images)
│
├── staticfiles/               # Collected static files (production)
├── db.sqlite3                 # SQLite database
├── manage.py                  # Django management script
└── README.md                  # This file
```

---

## 🚀 Installation

### Prerequisites
- Python 3.11 or higher
- pip (Python package manager)
- Git (optional)

### Step 1: Clone the Repository
```bash
git clone https://github.com/win311-tech/DjangoProject.git
cd DjangoProject
```

### Step 2: Create Virtual Environment (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
python -m pip install django django-extensions django-sass-processor
```

### Step 4: Run Database Migrations
```bash
python manage.py migrate
```

### Step 5: Create Superuser (Optional - for admin panel)
```bash
python manage.py createsuperuser
```

### Step 6: Run Development Server
```bash
python manage.py runserver
```

### Step 7: Access the Application
Open your browser and navigate to:
- **Homepage**: http://127.0.0.1:8000/
- **Signup**: http://127.0.0.1:8000/signup/
- **Login**: http://127.0.0.1:8000/login/
- **Dashboard**: http://127.0.0.1:8000/dashboard/ (requires login)
- **Admin Panel**: http://127.0.0.1:8000/admin/ (for superusers)

---

## 📖 Usage

### For Regular Users

#### 1. Creating an Account
1. Go to http://127.0.0.1:8000/signup/
2. Fill in the registration form:
   - **Full Name**: Your name
   - **Email**: Your email address
   - **Password**: Choose a strong password
   - **Confirm Password**: Re-enter your password
3. Click "Sign Up"
4. You'll be automatically logged in and redirected to your dashboard

#### 2. Logging In
1. Go to http://127.0.0.1:8000/login/
2. Enter your credentials:
   - **Email**: Your registered email
   - **Password**: Your password
3. Click "Login"
4. You'll be redirected to your dashboard

#### 3. Using the Dashboard
Once logged in, you can:
- View your account information
- Browse the menu
- Contact customer service
- Log out when finished

#### 4. Logging Out
1. Click the "Logout" button in the dashboard or navigation
2. You'll be redirected to the homepage
3. Your session will be cleared

### For Administrators

#### Accessing Admin Panel
1. Create a superuser account (if not done already):
   ```bash
   python manage.py createsuperuser
   ```
2. Go to http://127.0.0.1:8000/admin/
3. Log in with superuser credentials
4. Manage users, content, and settings

---

## 🔐 Authentication System

### How It Works

#### User Registration Flow
```
User fills signup form
    ↓
JavaScript validates password match
    ↓
Form submits to Django backend
    ↓
Django validates all fields
    ↓
User account created in database
    ↓
User automatically logged in
    ↓
Redirect to /dashboard/ (NOT /admin/)
```

#### Login Flow
```
User enters email & password
    ↓
Django authenticates credentials
    ↓
If valid: Create session & redirect to /dashboard/
    ↓
If invalid: Show error message
```

#### Session Management
- Sessions use secure cookies
- CSRF protection enabled
- Session data stored server-side
- Automatic logout on browser close (optional)

### Security Features
- ✅ Password hashing (PBKDF2 algorithm)
- ✅ CSRF token protection
- ✅ XSS protection
- ✅ SQL injection protection (Django ORM)
- ✅ Secure session cookies
- ✅ Password strength validation

---

## 🐛 Issues Fixed

This project had several critical authentication issues that were identified and resolved:

### Issue #1: Missing `manage.py` File
**Problem**: Django management script was missing, preventing server from starting.
**Solution**: Created proper `manage.py` file with correct configuration.
**File**: `manage.py`

### Issue #2: Missing TF Application
**Problem**: The main app "TF" was referenced in settings but didn't exist.
**Impact**: Application couldn't start - ModuleNotFoundError.
**Solution**: Created complete TF app structure with all necessary files.
**Files Created**:
- `TF/__init__.py`
- `TF/apps.py`
- `TF/models.py`
- `TF/views.py`
- `TF/urls.py`
- `TF/forms.py`
- `TF/migrations/__init__.py`

### Issue #3: Signup Redirects to Admin Dashboard
**Problem**: After successful signup, users were redirected to `/admin/` instead of user dashboard.
**Root Cause**: Views were missing proper redirect configuration.
**Solution**:
- Created dedicated `dashboard_view` for users
- Updated `signup_view` to redirect to `'dashboard'` instead of `'index'`
- Added `LOGIN_REDIRECT_URL = 'dashboard'` in settings
**Files Modified**: `TF/views.py:28`, `RESTAURANT/settings.py:137`

### Issue #4: Invalid Email or Password Error
**Problem**: Login always failed with "invalid password or email" message.
**Root Cause**:
- No authentication views existed
- Forms weren't being processed by Django backend
- JavaScript prevented form submission
**Solution**:
- Created `login_view` with proper authentication logic
- Created `LoginForm` for validation
- Fixed JavaScript to allow form submission to backend
**Files Created/Modified**:
- `TF/views.py:40-63`
- `TF/forms.py:46-57`
- `static/js/signup.js:6-26`

### Issue #5: JavaScript Blocks Form Submission
**Problem**: `signup.js` used `e.preventDefault()` unconditionally, preventing Django from receiving form data.
**Impact**: Signup form never created user accounts.
**Solution**: Modified JavaScript to only prevent submission on validation errors, allowing successful forms to submit.
**File Modified**: `static/js/signup.js:13,19`

### Issue #6: Empty Form Actions
**Problem**: Login and signup forms had `action=""` attribute.
**Impact**: Forms didn't know where to submit data.
**Solution**: Added proper action URLs using Django template tags.
**Files Modified**:
- `templates/login.html:18` - Changed to `action="{% url 'login' %}"`
- `templates/signup.html:18` - Changed to `action="{% url 'signup' %}"`

### Issue #7: No Error Message Display
**Problem**: Users couldn't see authentication errors.
**Solution**: Added Django messages framework integration to templates.
**Files Modified**: `templates/login.html:10-16`, `templates/signup.html:10-16`

### Issue #8: Incorrect Template Path Configuration
**Problem**: `settings.py` had wrong DIRS path: `BASE_DIR.parent / "RESTAURANT" / "templates"`
**Impact**: Templates couldn't be found - TemplateDoesNotExist error.
**Solution**: Changed to `BASE_DIR / "templates"`
**File Modified**: `RESTAURANT/settings.py:61`

### Issue #9: Wrong WSGI Configuration
**Problem**: `WSGI_APPLICATION = "RESTAURANT.RESTAURANT.wsgi.application"`
**Impact**: Server couldn't start - ImproperlyConfigured error.
**Solution**: Changed to `WSGI_APPLICATION = "RESTAURANT.wsgi.application"`
**File Modified**: `RESTAURANT/settings.py:74`

### Issue #10: Missing Login Settings
**Problem**: No LOGIN_URL, LOGIN_REDIRECT_URL, or LOGOUT_REDIRECT_URL configured.
**Impact**: Django didn't know where to redirect after authentication.
**Solution**: Added authentication URL settings to settings.py.
**File Modified**: `RESTAURANT/settings.py:135-138`
```python
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'dashboard'
LOGOUT_REDIRECT_URL = 'index'
```

### Summary of Changes

| Issue | Severity | Status | Files Changed |
|-------|----------|--------|---------------|
| Missing manage.py | CRITICAL | ✅ Fixed | 1 created |
| Missing TF app | CRITICAL | ✅ Fixed | 7 created |
| Signup redirects to admin | HIGH | ✅ Fixed | 2 modified |
| Login always fails | CRITICAL | ✅ Fixed | 3 created/modified |
| JS blocks form submission | HIGH | ✅ Fixed | 1 modified |
| Empty form actions | MEDIUM | ✅ Fixed | 2 modified |
| No error messages | MEDIUM | ✅ Fixed | 2 modified |
| Wrong template path | HIGH | ✅ Fixed | 1 modified |
| Wrong WSGI config | CRITICAL | ✅ Fixed | 1 modified |
| Missing login settings | MEDIUM | ✅ Fixed | 1 modified |

**Total Files Created**: 8
**Total Files Modified**: 10
**Total Issues Resolved**: 10

---

## 🎨 Design Features

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktop
- Flexible grid layout
- Touch-friendly buttons

### UI/UX Elements
- Smooth scroll animations
- Hover effects on buttons and cards
- Loading states
- Form validation feedback
- Success/error messages
- Clean, modern typography

### Color Scheme
- Primary: Hue 174 (Teal/Green)
- Dark color: #0B0A0A
- Container color: #FFF
- Consistent spacing and padding

---

## 📊 Database Schema

### User Model (Built-in Django)
- `id` - Primary key
- `username` - Unique username (auto-generated from email)
- `email` - User email (used for login)
- `first_name` - User's full name
- `password` - Hashed password
- `date_joined` - Account creation date
- `is_active` - Account status
- `is_staff` - Admin access flag
- `is_superuser` - Superuser flag

---

## 🧪 Testing

### Manual Testing Checklist

#### Signup Flow
- [ ] Navigate to /signup/
- [ ] Fill in all fields
- [ ] Submit form
- [ ] Verify redirect to /dashboard/
- [ ] Check welcome message appears
- [ ] Verify user in database

#### Login Flow
- [ ] Navigate to /login/
- [ ] Enter valid credentials
- [ ] Submit form
- [ ] Verify redirect to /dashboard/
- [ ] Check welcome message
- [ ] Test invalid credentials show error

#### Dashboard Access
- [ ] Access /dashboard/ when logged in
- [ ] Verify user info displays
- [ ] Test logout button
- [ ] Try accessing /dashboard/ when logged out (should redirect to login)

#### Public Pages
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation works
- [ ] CSS styles apply
- [ ] JavaScript executes

---

## 🔧 Configuration

### Important Settings

#### Development Settings (`RESTAURANT/settings.py`)
```python
DEBUG = True  # Set to False in production
ALLOWED_HOSTS = []  # Add your domain in production
SECRET_KEY = "..."  # Change in production (use environment variable)

# Templates
TEMPLATES[0]['DIRS'] = [BASE_DIR / "templates"]

# Static files
STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]

# Authentication
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'dashboard'
LOGOUT_REDIRECT_URL = 'index'
```

### Environment Variables (Recommended for Production)
Create a `.env` file:
```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:pass@localhost/dbname
```

---

## 🚀 Deployment

### Production Checklist
- [ ] Set `DEBUG = False`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Use environment variables for secrets
- [ ] Set up production database (PostgreSQL recommended)
- [ ] Configure static files serving
- [ ] Set up HTTPS
- [ ] Configure email backend
- [ ] Enable CSRF and session security
- [ ] Run `python manage.py collectstatic`
- [ ] Set up logging

### Deployment Options
- **Heroku** - Easy deployment with Git
- **DigitalOcean** - VPS hosting
- **AWS** - Scalable cloud hosting
- **PythonAnywhere** - Simple Python hosting
- **Railway** - Modern deployment platform

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 style guide for Python
- Write meaningful commit messages
- Add comments for complex logic
- Test before submitting PR
- Update documentation as needed

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**GitHub**: [@win311-tech](https://github.com/win311-tech)

---

## 🙏 Acknowledgments

- Django documentation and community
- Boxicons for the icon library
- All contributors and testers

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues Fixed](#issues-fixed) section
2. Review the server logs for error messages
3. Open an issue on GitHub
4. Contact the development team

---

## 🔄 Changelog

### Version 1.0.0 (November 14, 2025)
- ✅ Initial release
- ✅ Fixed all authentication issues
- ✅ Implemented user dashboard
- ✅ Created comprehensive documentation
- ✅ Added responsive design
- ✅ Configured proper redirects

---

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django Authentication System](https://docs.djangoproject.com/en/5.2/topics/auth/)
- [Python Official Docs](https://docs.python.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Made with ❤️ using Django**
