CREATE DATABASE hotel;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20),
    password VARCHAR(64),
    role VARCHAR(10)
);


CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  user_id INT,
  login_time TIMESTAMPTZ DEFAULT NOW(),
  logout_time TIMESTAMPTZ
);

CREATE TABLE rooms (
  rnumber VARCHAR(20) PRIMARY KEY,
  availability INT,
  rtype VARCHAR(20),
  rate VARCHAR(5),
  occupancy VARCHAR(5),
  guestID VARCHAR(10),
  hotelID VARCHAR(10),
  startDate DATE,
  endDate DATE,
  status VARCHAR(10),
  pic BYTEA
);
