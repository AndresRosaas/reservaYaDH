-- ============================================
-- 1. FEATURES
-- ============================================
MERGE INTO features (name, icon) KEY(name) VALUES
('WiFi Gratis', 'wifi'),
('Estacionamiento', 'car'),
('Aire Acondicionado', 'airVent'),
('Cocina Equipada', 'utensils'),
('Pileta', 'waves');

-- ============================================
-- 2. CATEGORIES
-- ============================================
MERGE INTO categories (name, description) KEY(name) VALUES
('Hoteles', 'Alojamiento confortable con servicios completos'),
('Departamentos', 'Espacios amplios para estadías prolongadas'),
('Autos de Lujo', 'Vehículos premium para tus viajes'),
('Cabañas', 'Alojamientos rústicos rodeados de naturaleza');

-- ============================================
-- 3. USERS
-- ============================================
MERGE INTO users (id, email, name, last_name, password, role) KEY(email) VALUES
(1, 'admin@test.com', 'Admin', 'Sistema', '$2b$12$AOmOGbB8PAY0Hk9JA8etOOAyMtnQL2jmVUqGQz4.st9hpjzAVHILi', 'ADMIN'),
(2, 'user@test.com', 'Juan', 'Pérez', '$2b$12$yFHPA/1/R8QJlrm7cHDsh.gbBU2TP1M2LO3rWEv.gHEt663NVUKJ6', 'USER'),
(3, 'maria@test.com', 'María', 'González', '$2b$12$RuwYdj5oXr7rPg26mCY0TefB9jRLML4L3EOo31xh/vhK4zRWhSaXq', 'USER');
--passwords: Nombre + 123!
ALTER TABLE users ALTER COLUMN id RESTART WITH 4;

-- ============================================
-- 4. PRODUCTS (Originales + Nuevos)
-- ============================================
MERGE INTO product (name, description, location, price, currency, policies, category_id)
KEY(name) VALUES
-- Existentes
(
 'Hotel Paradise',
 'Hotel 5 estrellas en zona céntrica con todas las comodidades. Desayuno incluido, spa y gimnasio.',
 'Buenos Aires, Argentina',
 15000.00, 'ARS',
 'Check-in: 14:00 hs. Check-out: 10:00 hs. No se permiten mascotas. Cancelación gratuita hasta 48hs antes.',
 (SELECT id FROM categories WHERE name = 'Hoteles')
),
(
 'Depto Premium Centro',
 'Departamento moderno con vista panorámica. Completamente amoblado y equipado para estadías largas.',
 'Córdoba, Argentina',
 8500.00, 'ARS',
 'Check-in: 15:00 hs. Check-out: 11:00 hs. Se permiten mascotas pequeñas. Depósito en garantía requerido.',
 (SELECT id FROM categories WHERE name = 'Departamentos')
),
(
 'Mercedes-Benz Clase E',
 'Auto ejecutivo de alta gama, ideal para viajes de negocios. Seguro todo riesgo incluido.',
 'Rosario, Argentina',
 25000.00, 'ARS',
 'Combustible no incluido. Conductor mayor de 25 años. Licencia vigente requerida. Kilometraje ilimitado.',
 (SELECT id FROM categories WHERE name = 'Autos de Lujo')
),

-- Nuevos
(
 'Hotel Bosque Andino',
 'Hotel boutique en zona de montaña con spa, restaurante y habitaciones con vista al bosque.',
 'San Carlos de Bariloche, Argentina',
 19500.00, 'ARS',
 'Check-in 14:00. Check-out 10:00. No mascotas. Cancelación gratuita hasta 72hs.',
 (SELECT id FROM categories WHERE name = 'Hoteles')
),
(
 'Loft Moderno Riverside',
 'Departamento industrial moderno, amplio, luminoso y equipado para estadías largas.',
 'Tigre, Buenos Aires, Argentina',
 9800.00, 'ARS',
 'Check-in 15:00. Check-out 11:00. Se permiten mascotas pequeñas. Garantía requerida.',
 (SELECT id FROM categories WHERE name = 'Departamentos')
),
(
 'Audi A6 Quattro',
 'Auto premium con tracción integral, asistencia avanzada y uso ilimitado de km.',
 'Mendoza, Argentina',
 33000.00, 'ARS',
 'Seguro full. Mayores de 25 años. Licencia válida. Combustible no incluido.',
 (SELECT id FROM categories WHERE name = 'Autos de Lujo')
),
(
 'Cabaña Río Claro',
 'Cabaña de madera junto al río, con parrilla, salamandra y contacto directo con la naturaleza.',
 'Villa La Angostura, Argentina',
 11500.00, 'ARS',
 'Check-in 14:00. Check-out 10:00. Mascotas permitidas.',
 (SELECT id FROM categories WHERE name = 'Cabañas')
);

