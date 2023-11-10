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
  rnumber SERIAL PRIMARY KEY,
  availability INT,
  rtype VARCHAR(20),
  rate INT,
  occupancy INT,
  guestID VARCHAR(10),
  hotelID VARCHAR(10),
  startDate DATE,
  endDate DATE,
  status VARCHAR(10)
);
