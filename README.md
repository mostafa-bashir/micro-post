# Micro-Post

A modern, full-stack microblogging application built with NestJS and Next.js. This project demonstrates a production-ready architecture with JWT authentication, RESTful API design, and a responsive user interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Micro-Post is a lightweight social media platform that allows users to:
- Create and manage user accounts
- Share posts with the community
- View posts from all users or filter by specific users
- Secure authentication with JWT tokens

The application follows industry best practices with a clean separation between frontend and backend, comprehensive error handling, and scalable architecture.

## ✨ Features

### Authentication & Authorization
- User registration with email validation
- Secure login with JWT token-based authentication
- Protected routes and API endpoints
- Automatic token refresh and session management
- Password hashing with bcrypt

### Post Management
- Create, read, and delete posts
- View all posts or filter by user
- Real-time post updates
- Character limit validation (500 characters)

### User Management
- User profile viewing
- User listing with pagination support
- User-specific post filtering

### User Interface
- Modern, responsive design with Ant Design
- Intuitive navigation and dashboard
- Real-time feedback with toast notifications
- Loading states and error handling
- Mobile-friendly layout

## 🛠 Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/) (v10.0.0) - Progressive Node.js framework
- **Database**: PostgreSQL with TypeORM
- **Authentication**: Passport.js with JWT and Local strategies
- **Validation**: class-validator and class-transformer
- **Security**: bcrypt for password hashing
- **Language**: TypeScript

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (v16.1.1) - React framework with App Router
- **UI Library**: [Ant Design](https://ant.design/) (v6.1.3) - Enterprise-class UI components
- **State Management**: [TanStack Query](https://tanstack.com/query) (v5.90.15) - Data fetching and caching
- **HTTP Client**: Axios with interceptors
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## 🏗 Architecture

```
micro-post/
├── server/          # NestJS Backend API
│   ├── src/
│   │   ├── auth/    # Authentication module (JWT, Local strategies)
│   │   ├── users/   # User management module
│   │   ├── posts/   # Post management module
│   │   └── main.ts  # Application entry point
│   └── dist/        # Compiled JavaScript
│
└── client/          # Next.js Frontend
    ├── src/
    │   ├── app/     # Next.js App Router pages
    │   ├── components/  # React components
    │   ├── lib/     # Utilities, hooks, API client
    │   └── types/   # TypeScript type definitions
    └── public/      # Static assets
```

### Design Patterns
- **Modular Architecture**: Feature-based module organization
- **Repository Pattern**: TypeORM for data access
- **Strategy Pattern**: Passport.js authentication strategies
- **Decorator Pattern**: NestJS decorators for routing and validation
- **Custom Hooks**: React hooks for data fetching and state management

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **PostgreSQL** (v12.0 or higher)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd micro-post
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `server/` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=micro_post_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=3000
```

**Important**: 
- Replace `JWT_SECRET` with a strong, random string in production
- Ensure PostgreSQL is running and the database exists
- The database will be automatically created if it doesn't exist (due to `synchronize: true` in development)

### Frontend Configuration

Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note**: In production, update this to your backend API URL.

### Database Setup

1. **Create PostgreSQL Database**:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE micro_post_db;

# Exit psql
\q
```

2. **Database Schema**: The application uses TypeORM with `synchronize: true` in development, which automatically creates tables based on entities. In production, use migrations instead.

## 🏃 Running the Application

### Development Mode

#### Start the Backend Server

```bash
cd server
npm run start:dev
```

The backend will start on `http://localhost:3000` (or the port specified in `.env`).

#### Start the Frontend Development Server

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:3000` (Next.js default port). If there's a conflict, Next.js will automatically use port 3001.

### Production Mode

#### Build and Start Backend

```bash
cd server
npm run build
npm run start:prod
```

#### Build and Start Frontend

```bash
cd client
npm run build
npm run start
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Note**: Include the token in subsequent requests:
```http
Authorization: Bearer <access_token>
```

### User Endpoints

#### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "email": "user@example.com"
  }
]
```

#### Get User by ID
```http
GET /users/:id
Authorization: Bearer <token>
```

### Post Endpoints

#### Create Post
```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "This is my first post!"
}
```

**Response:**
```json
{
  "id": 1,
  "content": "This is my first post!",
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Get All Posts
```http
GET /posts
```

**Response:**
```json
[
  {
    "id": 1,
    "content": "This is my first post!",
    "user": {
      "id": 1,
      "email": "user@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Get Posts by User
```http
GET /posts/user/:userId
```

#### Get Post by ID
```http
GET /posts/:id
```

#### Delete Post
```http
DELETE /posts/:id
Authorization: Bearer <token>
```

**Note**: Users can only delete their own posts.

### Error Responses

All endpoints may return the following error responses:

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password should not be empty"],
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

```json
{
  "statusCode": 404,
  "message": "User with ID 999 not found",
  "error": "Not Found"
}
```

```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

## 📁 Project Structure

### Backend Structure

```
server/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── auth.controller.ts   # Login endpoint
│   │   ├── auth.service.ts      # Authentication logic
│   │   ├── auth.module.ts       # Auth module definition
│   │   ├── jwt.strategy.ts      # JWT authentication strategy
│   │   ├── local.strategy.ts    # Local (email/password) strategy
│   │   ├── jwt-auth.guard.ts   # JWT guard for protected routes
│   │   ├── local-auth.guard.ts  # Local guard for login
│   │   ├── get-user.decorator.ts # Custom decorator to get current user
│   │   └── dto/
│   │       └── login.dto.ts     # Login data transfer object
│   │
│   ├── users/                    # User management module
│   │   ├── users.controller.ts  # User endpoints
│   │   ├── users.service.ts     # User business logic
│   │   ├── users.module.ts      # Users module definition
│   │   ├── entities/
│   │   │   └── user.entity.ts   # User database entity
│   │   └── dto/
│   │       └── register.dto.ts  # Registration DTO
│   │
│   ├── posts/                    # Post management module
│   │   ├── posts.controller.ts  # Post endpoints
│   │   ├── posts.service.ts     # Post business logic
│   │   ├── posts.module.ts      # Posts module definition
│   │   ├── entities/
│   │   │   └── post.entity.ts   # Post database entity
│   │   └── dto/
│   │       └── create-post.dto.ts # Create post DTO
│   │
│   ├── app.module.ts             # Root application module
│   ├── app.controller.ts        # Root controller
│   ├── app.service.ts           # Root service
│   └── main.ts                  # Application entry point
│
├── test/                         # E2E tests
├── dist/                         # Compiled output
├── package.json
├── tsconfig.json
└── nest-cli.json
```

### Frontend Structure

```
client/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Login page
│   │   │   └── register/
│   │   │       └── page.tsx     # Registration page
│   │   │
│   │   ├── dashboard/           # Protected dashboard routes
│   │   │   ├── layout.tsx       # Dashboard layout
│   │   │   ├── posts/
│   │   │   │   └── page.tsx     # My posts page
│   │   │   ├── create/
│   │   │   │   └── page.tsx     # Create post page
│   │   │   └── users/
│   │   │       ├── page.tsx     # Users list page
│   │   │       └── [id]/
│   │   │           └── posts/
│   │   │               └── page.tsx # User posts page
│   │   │
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── providers.tsx        # React Query provider
│   │   └── globals.css          # Global styles
│   │
│   ├── components/               # React components
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Application header
│   │   │   └── Sidebar.tsx      # Navigation sidebar
│   │   └── post/
│   │       ├── PostCard.tsx     # Post display component
│   │       ├── PostForm.tsx     # Post creation form
│   │       └── PostList.tsx     # Post list component
│   │
│   ├── lib/                      # Utilities and configurations
│   │   ├── api.ts               # Axios instance and interceptors
│   │   ├── auth.ts              # Authentication utilities
│   │   └── hooks/               # Custom React hooks
│   │       ├── useAuth.ts       # Authentication hook
│   │       ├── usePosts.ts     # Posts data fetching hook
│   │       └── useUsers.ts     # Users data fetching hook
│   │
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   │
│   └── middleware.ts            # Next.js middleware for route protection
│
├── public/                       # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 💻 Development

### Backend Development

```bash
# Start in watch mode (auto-reload on changes)
npm run start:dev

# Run linter
npm run lint

# Format code
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:cov
```

### Frontend Development

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

### Code Style

- **Backend**: Follows NestJS conventions and uses ESLint + Prettier
- **Frontend**: Follows Next.js conventions and uses ESLint
- **TypeScript**: Strict mode enabled for both projects

## 🧪 Testing

### Backend Tests

```bash
cd server

# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests

Testing setup can be added using Jest and React Testing Library. Currently, the project structure supports easy test integration.

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: DTO validation with class-validator
- **SQL Injection Protection**: TypeORM parameterized queries
- **CORS Configuration**: Enabled for cross-origin requests
- **Route Guards**: Protected endpoints with JWT guards
- **Error Handling**: Comprehensive error handling without exposing sensitive information
- **Token Expiration**: JWT tokens expire after 60 minutes

## 🚢 Deployment

### Backend Deployment

1. Set environment variables in your hosting platform
2. Build the application: `npm run build`
3. Start the production server: `npm run start:prod`
4. Ensure PostgreSQL database is accessible
5. Consider using environment-specific configurations

### Frontend Deployment

1. Set `NEXT_PUBLIC_API_URL` to your backend URL
2. Build the application: `npm run build`
3. Start the production server: `npm run start`
4. Or deploy to platforms like Vercel, Netlify, or AWS

### Recommended Production Practices

- Use environment variables for all sensitive data
- Disable `synchronize: true` in TypeORM and use migrations
- Use a strong, randomly generated `JWT_SECRET`
- Enable HTTPS
- Set up proper CORS origins
- Use a reverse proxy (nginx) for production
- Implement rate limiting
- Set up monitoring and logging
- Use a managed PostgreSQL service

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📝 License

This project is licensed under the UNLICENSED license - see the package.json files for details.

## 👤 Author

Developed as a technical assessment demonstrating full-stack development capabilities with modern technologies and best practices.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the excellent backend framework
- [Next.js](https://nextjs.org/) for the powerful React framework
- [Ant Design](https://ant.design/) for the beautiful UI components
- [TypeORM](https://typeorm.io/) for the robust ORM solution

---

**Note**: This project is designed for assessment purposes and demonstrates production-ready code structure, security practices, and modern development workflows.