-- ============================================
-- 5. PRODUCT IMAGES
-- ============================================
MERGE INTO product_images (product_id, image_url) KEY(image_url) VALUES
-- Hotel Paradise
((SELECT id FROM product WHERE name = 'Hotel Paradise'), 'https://images.unsplash.com/photo-1566073771259-6a8506099945'),
((SELECT id FROM product WHERE name = 'Hotel Paradise'), 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'),

-- Depto Premium Centro
((SELECT id FROM product WHERE name = 'Depto Premium Centro'), 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),

-- Mercedes-Benz Clase E
((SELECT id FROM product WHERE name = 'Mercedes-Benz Clase E'), 'https://images.unsplash.com/photo-1571224237891-bfb45fcf0920'),
((SELECT id FROM product WHERE name = 'Mercedes-Benz Clase E'), 'https://images.unsplash.com/photo-1639060016125-dfde31ca1af8'),

-- Hotel Bosque Andino
((SELECT id FROM product WHERE name = 'Hotel Bosque Andino'), 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'),
((SELECT id FROM product WHERE name = 'Hotel Bosque Andino'), 'https://images.unsplash.com/photo-1590490360182-c33d57733427'),
((SELECT id FROM product WHERE name = 'Hotel Bosque Andino'), 'https://images.unsplash.com/photo-1583947581926-69b7fcf508fe'),

-- Audi A6 Quattro (auto)
((SELECT id FROM product WHERE name = 'Audi A6 Quattro'), 'https://images.unsplash.com/photo-1656335889409-808b4119393f'),  -- interior coche
((SELECT id FROM product WHERE name = 'Audi A6 Quattro'), 'https://images.unsplash.com/photo-1657274259219-75e207b57873'),  -- volante coche

-- Loft Moderno Riverside
((SELECT id FROM product WHERE name = 'Loft Moderno Riverside'), 'https://plus.unsplash.com/premium_photo-1661964071594-0d5ea642833b
'),  -- sala moderna
((SELECT id FROM product WHERE name = 'Loft Moderno Riverside'), 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f
'),  -- comedor / living de loft

-- Cabaña Río Claro
((SELECT id FROM product WHERE name = 'Cabaña Río Claro'), 'https://images.unsplash.com/photo-1482192505345-5655af888cc4
'),  -- cabaña
((SELECT id FROM product WHERE name = 'Cabaña Río Claro'), 'https://www.interpatagonia.com/plantillas/grandes/2165-00Gr.jpg');  -- otra vista rústica
-- ============================================
-- 6. PRODUCT FEATURES
-- ============================================
MERGE INTO product_features (product_id, feature_id)
KEY(product_id, feature_id) VALUES
-- Hotel Paradise
((SELECT id FROM product WHERE name = 'Hotel Paradise'), (SELECT id FROM features WHERE name = 'WiFi Gratis')),
((SELECT id FROM product WHERE name = 'Hotel Paradise'), (SELECT id FROM features WHERE name = 'Estacionamiento')),
((SELECT id FROM product WHERE name = 'Hotel Paradise'), (SELECT id FROM features WHERE name = 'Aire Acondicionado')),
((SELECT id FROM product WHERE name = 'Hotel Paradise'), (SELECT id FROM features WHERE name = 'Pileta')),

-- Depto Premium Centro
((SELECT id FROM product WHERE name = 'Depto Premium Centro'), (SELECT id FROM features WHERE name = 'WiFi Gratis')),
((SELECT id FROM product WHERE name = 'Depto Premium Centro'), (SELECT id FROM features WHERE name = 'Aire Acondicionado')),
((SELECT id FROM product WHERE name = 'Depto Premium Centro'), (SELECT id FROM features WHERE name = 'Cocina Equipada')),

-- Mercedes Clase E
((SELECT id FROM product WHERE name = 'Mercedes-Benz Clase E'), (SELECT id FROM features WHERE name = 'Aire Acondicionado')),

-- Hotel Bosque Andino
((SELECT id FROM product WHERE name = 'Hotel Bosque Andino'), (SELECT id FROM features WHERE name = 'WiFi Gratis')),
((SELECT id FROM product WHERE name = 'Hotel Bosque Andino'), (SELECT id FROM features WHERE name = 'Aire Acondicionado')),
((SELECT id FROM product WHERE name = 'Hotel Bosque Andino'), (SELECT id FROM features WHERE name = 'Estacionamiento')),
((SELECT id FROM product WHERE name = 'Hotel Bosque Andino'), (SELECT id FROM features WHERE name = 'Pileta')),

-- Loft Moderno Riverside
((SELECT id FROM product WHERE name = 'Loft Moderno Riverside'), (SELECT id FROM features WHERE name = 'WiFi Gratis')),
((SELECT id FROM product WHERE name = 'Loft Moderno Riverside'), (SELECT id FROM features WHERE name = 'Aire Acondicionado')),
((SELECT id FROM product WHERE name = 'Loft Moderno Riverside'), (SELECT id FROM features WHERE name = 'Cocina Equipada')),

-- Audi A6 Quattro
((SELECT id FROM product WHERE name = 'Audi A6 Quattro'), (SELECT id FROM features WHERE name = 'Aire Acondicionado')),
((SELECT id FROM product WHERE name = 'Audi A6 Quattro'), (SELECT id FROM features WHERE name = 'Estacionamiento')),

-- Cabaña Río Claro
((SELECT id FROM product WHERE name = 'Cabaña Río Claro'), (SELECT id FROM features WHERE name = 'WiFi Gratis')),
((SELECT id FROM product WHERE name = 'Cabaña Río Claro'), (SELECT id FROM features WHERE name = 'Cocina Equipada')),
((SELECT id FROM product WHERE name = 'Cabaña Río Claro'), (SELECT id FROM features WHERE name = 'Estacionamiento'));

-- ============================================
-- 7. RESERVATIONS
-- ============================================
MERGE INTO reservations (user_id, product_id, start_date, end_date, reservation_date, status, total_price, currency)
KEY(user_id, product_id, start_date) VALUES
((SELECT id FROM users WHERE email = 'user@test.com'),
 (SELECT id FROM product WHERE name = 'Hotel Paradise'),
 '2025-01-10', '2025-01-15', '2024-12-20T09:00:00', 'CONFIRMED', 75000.00, 'ARS'),

((SELECT id FROM users WHERE email = 'user@test.com'),
 (SELECT id FROM product WHERE name = 'Hotel Bosque Andino'),
 '2025-03-10', '2025-03-15', '2025-02-20T10:30:00', 'CONFIRMED', 97500.00, 'ARS'),

((SELECT id FROM users WHERE email = 'maria@test.com'),
 (SELECT id FROM product WHERE name = 'Loft Moderno Riverside'),
 '2025-05-01', '2025-05-06', '2025-04-10T12:00:00', 'CONFIRMED', 49000.00, 'ARS'),

((SELECT id FROM users WHERE email = 'user@test.com'),
 (SELECT id FROM product WHERE name = 'Audi A6 Quattro'),
 '2025-04-18', '2025-04-20', '2025-03-15T09:20:00', 'PENDING', 66000.00, 'ARS');

-- ============================================
-- 8. REVIEWS
-- ============================================
MERGE INTO reviews (user_id, product_id, rating, comment, created_at)
KEY(user_id, product_id) VALUES
((SELECT id FROM users WHERE email = 'user@test.com'),
 (SELECT id FROM product WHERE name = 'Hotel Bosque Andino'),
 5,
 'Hermoso hotel, vista increíble y desayuno espectacular.',
 '2025-03-20T10:00:00'),

((SELECT id FROM users WHERE email = 'maria@test.com'),
 (SELECT id FROM product WHERE name = 'Loft Moderno Riverside'),
 4,
 'Súper equipado y moderno, volvería.',
 '2025-05-08T14:15:00'),

((SELECT id FROM users WHERE email = 'maria@test.com'),
 (SELECT id FROM product WHERE name = 'Audi A6 Quattro'),
 5,
 'Auto impecable, experiencia premium total.',
 '2025-04-22T16:40:00');

-- ============================================
-- 9. USER FAVORITES
-- ============================================
INSERT INTO user_favorites (user_id, product_id) VALUES
((SELECT id FROM users WHERE email = 'user@test.com'),
 (SELECT id FROM product WHERE name = 'Hotel Bosque Andino')),

((SELECT id FROM users WHERE email = 'user@test.com'),
 (SELECT id FROM product WHERE name = 'Audi A6 Quattro')),

((SELECT id FROM users WHERE email = 'maria@test.com'),
 (SELECT id FROM product WHERE name = 'Loft Moderno Riverside')),

((SELECT id FROM users WHERE email = 'maria@test.com'),
 (SELECT id FROM product WHERE name = 'Hotel Paradise'));