-- migrate:up
ALTER TABLE users
ADD COLUMN balance DECIMAL(10, 2);

-- migrate:down
ALTER TABLE users
DROP COLUMN balance;