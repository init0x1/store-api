CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE ordered_products (
  ordered_products_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID DEFAULT uuid_generate_v4() NOT NULL,
  order_id UUID DEFAULT uuid_generate_v4() NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  quantity INT NOT NULL
);
