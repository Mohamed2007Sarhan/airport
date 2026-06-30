# Airport Management System (GraphQL API)

A production-grade GraphQL API for an Airport Management System built with **NestJS**, **TypeORM**, and **BullMQ**. This project is designed to manage flights, passenger registrations, bookings (with atomic seat allocations), airport staff, and baggage tracking, with real-time flight status subscriptions.

---

## 🏗️ Architecture & Features

The project is structured following NestJS modular patterns. Key engineering patterns implemented include:

1. **Atomic Booking & Seat Allocation**: To prevent race conditions and overbooking, the booking process uses a database transaction combined with a **Pessimistic Write Lock (`SELECT FOR UPDATE`)** on the Flight table. This guarantees that duplicate seat assignments on the same flight are physically impossible.
2. **N+1 Query Prevention (DataLoader)**: Leverages a request-scoped `AirportLoader` to batch and cache airport lookups. When querying flights, the system resolves departure/destination airports in a single SQL query rather than `N` sequential queries.
3. **Background Job Processing (BullMQ)**: Booking confirmations and flight delay notifications are offloaded asynchronously to a Redis-backed queue. This keeps the GraphQL response times fast and handles failures gracefully with retries.
4. **Real-time Subscriptions**: Clients can subscribe to `flightStatusUpdated` events to receive instant notifications via WebSockets when flight statuses change.
5. **Role-Based Guards**: Clean, decorator-driven role checks (`@Roles()`) verify whether the authenticated passenger, staff, or admin has the privilege to execute mutations or queries.

---

## 📁 Directory Structure

```
src/
├── auth/          # Authentication, user signup/login, JWT guards & strategies
├── airport/       # Airport CRUD & AirportLoader (N+1 optimizer)
├── flight/        # Flight CRUD, paginated queries, filters, and subscriptions
├── passenger/     # Passenger profile queries
├── staff/         # Staff profiles and flight assignments
├── booking/       # Booking transactions and seat allocation locking
├── baggage/       # Baggage registration and passenger tracking
├── queue/         # BullMQ queue & background worker for email/SMS mock alerts
├── app.module.ts  # Application assembly & database configuration
└── main.ts        # Bootstrap with global validation pipes
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v14.8.0+ / v16+ recommended)
- **PostgreSQL**
- **Redis** (Required for BullMQ & GraphQL Subscriptions)

### 1. Database Setup
1. Create a database named `airport_management` in your PostgreSQL instance.
2. Execute the queries inside [schema.sql](./schema.sql) to generate the tables and constraints (or let TypeORM synchronize them automatically).

### 2. Environment Configurations
Rename or edit the `.env` file in the project root:
```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=airport_management

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h

REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Installation & Run
Run the following commands in your project root:
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start in development mode (with hot-reload)
npm run start:dev
```

Once started, the GraphQL Playground is available at:
👉 **[http://localhost:3000/graphql](http://localhost:3000/graphql)**

---

## 🧪 Testing the API

To make manual testing easy, we have provided a pre-configured [queries.graphql](./queries.graphql) file in the root directory.

Simply open the GraphQL Playground and use the queries in order:
1. **Seed Admin**: Run `SeedAdmin` to create your first administrative user.
2. **Login**: Run `Login` using the admin credentials to obtain a JWT token.
3. **Authorize**: Paste the token into the **HTTP Headers** section in the Playground:
   ```json
   {
     "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
   }
   ```
4. **Mutate & Query**: Test airport registration, flight scheduling, passenger bookings, staff assignments, and real-time subscriptions!
