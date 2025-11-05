# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Running the Client

```bash
pnpm dev
```

Starts Vite development server with hot module replacement on `http://localhost:5173`.

### Building for Production

```bash
pnpm build
```

Builds the application for production using Vite. Output is in the `dist/` directory.

### Linting

```bash
pnpm lint
```

Runs ESLint with TypeScript support. Exits on errors or warnings.

### Testing

```bash
pnpm test              # Run tests
pnpm test:ui           # Run tests with UI
pnpm test:coverage     # Generate test coverage report
```

## Architecture Overview

### Tech Stack

- **Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.5.5
- **UI Library**: HeroUI 2.8.1
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: TanStack Query (React Query) 5.83.0
- **Form Handling**: React Hook Form 7.60.0 with Yup validation
- **Routing**: React Router DOM 7.7.0
- **HTTP Client**: Axios 1.10.0
- **Icons**: Lucide React 0.525.0

### Project Structure

```
src/
├── App.tsx                    # Root application component
├── main.tsx                   # Application entry point
├── providers.tsx              # Application providers (React Query, etc.)
├── assets/                    # Images and other assets
├── hooks/                     # Custom React hooks
│   └── useLocalStorage.ts
├── layouts/                   # Layout components
│   ├── auth/                  # Authentication layout
│   └── main/                  # Main application layout
├── lib/                       # Utility functions
│   └── utils.ts               # Common utilities (cn function)
├── pages/                     # Application pages
│   ├── error/                 # Error pages (404, 500)
│   ├── home/                  # Home page
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   ├── user-details/          # User details page
│   └── users/                 # Users list page
├── routes/                    # Route configurations
│   ├── lazyLoading.tsx        # Lazy loading utilities
│   └── routes.tsx              # Route definitions
├── services/                  # API service layer
│   ├── auth/                  # Authentication services
│   │   ├── login.service.ts
│   │   ├── logout.service.ts
│   │   └── register.service.ts
│   ├── axios-methods/         # HTTP method wrappers
│   │   ├── get.ts             # GET requests with token refresh
│   │   ├── post.ts            # POST requests with token refresh
│   │   ├── update.ts          # PUT requests with token refresh
│   │   ├── patch.ts           # PATCH requests with token refresh
│   │   └── refreshToken.ts    # Shared refresh token utility
│   └── user/                  # User-related services
├── shared/                    # Shared resources
│   ├── constants/             # Application constants
│   │   ├── envVars.ts         # Environment variables
│   │   ├── request-urls.ts    # API route definitions
│   │   └── ...
│   └── validation-schemas/   # Yup validation schemas
├── types/                     # TypeScript type definitions
├── ui/                        # UI components
│   ├── components/            # Reusable UI components
│   └── layouts/               # Layout components
└── tests/                     # Test setup files
```

## Authentication & Token Management

### Token Architecture

The application implements a dual-token authentication system:

1. **Access Token (JWT)**: Stored in regular cookie (`accessToken`)
   - Short-lived token for API authentication
   - Sent in `Authorization: Bearer <token>` header
   - Automatically refreshed when expired (401 error)

2. **Refresh Token**: Stored as HttpOnly cookie (`refreshToken`)
   - Long-lived token for obtaining new access tokens
   - Automatically sent with requests via `withCredentials: true`
   - Implemented token rotation (backend creates new token, revokes old one)

### Token Refresh Flow

1. **Request fails with 401** (expired access token)
2. **Check if refresh in progress**:
   - If yes: Queue the request
   - If no: Start refresh process
3. **Call `/api/v1/auth/refresh`**:
   - Sends HttpOnly refresh cookie automatically (`withCredentials: true`)
   - Backend validates refresh token
   - Backend creates new refresh token (rotation)
   - Backend revokes old refresh token
   - Backend returns new access token
   - Backend sets new HttpOnly refresh cookie
4. **Update access token** in regular cookie
5. **Process queued requests** with new access token
6. **Retry original request** with new access token

### HTTP Methods Implementation

All HTTP methods (`get.ts`, `post.ts`, `update.ts`, `patch.ts`) share:

- **Shared refresh token utility** (`refreshToken.ts`)
- **Automatic token refresh** on 401 errors
- **Request queuing** to prevent multiple refresh calls
- **Automatic retry** after successful refresh
- **Error handling** with user-friendly messages
- **Logout on refresh failure** (redirects to login)

### Shared Refresh Token Utility

Located in `src/services/axios-methods/refreshToken.ts`:

- **`tryRefreshToken()`**: Calls refresh endpoint and returns new access token
- **`processQueue()`**: Processes queued requests after refresh
- **`getIsRefreshing()`**: Checks if refresh is in progress
- **`setIsRefreshing()`**: Sets refresh state
- **`addToRefreshQueue()`**: Adds request to queue

### Development Proxy

Vite configuration includes a proxy for development:

```typescript
server: {
  proxy: {
    "/api": {
      target: process.env.VITE_SERVER_URL || "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      // Forwards cookies and credentials
    }
  }
}
```

**Benefits:**

- Avoids CORS issues in development
- Cookies automatically forwarded
- No need for CORS configuration in development
- Uses relative URLs (`/api/*`) in development

## Environment Variables

### Required

- `VITE_SERVER_URL` - Backend API base URL (e.g., `http://localhost:8080`)

### Optional

- `VITE_ENABLE_CREDENTIALS` - Set to `"true"` for production when backend has proper CORS
  - Automatically enabled in development mode
  - Requires backend CORS configuration:
    - `Access-Control-Allow-Credentials: true`
    - `Access-Control-Allow-Origin: <explicit-origin>` (not `*`)
    - `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`
    - `Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS`

### Environment Detection

The application automatically detects development vs production:

```typescript
const isDevelopment = import.meta.env.DEV;

// In development: SERVER_URL = "" (uses proxy)
// In production: SERVER_URL = VITE_SERVER_URL

// In development: ENABLE_CREDENTIALS = true
// In production: ENABLE_CREDENTIALS = VITE_ENABLE_CREDENTIALS === "true"
```

## API Integration

### HTTP Methods

All HTTP methods are located in `src/services/axios-methods/`:

- **`get.ts`**: GET requests with `baseURL` and `params`
- **`post.ts`**: POST requests with request body
- **`update.ts`**: PUT requests for full updates
- **`patch.ts`**: PATCH requests for partial updates

### Common Features

All methods:

- Use `withCredentials: ENABLE_CREDENTIALS` to send HttpOnly cookies
- Include `Authorization: Bearer <accessToken>` header
- Handle 401 errors with automatic refresh
- Queue requests during refresh to prevent race conditions
- Retry original request after successful refresh
- Show user-friendly error messages via toast notifications
- Redirect to login on refresh failure

### Error Handling

Error responses are handled with:

- Network error detection
- Status-specific handling (401, 403, 500, 502, 504)
- Toast notifications for user feedback
- Automatic logout on authentication failures

## Path Aliases (tsconfig)

```typescript
"@/*"; // src/*
```

All imports use the `@/` alias for the `src/` directory.

## Coding Standards

### ESLint Rules (Key Points)

- **Indentation**: 2 spaces
- **Quotes**: Double quotes only
- **Semicolons**: Required
- **Naming Conventions**:
  - Types/Interfaces: `PascalCase` or `UPPER_CASE`
  - Functions: `camelCase` or `PascalCase`
  - Variables: `camelCase`, `PascalCase`, `snake_case`, or `UPPER_CASE`
  - Booleans: Must have prefix `is`, `should`, `has`, `can`, `did`, `will`, `does`
- **Unused variables**: Prefix with `_` to ignore
- **Strict mode**: All TypeScript strict checks enabled

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `LoginForm.tsx`)
- **Services**: `camelCase.ts` (e.g., `login.service.ts`)
- **Utilities**: `camelCase.ts` (e.g., `refreshToken.ts`)
- **Types**: `camelCase.d.ts` (e.g., `auth.d.ts`)
- **Constants**: `camelCase.ts` (e.g., `envVars.ts`)

## Key Patterns

### Token Refresh Pattern

```typescript
// 1. Check if refresh in progress
if (getIsRefreshing()) {
  return new Promise((resolve, reject) => {
    addToRefreshQueue({ resolve, reject, config: error.config });
  });
}

// 2. Start refresh
setIsRefreshing(true);
const newToken = await tryRefreshToken();

// 3. Handle refresh result
if (!newToken) {
  // Refresh failed → logout
  setIsRefreshing(false);
  processQueue(new Error("Refresh failed"), null);
  // ... logout logic
  return;
}

// 4. Process queue and retry
setIsRefreshing(false);
processQueue(null, newToken);
// ... retry original request
```

### Service Layer Pattern

Services in `src/services/` are thin wrappers around HTTP methods:

```typescript
import post from "../axios-methods/post";
import API_ROUTES from "@/shared/constants/request-urls";

export const login = async (payload: LOGIN_PAYLOAD) => {
  const { data }: LOGIN_RESPONSE = await post(API_ROUTES.LOGIN, payload);
  // Handle response (store tokens, etc.)
  return data;
};
```

## Testing

Tests are located alongside components in `tests/` directories:

- Unit tests for components
- Integration tests for services
- Vitest for test runner
- React Testing Library for component testing

## Common Issues & Solutions

### CORS Errors in Development

**Solution**: The Vite proxy automatically handles CORS. Ensure:

- `VITE_SERVER_URL` is set correctly
- Backend is running on the configured port
- Proxy is configured in `vite.config.ts`

### CORS Errors in Production

**Solution**: Enable credentials and configure backend CORS:

- Set `VITE_ENABLE_CREDENTIALS=true` in production `.env`
- Configure backend with proper CORS headers
- Ensure `Access-Control-Allow-Origin` is explicit (not `*`)

### Token Refresh Fails

**Possible causes:**

- Refresh token expired (user must login again)
- Refresh token revoked (user logged out)
- Backend not configured for token rotation
- Network connectivity issues

**Solution**: Check backend logs, verify refresh token endpoint, ensure cookies are being sent.

### Multiple Refresh Calls

**Solution**: The shared refresh token utility prevents this by:

- Checking `isRefreshing` state
- Queuing requests during refresh
- Processing queue after refresh completes
