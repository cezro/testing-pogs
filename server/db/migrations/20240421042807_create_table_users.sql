-- migrate:up
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    sub_id VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users