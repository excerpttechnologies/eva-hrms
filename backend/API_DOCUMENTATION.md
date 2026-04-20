# HRMS Backend API Documentation

## Overview

The HRMS Backend is a comprehensive Express.js REST API built with TypeScript, designed to support all Human Resource Management System functionalities. It includes features for employee management, recruitment, payroll, attendance, leave management, performance reviews, training, compliance, and more.

## Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   ├── database/            # Database connection & setup
│   ├── middleware/          # Express middleware
│   ├── models/              # Database models (Mongoose)
│   ├── services/            # Business logic layer
│   ├── controllers/         # Request handlers
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript types
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── dist/                    # Compiled JavaScript
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Installation

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- MongoDB >= 5.0
- Redis (optional, for caching)

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build TypeScript:**
   ```bash
   npm run build
   ```

5. **Start the server:**
   ```bash
   # Development with hot reload
   npm run dev:watch
   
   # Production
   npm start
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/change-password/:userId` - Change password

### Employees
- `GET /api/v1/employees` - List all employees
- `POST /api/v1/employees` - Create new employee
- `GET /api/v1/employees/:id` - Get employee details
- `PUT /api/v1/employees/:id` - Update employee
- `DELETE /api/v1/employees/:id` - Delete employee
- `GET /api/v1/employees/stats` - Get employee statistics

### Recruitment
- `GET /api/v1/recruitment` - List candidates
- `POST /api/v1/recruitment` - Create candidate
- `GET /api/v1/recruitment/:id` - Get candidate details
- `PUT /api/v1/recruitment/:id/stage` - Update candidate stage
- `GET /api/v1/recruitment/stats` - Get recruitment statistics

### Payroll
- `POST /api/v1/payroll/calculate` - Calculate payroll
- `GET /api/v1/payroll` - List payroll records
- `POST /api/v1/payroll` - Create payroll record
- `PUT /api/v1/payroll/:id/approve` - Approve payroll

### Attendance
- `POST /api/v1/attendance/check-in` - Check in
- `POST /api/v1/attendance/check-out` - Check out
- `GET /api/v1/attendance` - Get attendance records
- `GET /api/v1/attendance/stats` - Get attendance stats

### Leave Management
- `POST /api/v1/leave` - Request leave
- `GET /api/v1/leave` - Get leave requests
- `GET /api/v1/leave/balance` - Get leave balance
- `PUT /api/v1/leave/:id/approve` - Approve leave
- `PUT /api/v1/leave/:id/reject` - Reject leave

### Projects
- `GET /api/v1/projects` - List projects
- `POST /api/v1/projects` - Create project
- `GET /api/v1/projects/:id` - Get project details
- `PUT /api/v1/projects/:id` - Update project
- `PUT /api/v1/projects/:id/status` - Update status
- `POST /api/v1/projects/:id/team` - Assign team

### Expenses
- `POST /api/v1/expenses` - Submit expense
- `GET /api/v1/expenses` - List expenses
- `GET /api/v1/expenses/:id` - Get expense details
- `PUT /api/v1/expenses/:id/approve` - Approve expense
- `PUT /api/v1/expenses/:id/reject` - Reject expense

### Performance
- `GET /api/v1/performance` - Get reviews
- `POST /api/v1/performance` - Create review
- `PUT /api/v1/performance/:id/submit` - Submit review
- `GET /api/v1/performance/goals` - Get goals
- `POST /api/v1/performance/goals` - Set goals

### Training
- `GET /api/v1/training` - List programs
- `POST /api/v1/training` - Create program
- `POST /api/v1/training/:programId/enroll` - Enroll employees
- `PUT /api/v1/training/:enrollmentId/complete` - Complete training

### Compliance
- `GET /api/v1/compliance/policies` - List policies
- `POST /api/v1/compliance/policies` - Create policy
- `POST /api/v1/compliance/policies/:policyId/acknowledge` - Acknowledge policy
- `GET /api/v1/compliance/policies/:policyId/status` - Check acknowledgment status
- `POST /api/v1/compliance/audits` - Create audit

### Documents
- `POST /api/v1/documents/upload` - Upload document
- `GET /api/v1/documents` - List documents
- `GET /api/v1/documents/:id/download` - Download document
- `DELETE /api/v1/documents/:id` - Delete document
- `POST /api/v1/documents/:id/request-signature` - Request signature

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

## Development

### Available Commands

```bash
# Start development server with hot reload
npm run dev:watch

# Build for production
npm run build

# Run production build
npm start

# Run tests
npm test

# Watch tests
npm test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Environment Variables

See `.env.example` for all available configuration options.

## Database

This project uses MongoDB with Mongoose ODM. Models are located in `src/models/`.

### Connection

Database connection is established in `src/database/connection.ts`. Update the connection URI in `.env` file.

## Middleware

Key middleware:
- **Authentication** - JWT verification
- **Authorization** - Role-based access control
- **Error Handler** - Global error handling
- **Request Logger** - Request/response logging
- **CORS** - Cross-Origin Resource Sharing

## Security

- Passwords hashed with bcryptjs
- JWT tokens for authentication
- CORS enabled with configuration
- Helmet.js for security headers
- Rate limiting on sensitive endpoints
- Request validation with Joi

## Testing

Run the test suite:

```bash
npm test
```

## Deployment

### Build for production:

```bash
npm run build
```

### Run in production:

```bash
NODE_ENV=production npm start
```

### Docker (optional):

```bash
docker build -t hrms-backend .
docker run -p 5000:5000 hrms-backend
```

## Logging

Logs are written to `./logs/` directory and console. Configure logging level in `.env`:

```
LOG_LEVEL=info
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT
