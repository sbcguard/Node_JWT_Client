# Node_JWT_Client

## About

This Node.js project provides a robust authentication and authorization system using JWT (JSON Web Tokens). The project is designed to handle role-based access control, ensuring that users have the appropriate permissions to access certain resources. This backend is built with Express.js and Prisma ORM for database interactions. Designed to work in tandem with Node_JWT_Host project, where the client controls role based access and the host provides JWTs.

### Features

- Cross-domain support.
- Error handling with custom exceptions.
- Logging of access attempts using Winston.
- Redirection of users to login and obtain JWT from host.
- Seeding the database with dummy data using Prisma.

## How to Run the Project Locally

### Prerequisites

- Node.js (v20 or higher)
- npm or pnpm or yarn
- MySQL (or any supported Prisma database, Serialized for DB2/IBMi)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sbcguard/Node_JWT_Client.git
   cd node_jwt_client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   pnpm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   DATABASE_URL="mysql://user:password@domain:port/mydb?schema=myschema"
   PORT = 3001
   JWT_SECRET=MySecret
   SECURE_ROOT=['/apps','/pages']
   REDIRECT_URL = 'http://localhost:3000'
   LOGIN_URI = '/login.html'
   UNAUTHORIZED_URI = '/unauthorized.html'
   JWT_SERVER=localhost
   JWT_SERVER_PORT=3000
   ```

4. **Set up the database:**

   Ensure that MySQL is running and a database is created. Then run:

   See Node_JWT_Host.

5. **Start the server:**

   ```bash
   npm run dev
   ```

   or

   ```bash
   pnpm run dev
   ```

   or

   ```bash
   yarn dev
   ```

   The server will be running at `http://localhost:3001`.

6. **Build the production server:**

   ```bash
   npm run build
   ```

7. **Start the production server:**

   ```bash
   npm run start
   ```

### Usage

1. **Attempt to access secure / unsecure pages:**

   Open a web browser and go to secure or unsecure page. If host is running you will be redirected to the login page. Else you will receive an error.

2. **Login or Sign-up on host to obtain JWT token:**

   Login in or click on the link to the sign-up page and create a new account how the JWT host service. Host will redirect back to the original page. If user has roles allowing access to the page, then will be able to view it, else they are redirected to unauthorized page.

### Logging

Winston is used for logging access attempts. Logs are written to files in the '/logs' directory:

- `stdout/YYYY-MM-DD.log`: General Logs
- `stderr/YYYY-MM-DD.log`: Error Logs

### Project Structure

- `src/`
  - `exceptions/`: Custom exception classes for error handling.
  - `logger/`: Winston logging of application errors and access attempts.
  - `middleware/`: Middleware functions for authentication and role checking.
  - `prisma/`: Prisma Client configurations.
  - `utils/`: Utility code segments.
- `public/`: HTML files for sample pages.
- `.env`: Environment variables.
- `prisma/`: Prisma configuration, migrations, and seed script.
