-- Insercion de productos
INSERT INTO Productos (Nombre, Descripcion, Precio, CategoriaId, ImagenUrl) VALUES
('Netflix 1 Dispositivo x 1 Mes', 'Series y pelis sin límites por 30 días.', 3.75, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('Netflix 1 Dispositivo x 2 Meses', 'Netflix por 60 días en 1 dispositivo.', 7.50, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('Netflix 1 Dispositivo x 3 Meses', 'Entretenimiento por 90 días sin parar.', 11.25, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('Spotify - 3 Meses', 'Descripcion atractiva para spotify', 6, 2, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376765/spotify_ecx2cd.webp'),
('Netflix 2 Dispositivos x 1 Mes', 'Comparte Netflix con otra persona.', 7.50, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('Netflix 2 Dispositivos x 2 Meses', '2 usuarios, 2 meses de contenido.', 15.00, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('Netflix 2 Dispositivos x 3 Meses', 'Netflix sin pausa para 2 personas.', 22.50, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('Netflix 3 Dispositivos x 1 Mes', 'Ideal para compartir con amigos.', 11.25, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('Netflix 3 Dispositivos x 2 Meses', 'Diversión para 3 por 60 días.', 22.50, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('Netflix 3 Dispositivos x 3 Meses', 'Netflix para todos por 90 días.', 33.75, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'),
('HBO MAX 1 Dispositivo x 1 Mes', 'Cine y series HBO por 30 días.', 1.50, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'),
('HBO MAX 1 Dispositivo x 2 Meses', '2 meses de HBO en tu dispositivo.', 3.00, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'),
('HBO MAX 1 Dispositivo x 3 Meses', 'HBO por 90 días en un solo lugar.', 4.50, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'),
('HBO MAX 2 Dispositivos x 1 Mes', 'Comparte HBO con alguien más.', 3.00, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'),
('HBO MAX 2 Dispositivos x 2 Meses', '2 personas, 60 días de HBO.', 6.00, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'),
('HBO MAX 2 Dispositivos x 3 Meses', 'HBO sin interrupciones para 2.', 9.00, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'),
('HBO MAX 3 Dispositivos x 1 Mes', 'HBO en casa para todos.', 4.50, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'),
('HBO MAX 3 Dispositivos x 2 Meses', 'Diversión compartida por 2 meses.', 9.00, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'),
('HBO MAX 3 Dispositivos x 3 Meses', 'HBO en 3 pantallas, 3 meses.', 13.50, 3, 'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp');


-- VISTAS

-- Vista para mostrar los productos con sus categorías
CREATE VIEW Vista_ProductosConCategoria AS
SELECT 
    p.Id AS ProductoId,
    p.Nombre AS ProductoNombre,
    p.Descripcion,
    p.Precio,
    p.ImagenUrl,
    c.Nombre AS CategoriaNombre
FROM Productos p
JOIN Categorias c ON p.CategoriaId = c.Id;
