# MovieShop Beta 🎬

A modern movie e-commerce platform built with Next.js, featuring user authentication, shopping cart functionality, and a responsive design.

![MovieShop Beta Mockup](MOCKUP_IMAGE)

**Created by:** Josefine, Niklas & Amina

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components](#components)
- [Authentication](#authentication)
- [Usage](#usage)
- [Team](#team)
- [Contributing](#contributing)

## ✨ Features

- **🎭 Movie Browsing**: Browse and search through a comprehensive movie database
- **🔐 User Authentication**: Sign up and sign in functionality with secure authentication
- **🛒 Shopping Cart**: Add movies to cart and manage purchases
- **📱 Responsive Design**: Fully responsive navbar and UI components
- **🌙 Dark/Light Mode**: Theme toggle for better user experience
- **🔍 Search Functionality**: Search for movies across the platform
- **👤 User Profiles**: User profile management with dropdown menu
- **📊 Top Lists**: Curated lists of latest, popular, oldest, and cheapest movies

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: Custom auth client
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movieshop-beta
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── navbar.tsx        # Navigation component
│   ├── sign-in-form.tsx  # Sign in form
│   ├── sign-up-form.tsx  # Sign up form
│   └── button-signin-signout.tsx  # Profile dropdown
├── lib/                  # Utility functions and configurations
└── public/              # Static assets
    └── images/          # Logo and image assets
```

## 🧩 Components

### Navbar

- **Desktop Navigation**: Home, Movies, People, Top Lists
- **Mobile Navigation**: Collapsible hamburger menu with authentication forms
- **Search Bar**: Global movie search functionality (always visible)
- **Theme Toggle**: Dark/light mode switcher
- **Shopping Cart**: Cart management
- **Authentication**:
  - Desktop: ProfileDropdown and Sign Up button
  - Mobile: Sign In/Up buttons in hamburger menu with modal forms

### Authentication Forms

- **Sign In Form**: Email and password authentication with popup modal
- **Sign Up Form**: User registration with validation in popup modal
- **Profile Dropdown**: User menu with profile options (desktop only)

### Responsive Design

- **Desktop**: Full navigation with profile dropdown and sign up button
- **Mobile**: Hamburger menu with sign in/up options in modal dialogs
- **Search**: Always visible on both desktop and mobile
- **Adaptive UI**: Different layouts optimized for each screen size

## 🔐 Authentication

The application uses a custom authentication system with:

- **Email/Password Authentication**: Secure sign up and sign in
- **Form Validation**: Zod schema validation for all forms
- **Session Management**: Automatic redirect after authentication
- **Profile Management**: User profile dropdown with settings
- **Responsive Auth UI**: Different authentication flows for desktop and mobile

### Authentication Flow

1. **Sign Up**: New users create account with name, email, and password
2. **Sign In**: Existing users authenticate with email and password
3. **Profile Access**: Authenticated users see profile dropdown instead of auth buttons
4. **Logout**: Users can sign out from the profile dropdown

## 📱 Usage

### For Visitors (Not Logged In)

- Browse movies and search functionality
- Access to sign up and sign in forms (popup modals)
- View movie information and top lists

### For Authenticated Users

- All visitor features
- Profile dropdown with user options:
  - My Profile
  - Settings
  - My Orders
  - Log Out
- Shopping cart functionality
- Personalized experience

### Navigation Features

- **Home**: Landing page with featured content
- **Movies**: Browse movie catalog
- **People**: Browse actors and directors
- **Top Lists**: Curated movie collections
  - Top 5 Latest Movies
  - Top 5 Most Popular Movies
  - Top 5 Oldest Movies
  - Top 5 Cheapest Movies

## 👥 Team

This project was collaboratively developed by:

- **Josefine** - Frontend Development & UI/UX Design
- **Niklas** - Backend Integration & Authentication
- **Amina** - Component Architecture & Responsive Design

## 🎨 Design & Mockups

_Add your mockup image here:_

```markdown
![MovieShop Beta Desktop](your-mockup-image-url-here)
```

The design features a modern, clean interface with:

- Intuitive navigation structure
- Responsive design patterns
- Dark/light theme support
- Accessible UI components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a portfolio demonstration.

---

**Built with ❤️ by Josefine, Niklas & Amina using Next.js and modern web technologies**
