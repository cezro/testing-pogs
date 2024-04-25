-- migrate:up
CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  sub_id VARCHAR(255) REFERENCES users(sub_id),
  pog_id INTEGER REFERENCES pogs(id),
  quantity INTEGER NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE portfolio;
