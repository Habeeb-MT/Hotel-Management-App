CREATE DATABASE hotel;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20),
    password VARCHAR(20),
    role VARCHAR(10)
);


CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  user_id INT,
  login_time TIMESTAMPTZ DEFAULT NOW(),
  logout_time TIMESTAMPTZ
);