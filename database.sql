CREATE DATABASE hodlinfo;

CREATE TABLE cryptoList (
    id SERIAL PRIMARY KEY,
     name VARCHAR(255),
     last VARCHAR(255),
     sell REAL,
     buy_price REAL,
     volume  REAL,
     base_unit VARCHAR(255),

);

