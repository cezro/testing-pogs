-- migrate:up
ALTER TABLE users
ADD COLUMN sub_id VARCHAR(255) UNIQUE NOT NULL

-- migrate:down
ALTER TABLE sub_id
DROP COLUMN sub_id;
