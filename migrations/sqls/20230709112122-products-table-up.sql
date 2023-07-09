CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_price NUMERIC(10,2) NOT NULL,
  product_name VARCHAR(64) NOT NULL UNIQUE
);
