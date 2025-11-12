-- ============================================
-- 1. FEATURES (Características)
-- ============================================
MERGE INTO features (name, icon) KEY(name) VALUES
('WiFi Gratis', 'wifi'),
('Estacionamiento', 'car'),
('Aire Acondicionado', 'airVent'),
('Cocina Equipada', 'utensils'),
('Pileta', 'waves');

-- ============================================
-- 2. CATEGORIES (Categorías)
-- ============================================
MERGE INTO categories (name, description) KEY(name) VALUES
('Hoteles', 'Alojamiento confortable con servicios completos'),
('Departamentos', 'Espacios amplios para estadías prolongadas'),
('Autos de Lujo', 'Vehículos premium para tus viajes');

-- ============================================
-- 3. USUARIOS (Tabla: users)
-- ============================================
MERGE INTO users (email, name, last_name, password, role) KEY(email) VALUES
('admin@test.com', 'Admin', 'Sistema', '$2b$12$AOmOGbB8PAY0Hk9JA8etOOAyMtnQL2jmVUqGQz4.st9hpjzAVHILi', 'ADMIN'),
--password: Admin123!
('user@test.com', 'Juan', 'Pérez', '$2b$12$btZV9m3C02JpyQRLJQ2rOe2wg8t695JrWz11jO92pCscpD2OE.i..', 'USER'),
--password: User123!
('maria@test.com', 'María', 'González', '$2b$12$Glb2efhEFGi/PYBqpbHR3uoWVYbXHx04FUeOWxuO6hxr0CFSnYM6S', 'USER');
--password: Maria123!
-- ============================================
-- 4. PRODUCTS (Productos)
-- ============================================
MERGE INTO product (name, description, location, price, currency, policies, category_id)
KEY(name) VALUES
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
);

-- ============================================
-- 5. PRODUCT IMAGES
-- ============================================
MERGE INTO product_images (product_id, image_url) KEY(image_url) VALUES
((SELECT id FROM product WHERE name = 'Hotel Paradise'), 'https://images.unsplash.com/photo-1566073771259-6a8506099945'),
((SELECT id FROM product WHERE name = 'Hotel Paradise'), 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'),
((SELECT id FROM product WHERE name = 'Depto Premium Centro'), 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
((SELECT id FROM product WHERE name = 'Mercedes-Benz Clase E'), 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2');

-- ============================================
-- 6. PRODUCT FEATURES (Relaciones)
-- ============================================
MERGE INTO product_features (product_id, feature_id)
KEY(product_id, feature_id) VALUES
((SELECT id FROM product WHERE name = 'Hotel Paradise'), (SELECT id FROM features WHERE name = 'WiFi Gratis')),
((SELECT id FROM product WHERE name = 'Hotel Paradise'), (SELECT id FROM features WHERE name = 'Estacionamiento')),
((SELECT id FROM product WHERE name = 'Hotel Paradise'), (SELECT id FROM features WHERE name = 'Aire Acondicionado')),
((SELECT id FROM product WHERE name = 'Hotel Paradise'), (SELECT id FROM features WHERE name = 'Pileta')),
((SELECT id FROM product WHERE name = 'Depto Premium Centro'), (SELECT id FROM features WHERE name = 'WiFi Gratis')),
((SELECT id FROM product WHERE name = 'Depto Premium Centro'), (SELECT id FROM features WHERE name = 'Aire Acondicionado')),
((SELECT id FROM product WHERE name = 'Depto Premium Centro'), (SELECT id FROM features WHERE name = 'Cocina Equipada')),
((SELECT id FROM product WHERE name = 'Mercedes-Benz Clase E'), (SELECT id FROM features WHERE name = 'Aire Acondicionado'));