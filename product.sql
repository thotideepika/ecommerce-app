DELETE FROM products;
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- MOBILES
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('iPhone 15 Pro', 'Apple flagship', 134900, 15, 1, true, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', NOW()),
('iPhone 15', 'Latest iPhone', 79900, 20, 1, true, 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400', NOW()),
('Samsung Galaxy S24 Ultra', 'S-Pen flagship', 129999, 12, 1, true, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', NOW()),
('Samsung Galaxy S24', 'Compact flagship', 79999, 18, 1, true, 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400', NOW()),
('OnePlus 12', 'Snapdragon 8 Gen 3', 64999, 30, 1, true, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', NOW()),
('Google Pixel 8 Pro', 'AI camera', 106999, 15, 1, true, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', NOW()),
('Redmi Note 13 Pro', 'Budget king', 24999, 60, 1, true, 'https://images.unsplash.com/photo-1533228100845-08145b01de14?w=400', NOW()),
('Vivo V30 Pro', 'Zeiss camera', 41999, 30, 1, true, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400', NOW()),
('Oppo Reno 11', 'Portrait', 39999, 35, 1, true, 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400', NOW()),
('Nothing Phone 2', 'Glyph interface', 44999, 28, 1, true, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', NOW());

-- LAPTOPS
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('MacBook Air M3', 'Apple laptop', 114900, 10, 2, true, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', NOW()),
('MacBook Pro 14', 'Pro laptop', 194900, 8, 2, true, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400', NOW()),
('Dell XPS 15', 'Premium Windows', 149999, 8, 2, true, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', NOW()),
('HP Pavilion 15', 'Home laptop', 59999, 20, 2, true, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', NOW()),
('Lenovo Legion 5', 'Gaming RTX', 124999, 12, 2, true, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', NOW()),
('Asus ROG Strix G16', 'Gaming beast', 179999, 6, 2, true, 'https://images.unsplash.com/photo-1611078719198-49e93b40a6fb?w=400', NOW()),
('Acer Aspire 5', 'Student laptop', 44999, 35, 2, true, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', NOW()),
('MSI Katana 15', 'Gaming', 119990, 10, 2, true, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', NOW()),
('Razer Blade 15', 'Premium gaming', 249990, 5, 2, true, 'https://images.unsplash.com/photo-1611078719198-49e93b40a6fb?w=400', NOW()),
('Surface Laptop 5', 'Touch laptop', 118990, 10, 2, true, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', NOW());

-- CARS
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Maruti Swift', 'Compact hatch', 649000, 5, 3, true, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400', NOW()),
('Hyundai Creta', 'Popular SUV', 1150000, 8, 3, true, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400', NOW()),
('Tata Nexon EV', 'Electric SUV', 1499000, 10, 3, true, 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400', NOW()),
('Mahindra Thar', 'Off-road SUV', 1100000, 6, 3, true, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400', NOW()),
('Honda City', 'Premium sedan', 1250000, 7, 3, true, 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400', NOW()),
('Toyota Fortuner', 'Rugged SUV', 3500000, 4, 3, true, 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400', NOW()),
('Kia Seltos', 'Compact SUV', 1050000, 8, 3, true, 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400', NOW()),
('MG Hector', 'Feature SUV', 1399000, 6, 3, true, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400', NOW()),
('Renault Kwid', 'Budget car', 470000, 15, 3, true, 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400', NOW()),
('Skoda Slavia', 'Stylish sedan', 1150000, 10, 3, true, 'https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=400', NOW());

-- BIKES
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Royal Enfield Classic 350', 'Iconic cruiser', 195000, 15, 4, true, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400', NOW()),
('Royal Enfield Hunter 350', 'City cruiser', 150000, 20, 4, true, 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400', NOW()),
('Bajaj Pulsar NS200', 'Sporty bike', 145000, 20, 4, true, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400', NOW()),
('TVS Apache RTR 160', 'Racing bike', 120000, 25, 4, true, 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=400', NOW()),
('KTM Duke 390', 'Performance', 320000, 10, 4, true, 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=400', NOW()),
('Yamaha R15 V4', 'Sports bike', 185000, 12, 4, true, 'https://images.unsplash.com/photo-1571335746032-d86b74a29e90?w=400', NOW()),
('Hero Splendor Plus', 'Most-loved', 75000, 30, 4, true, 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400', NOW()),
('Honda Shine', 'Reliable', 80000, 28, 4, true, 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400', NOW()),
('TVS Jupiter', 'Scooter', 75000, 35, 4, true, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400', NOW()),
('Bajaj Chetak EV', 'Electric scooter', 120000, 20, 4, true, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400', NOW());

-- ELECTRONICS
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Sony Bravia 55 4K', 'Smart TV', 74999, 15, 5, true, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', NOW()),
('LG 1.5 Ton AC', 'Inverter', 42999, 20, 5, true, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', NOW()),
('Bose QC Headphones', 'Noise cancel', 29999, 30, 5, true, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', NOW()),
('Apple Watch Series 9', 'Smart watch', 41900, 25, 5, true, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400', NOW()),
('Canon EOS 200D', 'DSLR camera', 45999, 12, 5, true, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400', NOW()),
('JBL Flip 6', 'Speaker', 9999, 50, 5, true, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', NOW()),
('Echo Dot 5', 'Alexa speaker', 4499, 60, 5, true, 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400', NOW()),
('Dyson V15', 'Vacuum', 54990, 12, 5, true, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', NOW()),
('Panasonic Microwave', 'Convection', 15999, 25, 5, true, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400', NOW()),
('HP LaserJet Printer', 'Mono printer', 15999, 22, 5, true, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400', NOW());

-- FASHION
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Cotton T-Shirt', 'Everyday tee', 499, 100, 6, true, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', NOW()),
('Denim Jeans', 'Blue jeans', 1499, 40, 6, true, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', NOW()),
('Leather Jacket', 'Genuine leather', 4999, 25, 6, true, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', NOW()),
('Running Shoes', 'Athletic', 2999, 45, 6, true, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', NOW()),
('Floral Dress', 'Summer dress', 1299, 60, 6, true, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', NOW()),
('Aviator Sunglasses', 'Polarized', 799, 80, 6, true, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', NOW()),
('Silk Saree', 'Traditional', 4999, 30, 6, true, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', NOW()),
('Leather Wallet', 'Bi-fold', 799, 100, 6, true, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', NOW()),
('Wool Cap', 'Winter cap', 399, 75, 6, true, 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400', NOW()),
('Backpack', 'Laptop bag', 1999, 50, 6, true, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', NOW());

-- BOOKS
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Clean Code', 'Software book', 799, 25, 7, true, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', NOW()),
('Atomic Habits', 'Habits', 599, 50, 7, true, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', NOW()),
('Sapiens', 'History', 699, 35, 7, true, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', NOW()),
('Rich Dad Poor Dad', 'Finance', 299, 60, 7, true, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', NOW()),
('The Alchemist', 'Novel', 249, 80, 7, true, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', NOW()),
('Ikigai', 'Japanese way', 349, 55, 7, true, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', NOW()),
('Deep Work', 'Focus', 449, 50, 7, true, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', NOW()),
('Zero to One', 'Startups', 499, 40, 7, true, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', NOW()),
('Educated', 'Memoir', 449, 35, 7, true, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', NOW()),
('Becoming', 'Michelle Obama', 599, 30, 7, true, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', NOW());

-- HOME
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Desk Lamp', 'LED dimmer', 1299, 40, 8, true, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', NOW()),
('Table Lamp', 'Bedside lamp', 999, 50, 8, true, 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=400', NOW()),
('Coffee Mug', 'Ceramic 350ml', 299, 60, 8, true, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', NOW()),
('Wall Clock', 'Minimalist', 799, 30, 8, true, 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400', NOW()),
('Plant Pot', 'Ceramic', 399, 70, 8, true, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', NOW()),
('Throw Pillow', 'Decorative', 599, 60, 8, true, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', NOW()),
('Bedsheet Set', 'King size', 1499, 50, 8, true, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', NOW()),
('Chef Knife', 'Steel', 899, 50, 8, true, 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400', NOW()),
('Nonstick Pan', 'Cookware', 1299, 60, 8, true, 'https://images.unsplash.com/photo-1584990347449-a2d4c2c2649d?w=400', NOW()),
('Wall Shelf', 'Floating', 1099, 40, 8, true, 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=400', NOW());

-- SPORTS
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Basketball', 'Size 7', 1199, 25, 9, true, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400', NOW()),
('Football', 'FIFA approved', 999, 35, 9, true, 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=400', NOW()),
('Cricket Bat', 'English willow', 4999, 20, 9, true, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', NOW()),
('Cricket Ball', 'Leather', 599, 60, 9, true, 'https://images.unsplash.com/photo-1593766788649-9b3ec5a65b3b?w=400', NOW()),
('Tennis Racket', 'Graphite', 2499, 25, 9, true, 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400', NOW()),
('Badminton Racket', 'Carbon fiber', 1799, 40, 9, true, 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400', NOW()),
('Yoga Mat', 'Non-slip', 899, 40, 9, true, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', NOW()),
('Dumbbells Set', 'Adjustable', 2999, 30, 9, true, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', NOW()),
('Boxing Gloves', '14oz', 2199, 28, 9, true, 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400', NOW()),
('Gym Bag', 'Duffel', 1499, 50, 9, true, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', NOW());

-- BEAUTY
INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Face Wash', 'Gentle cleanser', 349, 100, 10, true, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', NOW()),
('Moisturizer', 'Hydrating', 599, 80, 10, true, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400', NOW()),
('Perfume', 'Long-lasting', 2499, 40, 10, true, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', NOW()),
('Lip Balm', 'SPF 15', 199, 150, 10, true, 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=400', NOW()),
('Sunscreen SPF50', 'Broad spectrum', 599, 80, 10, true, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', NOW()),
('Foundation', 'Full coverage', 899, 60, 10, true, 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=400', NOW()),
('Eye Liner', 'Waterproof', 349, 100, 10, true, 'https://images.unsplash.com/photo-1631214540242-4b6d4c72c4a5?w=400', NOW()),
('Nail Polish Set', '6 shades', 799, 50, 10, true, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', NOW()),
('Hair Oil', 'Coconut', 299, 90, 10, true, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', NOW()),
('Shampoo', 'Herbal', 449, 75, 10, true, 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400', NOW());