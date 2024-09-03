# JWT Authentication with Node.js and Express.js

This project demonstrates how to implement authentication using JSON Web Tokens (JWT) with Node.js and Express.js. The application includes well-defined routes for user registration, login, and accessing protected resources.

## Features

- **User Registration:** Register a new user with a username and password.
- **User Login:** Authenticate a user and issue a JWT.
- **Protected Routes:** Access routes that require a valid JWT.
- **JWT Verification:** Middleware to protect routes by verifying the JWT.
- **User Role Management (Optional):** Role-based access control for different user roles.

## Technologies Used

- **Node.js:** JavaScript runtime for building the server.
- **Express.js:** Web framework for handling routing and middleware.
- **JWT (jsonwebtoken):** Library for generating and verifying JSON Web Tokens.
- **bcrypt:** Library for hashing passwords.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your system.

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:

 
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   JWT_SECRET=your_secret_key
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server should be running on `http://localhost:3000`.

## Project Structure

```
.
├── controllers
│   ├── authController.js
├── middlewares
│   ├── authMiddleware.js
├── models
│   ├── userModel.js
├── routes
│   ├── authRoutes.js
│   ├── protectedRoutes.js
├── .env
├── app.js
├── package.json
└── README.md
```

### Explanation

- **`app.js`:** Main entry point of the application.
- **`controllers/`:** Contains the logic for authentication (registration, login).
- **`middlewares/`:** Middleware functions for protecting routes.
- **`models/`:** Defines the user model (schema).
- **`routes/`:** Defines the routes for authentication and protected resources.

## Routes

### Auth Routes

- **POST /api/register:** Register a new user.
  - **Request Body:** `{ "username": "example", "password": "password123" }`
  - **Response:** Success or error message.

- **POST /api/login:** Log in an existing user and receive a JWT.
  - **Request Body:** `{ "username": "example", "password": "password123" }`
  - **Response:** JWT token or error message.

### Protected Routes

- **GET /api/protected:** Access a protected route.
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** Data available only to authenticated users.

## Usage

1. **Register a New User:**
   - Send a POST request to `/api/register` with a username and password.

2. **Log in the User:**
   - Send a POST request to `/api/login` with the registered username and password.
   - Receive a JWT token.

3. **Access Protected Routes:**
   - Send a GET request to `/api/protected` with the JWT token in the Authorization header.

## Contributing

Feel free to open issues or submit pull requests for improvements or bug fixes.
