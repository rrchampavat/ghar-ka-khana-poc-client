# Ghar Ka Khana - Client Application

A modern web application for online tiffin service built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **Framework:** React 19.1.0
- **Language:** TypeScript 5.8.3
- **Build Tool:** Vite 7.0.5
- **UI Library:** HeroUI 2.8.1
- **Styling:** Tailwind CSS 4.1.11
- **State Management:** TanStack Query (React Query) 5.83.0
- **Form Handling:** React Hook Form 7.60.0 with Yup validation
- **Routing:** React Router DOM 7.7.0
- **HTTP Client:** Axios 1.10.0
- **Icons:** Lucide React 0.525.0

## 📦 Project Structure

```
client/
├── public/
│   └── svgs/          # Static SVG assets
├── src/
│   ├── assets/        # Images and other assets
│   ├── hooks/         # Custom React hooks
│   │   └── useLocalStorage.ts
│   ├── layouts/       # Layout components
│   │   ├── auth/      # Authentication layout
│   │   └── main/      # Main application layout
│   ├── lib/           # Utility functions
│   │   └── utils.ts   # Common utilities (cn function)
│   ├── pages/         # Application pages
│   │   ├── error/     # Error pages (404, 500)
│   │   ├── home/      # Home page
│   │   ├── login/     # Login page
│   │   ├── register/  # Registration page
│   │   ├── user-details/ # User details page
│   │   └── users/     # Users list page
│   ├── routes/        # Route configurations
│   ├── services/      # API service layer
│   │   ├── auth/      # Authentication services
│   │   ├── axios-methods/ # HTTP method wrappers
│   │   └── user/      # User-related services
│   ├── shared/        # Shared resources
│   │   ├── constants/ # Application constants
│   │   └── validation-schemas/ # Yup validation schemas
│   ├── types/         # TypeScript type definitions
│   ├── ui/            # UI components
│   │   ├── components/ # Reusable UI components
│   │   └── layouts/   # Layout components
│   ├── App.tsx        # Root application component
│   ├── main.tsx       # Application entry point
│   └── providers.tsx  # Application providers
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.cjs
```

## 🎨 Features

- **User Authentication:** Login and registration with JWT token management and automatic refresh token rotation
- **Token Management:** Secure JWT access tokens with HttpOnly refresh cookies implementing token rotation
- **User Management:** CRUD operations for users with role-based access
- **Dark Mode:** Toggle between light and dark themes with persistence
- **Responsive Design:** Mobile-first responsive UI using Tailwind CSS
- **Form Validation:** Robust form validation using Yup schemas
- **Error Handling:** Centralized error handling with toast notifications
- **Automatic Token Refresh:** Seamless access token refresh with request queuing
- **Type Safety:** Full TypeScript support for better developer experience
- **Code Quality:** ESLint and Prettier configured for consistent code style

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:

   ```env
   VITE_SERVER_URL=your_backend_server_url
   # Optional: Enable credentials for production (requires proper CORS setup)
   # VITE_ENABLE_CREDENTIALS=true
   ```

   **Note:** In development mode, `VITE_ENABLE_CREDENTIALS` is automatically enabled. The Vite proxy handles CORS issues automatically.

4. **Start the development server:**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:coverage` - Generate test coverage report

## 🔧 Configuration

### ESLint

The project uses a comprehensive ESLint configuration with TypeScript support:

- Naming conventions enforcement
- Unused variable detection
- Code style consistency
- TypeScript-specific rules

### Prettier

Configured with Tailwind CSS plugin for automatic class sorting.

### Husky

Pre-commit hooks are configured to run lint-staged, ensuring code quality before commits.

## 🎯 Key Components

### Authentication

- Login and registration flows with automatic token refresh
- JWT access token management stored in regular cookies
- HttpOnly refresh token cookies for enhanced security
- Automatic token rotation on refresh (backend creates new refresh token, revokes old one)
- Seamless token refresh on 401 errors with request queuing
- Protected routes with authentication guards

### User Management

- User listing with pagination and sorting
- User profile viewing
- User update functionality
- User activation/deactivation

### UI Components

Built on top of HeroUI with custom wrappers:

- Button, Input, Select
- Table with pagination
- Modal dialogs
- Toast notifications
- Avatar, Chip, Tooltip
- and more...

## 🌐 API Integration

The application uses Axios for HTTP requests with:

- **Centralized error handling** across all HTTP methods
- **Token-based authentication** with automatic refresh
- **Refresh token rotation** implemented via shared utility
- **Request queuing** to prevent multiple simultaneous refresh calls
- **HttpOnly cookie support** via `withCredentials` for secure refresh tokens
- **Automatic retry** of failed requests after token refresh
- **Network error handling** with user-friendly error messages

### HTTP Methods

All HTTP methods (`GET`, `POST`, `PUT`, `PATCH`) support:

- Automatic access token refresh on 401 errors
- Shared refresh token logic via `refreshToken.ts` utility
- Cookie-based authentication with HttpOnly refresh cookies
- Request queuing during token refresh to prevent race conditions

### Development Proxy

The Vite development server includes a proxy configuration that:

- Proxies all `/api/*` requests to the backend server
- Automatically handles CORS issues in development
- Forwards cookies and credentials between client and server
- Removes `Secure` flag from cookies for local development

## 🎨 Theming

The application supports dark and light modes:

- Uses Tailwind CSS class-based dark mode
- Theme preference persisted in localStorage
- Toggle available in the header
- All components adapt to the selected theme

## 📝 Form Validation

Forms use React Hook Form with Yup schemas for validation:

- Email validation
- Phone number validation
- Password strength requirements
- Custom error messages

## 🔐 Environment Variables

Required environment variables:

- `VITE_SERVER_URL` - Backend API base URL (e.g., `http://localhost:8080`)

Optional environment variables:

- `VITE_ENABLE_CREDENTIALS` - Set to `"true"` to enable credentials in production (automatically enabled in development)
  - Requires backend to have proper CORS configuration:
    - `Access-Control-Allow-Credentials: true`
    - `Access-Control-Allow-Origin: <explicit-origin>` (not `*`)
    - Proper headers and methods allowed

### Development vs Production

**Development Mode:**

- Uses Vite proxy (`/api/*` → backend server)
- `withCredentials` automatically enabled
- No CORS issues (proxy handles it)
- `SERVER_URL` is empty (uses relative URLs)

**Production Mode:**

- Uses full server URL from `VITE_SERVER_URL`
- `withCredentials` only enabled if `VITE_ENABLE_CREDENTIALS=true`
- Requires backend CORS configuration

## 🚦 Routing

The application uses React Router v7 with:

- Lazy-loaded routes for better performance
- Nested layouts (Auth and Main)
- Protected routes
- 404 and 500 error pages

## 🧪 Testing

Testing setup includes:

- Vitest for unit tests
- React Testing Library
- Jest DOM matchers
- Coverage reporting

## 📄 License

This project is private and proprietary.

## 👥 Contributors

- Your team members here

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📞 Support

For support, please contact the development team.
