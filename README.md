# SpendSmart

SpendSmart is an expense management application that helps users manage and track their expenses with ease.

## Features
- User Authentication (Sign-up/Login using Firebase)
- Add, view, edit, and delete expenses
- Dashboard showing recent expenses and total spent
- Responsive UI built with Tailwind CSS

## Technologies
- React
- Firebase (Authentication & Firestore)
- Tailwind CSS
- TypeScript

## Installation
1. Clone the repository:
   ```sh
   git clone [repo_url]

2. cd to project directory

3. npm install dependencies 

4. Set up Firebase or Appwrite (your choice)
 - Enable Firestore Database and Authentication.
 - Copy your Firebase configuration and paste it into a    new firebaseConfig.ts file in the src folder.

5. Folder Structure

src
├── components
│   ├── AddExpenseScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── EntryScreen.tsx
│   ├── ExpenseListScreen.tsx
│   ├── Navbar.tsx
│   ├── SignUpScreen.tsx
│   └── LoginScreen.tsx
├── context
│   ├── AuthContext.tsx
│   └── FirestoreContext.tsx
├── assets
│   └── spendsmart-logo.png
├── firebaseConfig.ts
├── App.tsx
└── index.tsx

6. License
 - This project is licensed under the MIT License - see the LICENSE file for details.