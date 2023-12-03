CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(20),
    email VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(64),
    phone VARCHAR(10),
    state VARCHAR(20),
    city VARCHAR(20),
    pin VARCHAR(6),
    role VARCHAR(10)
);


CREATE TABLE rooms (
  rnumber VARCHAR(10) PRIMARY KEY NOT NULL UNIQUE,
  rtype VARCHAR(20),
  rate VARCHAR(5),
  occupancy VARCHAR(5),
  description VARCHAR(100),
  pic VARCHAR(15)
);


CREATE TABLE reserve (
  reserveID SERIAL PRIMARY KEY NOT NULL,
  rnumber VARCHAR(10),
  guestID INT,
  startDate DATE,
  endDate DATE,
  charge VARCHAR(5),
  status VARCHAR(10),
  FOREIGN KEY (rnumber) REFERENCES rooms(rnumber) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (guestID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE service(
  serviceId SERIAL PRIMARY KEY NOT NULL,
  charge INT, 
  serviceType VARCHAR(20),
  guestID INT,
  rnumber VARCHAR(10),
  status VARCHAR(10),
  FOREIGN KEY (rnumber) REFERENCES rooms(rnumber) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (guestID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE invoice (
  invoiceID SERIAL PRIMARY KEY,
  date DATE,
  guestID INT,
  amount INT, 
  pMethod VARCHAR(20),
  cardNumber VARCHAR(10),
  upiID VARCHAR(10),
  bAdress VARCHAR(30),
  FOREIGN KEY (guestID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE occupants (
  guestId INT,
  serviceId INT,
  oName VARCHAR(20),
  PRIMARY KEY(guestID, serviceId, oName),
  FOREIGN KEY (guestID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (serviceId) REFERENCES reserve(reserveID) ON DELETE CASCADE ON UPDATE CASCADE
);
