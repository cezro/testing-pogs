-- migrate:up
CREATE TABLE pogs (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(150) NOT NULL,
  ticker_symbol VARCHAR(10) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  color VARCHAR(30) NOT NULL
);

-- migrate:down
DROP TABLE pogs