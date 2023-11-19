CREATE DATABASE hotel;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20),
    password VARCHAR(64),
    role VARCHAR(10)
);


-- CREATE TABLE logs (
--   id SERIAL PRIMARY KEY,
--   user_id INT,
--   login_time TIMESTAMPTZ DEFAULT NOW(),
--   logout_time TIMESTAMPTZ
-- );

CREATE TABLE rooms (
  rnumber VARCHAR(10) PRIMARY KEY,
  availability INT,
  rtype VARCHAR(20),
  rate VARCHAR(5),
  occupancy VARCHAR(5),
  guestID VARCHAR(10),
  hotelID VARCHAR(10),
  startDate DATE,
  endDate DATE,
  status VARCHAR(10),
  description VARCHAR(100),
  pic VARCHAR(30)
);

CREATE TABLE service (
  serviceId SERIAL PRIMARY KEY,
  charge INT, 
  serviceType VARCHAR(20),
  guestID VARCHAR(10),
  adminID VARCHAR(10),
  roomID VARCHAR(10),
  startDate DATE,
  endDate DATE,
  status VARCHAR(10)
);