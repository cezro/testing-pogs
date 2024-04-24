-- migrate:up
ALTER TABLE users
DROP COLUMN password

-- migrate:down