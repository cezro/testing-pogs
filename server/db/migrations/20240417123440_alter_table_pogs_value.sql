-- migrate:up
ALTER TABLE pog_values
ADD COLUMN prev_value DECIMAL(10, 2);

-- migrate:down
ALTER TABLE pog_values
DROP COLUMN prev_value;
