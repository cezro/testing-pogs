-- migrate:up
CREATE TABLE pog_values (
  id SERIAL PRIMARY KEY,
  pog_id INTEGER REFERENCES pogs(id),
  value DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE pog_values