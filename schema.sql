CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL CHECK ("role" IN ('ADMIN', 'STAFF', 'PASSENGER')),
    "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "airports" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "code" VARCHAR(10) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "flights" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "flightNumber" VARCHAR(50) UNIQUE NOT NULL,
    "departureAirportId" UUID REFERENCES "airports"("id") ON DELETE RESTRICT,
    "destinationAirportId" UUID REFERENCES "airports"("id") ON DELETE RESTRICT,
    "departureTime" TIMESTAMP NOT NULL,
    "arrivalTime" TIMESTAMP NOT NULL,
    "airline" VARCHAR(100) NOT NULL,
    "availableSeats" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(50) NOT NULL DEFAULT 'ON_TIME' CHECK ("status" IN ('ON_TIME', 'DELAYED', 'CANCELED'))
);

CREATE TABLE IF NOT EXISTS "passengers" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "name" VARCHAR(255) NOT NULL,
    "passportNumber" VARCHAR(100) UNIQUE NOT NULL,
    "nationality" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "staff" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "name" VARCHAR(255) NOT NULL,
    "employeeId" VARCHAR(100) UNIQUE NOT NULL,
    "role" VARCHAR(50) NOT NULL CHECK ("role" IN ('PILOT', 'CREW', 'GROUND_STAFF', 'SECURITY')),
    "assignedFlightId" UUID REFERENCES "flights"("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "bookings" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "passengerId" UUID NOT NULL REFERENCES "passengers"("id") ON DELETE CASCADE,
    "flightId" UUID NOT NULL REFERENCES "flights"("id") ON DELETE CASCADE,
    "seatNumber" VARCHAR(20) NOT NULL,
    "bookingDate" TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE("flightId", "seatNumber")
);

CREATE TABLE IF NOT EXISTS "baggages" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "passengerId" UUID NOT NULL REFERENCES "passengers"("id") ON DELETE CASCADE,
    "flightId" UUID NOT NULL REFERENCES "flights"("id") ON DELETE CASCADE,
    "tagNumber" VARCHAR(100) UNIQUE NOT NULL,
    "weight" DECIMAL(5, 2) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'CHECKED_IN' CHECK ("status" IN ('CHECKED_IN', 'IN_TRANSIT', 'ARRIVED', 'CLAIMED'))
);

CREATE INDEX IF NOT EXISTS "idx_flights_departure" ON "flights"("departureTime");
CREATE INDEX IF NOT EXISTS "idx_flights_destination" ON "flights"("destinationAirportId");
CREATE INDEX IF NOT EXISTS "idx_flights_airline" ON "flights"("airline");
CREATE INDEX IF NOT EXISTS "idx_bookings_flight" ON "bookings"("flightId");
CREATE INDEX IF NOT EXISTS "idx_baggages_passenger" ON "baggages"("passengerId");
