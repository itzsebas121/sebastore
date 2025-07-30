INSERT INTO Categories (Name) VALUES
('Streaming'),
('TV en vivo'),
('Música');
-- Streaming (CategoryId = 1)
INSERT INTO Products (Name, Description, Price, CategoryId, ImageUrl) VALUES
('Netflix - 1 Perfil', 'Cuenta Netflix para 1 perfil individual', 2.99, 1, 'https://example.com/netflix1.png'),
('Netflix - 2 Perfiles', 'Cuenta Netflix para 2 perfiles simultáneos', 4.99, 1, 'https://example.com/netflix2.png'),
('Netflix - 4 Perfiles', 'Cuenta Netflix para 4 perfiles Premium', 7.99, 1, 'https://example.com/netflix4.png'),

('Disney+ - 1 Perfil', 'Cuenta Disney+ individual', 2.49, 1, 'https://example.com/disney1.png'),
('Disney+ - 4 Perfiles', 'Cuenta Disney+ para 4 perfiles', 6.49, 1, 'https://example.com/disney4.png'),

('HBO Max - 2 Perfiles', 'Cuenta HBO Max para 2 perfiles', 3.99, 1, 'https://example.com/hbo2.png'),
('HBO Max - 4 Perfiles', 'Cuenta HBO Max para 4 perfiles', 6.99, 1, 'https://example.com/hbo4.png'),

('Amazon Prime Video - 1 Perfil', 'Cuenta Prime Video básica', 2.49, 1, 'https://example.com/prime1.png'),

('Crunchyroll - Fan', 'Acceso ilimitado a anime sin anuncios', 2.00, 1, 'https://example.com/crunchyfan.png'),

('YouTube Premium - Individual', 'Cuenta YouTube Premium sin anuncios', 1.49, 1, 'https://example.com/ytpremium.png'),

('Paramount+ - 2 Perfiles', 'Cuenta Paramount+ para 2 perfiles', 2.89, 1, 'https://example.com/paramount2.png');

-- TV en vivo (CategoryId = 2)
INSERT INTO Products (Name, Description, Price, CategoryId, ImageUrl) VALUES
('DirecTV Go - 1 Perfil', 'Acceso DirecTV Go para un perfil', 5.99, 2, 'https://example.com/directv1.png'),
('DirecTV Go - 3 Perfiles', 'DirecTV Go para 3 perfiles simultáneos', 9.99, 2, 'https://example.com/directv3.png'),

('Sky TV - Básico', 'Cuenta Sky TV básica con canales en vivo', 4.99, 2, 'https://example.com/skybasico.png');

-- Música (CategoryId = 3)
INSERT INTO Products (Name, Description, Price, CategoryId, ImageUrl) VALUES
('Spotify Premium - Individual', 'Cuenta Spotify Premium para uso individual', 1.99, 3, 'https://example.com/spotify1.png'),
('Spotify Premium - Familiar', 'Cuenta familiar Spotify para hasta 6 perfiles', 3.99, 3, 'https://example.com/spotify6.png'),

('Apple Music - Individual', 'Cuenta Apple Music para uso individual', 1.99, 3, 'https://example.com/applemusic1.png');
-- Streaming (CategoryId = 1)
INSERT INTO Products (Name, Description, Price, CategoryId, ImageUrl) VALUES
('Hulu - Basic Plan', 'Cuenta Hulu básico con anuncios', 2.50, 1, 'https://example.com/hulu_basic.png'),
('Hulu - No Ads Plan', 'Cuenta Hulu sin anuncios', 5.00, 1, 'https://example.com/hulu_noads.png'),
('Apple TV+ - Individual', 'Cuenta Apple TV+ para 1 perfil', 3.00, 1, 'https://example.com/appletv_individual.png'),
('Apple TV+ - Family Plan', 'Cuenta Apple TV+ para hasta 6 perfiles', 7.00, 1, 'https://example.com/appletv_family.png'),
('Discovery+ - Standard', 'Cuenta Discovery+ con acceso completo', 3.50, 1, 'https://example.com/discovery_standard.png'),
('Discovery+ - Premium', 'Cuenta Discovery+ con contenido exclusivo', 6.00, 1, 'https://example.com/discovery_premium.png'),

-- TV en vivo (CategoryId = 2)
('FuboTV - Starter', 'Cuenta FuboTV con canales básicos en vivo', 6.99, 2, 'https://example.com/fubotv_starter.png'),
('FuboTV - Family', 'Cuenta FuboTV para hasta 3 perfiles', 11.99, 2, 'https://example.com/fubotv_family.png'),
('Sling TV - Orange', 'Cuenta Sling TV plan Orange', 4.99, 2, 'https://example.com/sling_orange.png'),
('Sling TV - Blue', 'Cuenta Sling TV plan Blue', 4.99, 2, 'https://example.com/sling_blue.png'),
('Philo TV - Basic', 'Cuenta Philo con 60+ canales en vivo', 3.50, 2, 'https://example.com/philo_basic.png'),

-- Música (CategoryId = 3)
('Tidal HiFi - Individual', 'Cuenta Tidal HiFi para 1 usuario con alta calidad', 2.99, 3, 'https://example.com/tidal_hifi.png'),
('Tidal HiFi - Family', 'Cuenta Tidal HiFi para hasta 6 usuarios', 5.99, 3, 'https://example.com/tidal_family.png'),
('Amazon Music Unlimited - Individual', 'Cuenta Amazon Music Unlimited para 1 perfil', 1.99, 3, 'https://example.com/amazonmusic_individual.png'),
('Amazon Music Unlimited - Family', 'Cuenta Amazon Music Unlimited para 6 perfiles', 4.99, 3, 'https://example.com/amazonmusic_family.png'),
('Deezer Premium - Individual', 'Cuenta Deezer Premium para 1 perfil', 1.79, 3, 'https://example.com/deezer_individual.png'),
('Deezer Premium - Family', 'Cuenta Deezer Premium para hasta 6 perfiles', 4.50, 3, 'https://example.com/deezer_family.png');
