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

- **User Authentication:** Login and registration with JWT token management
- **User Management:** CRUD operations for users with role-based access
- **Dark Mode:** Toggle between light and dark themes with persistence
- **Responsive Design:** Mobile-first responsive UI using Tailwind CSS
- **Form Validation:** Robust form validation using Yup schemas
- **Error Handling:** Centralized error handling with toast notifications
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
   ```

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

- Login and registration flows
- JWT token management with cookies
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

- Centralized error handling
- Token-based authentication
- Request/response interceptors
- Network error handling

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

- `VITE_SERVER_URL` - Backend API base URL

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
