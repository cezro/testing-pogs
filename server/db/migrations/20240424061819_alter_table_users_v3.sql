-- migrate:up
ALTER TABLE users
ADD COLUMN name VARCHAR(255)

-- migrate:down