-- Admin user (password: admin123)
INSERT INTO users (username, email, password, role)
SELECT 'admin', 'admin@shop.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='admin');

-- Customer (password: password123)
INSERT INTO users (username, email, password, role)
SELECT 'customer1', 'customer1@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'CUSTOMER'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='customer1');

-- Categories
INSERT INTO categories (name) SELECT 'Electronics' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name='Electronics');
INSERT INTO categories (name) SELECT 'Clothing' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name='Clothing');
INSERT INTO categories (name) SELECT 'Books' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name='Books');
INSERT INTO categories (name) SELECT 'Home' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name='Home');

-- Products
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url)
SELECT 'Wireless Headphones', 'Premium noise-cancelling headphones', 2999.00, 50,
       (SELECT id FROM categories WHERE name='Electronics'), true,
       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Wireless Headphones');

INSERT INTO products (name, description, price, stock, category_id, is_active, image_url)
SELECT 'Smart Watch', 'Fitness tracking smart watch', 4999.00, 30,
       (SELECT id FROM categories WHERE name='Electronics'), true,
       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Smart Watch');

INSERT INTO products (name, description, price, stock, category_id, is_active, image_url)
SELECT 'Cotton T-Shirt', 'Comfortable everyday cotton t-shirt', 499.00, 100,
       (SELECT id FROM categories WHERE name='Clothing'), true,
       'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Cotton T-Shirt');

INSERT INTO products (name, description, price, stock, category_id, is_active, image_url)
SELECT 'Denim Jeans', 'Classic blue denim jeans', 1499.00, 40,
       (SELECT id FROM categories WHERE name='Clothing'), true,
       'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Denim Jeans');

INSERT INTO products (name, description, price, stock, category_id, is_active, image_url)
SELECT 'Clean Code Book', 'A handbook of agile software craftsmanship', 799.00, 25,
       (SELECT id FROM categories WHERE name='Books'), true,
       'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Clean Code Book');

INSERT INTO products (name, description, price, stock, category_id, is_active, image_url)
SELECT 'Coffee Mug', 'Ceramic coffee mug 350ml', 299.00, 60,
       (SELECT id FROM categories WHERE name='Home'), true,
       'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Coffee Mug');