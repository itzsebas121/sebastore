--- CREACION DE USUARIOS 
CREATE TABLE Usuarios (
    UsuarioId INT IDENTITY PRIMARY KEY,
    Correo NVARCHAR(100) UNIQUE NOT NULL,
    ContrasenaHash NVARCHAR(256) NOT NULL,
    TipoUsuario NVARCHAR(20) CHECK (TipoUsuario IN ('Admin', 'Cliente')) NOT NULL
);
CREATE TABLE Clientes (
    ClienteId INT IDENTITY PRIMARY KEY,
    UsuarioId INT UNIQUE FOREIGN KEY REFERENCES Usuarios(UsuarioId),
    Nombre NVARCHAR(100) NOT NULL,
    Apellido NVARCHAR(100) NOT NULL,
    Telefono NVARCHAR(20)
);
CREATE TABLE Categorias (
    CategoriaId INT IDENTITY PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL
);

CREATE TABLE Productos (
    Id INT IDENTITY PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(MAX),
    Precio DECIMAL(10, 2) NOT NULL,
    CategoriaId INT FOREIGN KEY REFERENCES Categorias(CategoriaId),
    ImagenUrl NVARCHAR(300)
);

CREATE TABLE Ventas (
    VentaId INT IDENTITY PRIMARY KEY,
    ProductoId INT NOT NULL FOREIGN KEY REFERENCES Productos(Id),
    ClienteId INT NOT NULL FOREIGN KEY REFERENCES Clientes(ClienteId),
    FechaVenta DATETIME NOT NULL DEFAULT GETDATE(),
    PrecioUnitario DECIMAL(10, 2) NOT NULL,
    ValorTotal DECIMAL(10, 2) NOT NULL,
    DescripcionEntrega NVARCHAR(MAX),
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Pendiente'
        CHECK (Estado IN ('Pendiente', 'Cancelado', 'Completado'))
);

CREATE TABLE HistorialEstadoVenta (
    HistorialId INT IDENTITY PRIMARY KEY,
    VentaId INT NOT NULL FOREIGN KEY REFERENCES Ventas(VentaId),
    EstadoAnterior NVARCHAR(20) NOT NULL,
    EstadoNuevo NVARCHAR(20) NOT NULL,
    FechaCambio DATETIME NOT NULL DEFAULT GETDATE()
);

-------

CREATE OR ALTER PROCEDURE ValidarLogin
    @Correo NVARCHAR(100),
    @Contrasena NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM Usuarios u
        WHERE u.Correo = @Correo
          AND u.ContrasenaHash = CONVERT(NVARCHAR(256), HASHBYTES('SHA2_256', @Contrasena), 2)
    )
    BEGIN
        SELECT 
            c.Nombre,
            c.Apellido,
            u.TipoUsuario
        FROM Usuarios u
        LEFT JOIN Clientes c ON u.UsuarioId = c.UsuarioId
        WHERE u.Correo = @Correo
          AND u.ContrasenaHash = CONVERT(NVARCHAR(256), HASHBYTES('SHA2_256', @Contrasena), 2);
    END
    ELSE
    BEGIN
        RAISERROR('Correo o contraseña incorrectos.', 16, 1);
    END
END;



--------

CREATE PROCEDURE CrearUsuario
    @Correo NVARCHAR(100),
    @Contrasena NVARCHAR(100),
    @TipoUsuario NVARCHAR(20),
    @Nombre NVARCHAR(100) = NULL,
    @Apellido NVARCHAR(100) = NULL,
    @Telefono NVARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificamos que el tipo de usuario sea válido
    IF @TipoUsuario NOT IN ('Admin', 'Cliente')
    BEGIN
        RAISERROR('Tipo de usuario no válido. Debe ser "Admin" o "Cliente".', 16, 1);
        RETURN;
    END

    -- Verificamos que no exista ya el correo
    IF EXISTS (SELECT 1 FROM Usuarios WHERE Correo = @Correo)
    BEGIN
        RAISERROR('Ya existe un usuario con ese correo.', 16, 1);
        RETURN;
    END

    -- Insertar en Usuarios
    INSERT INTO Usuarios (Correo, ContrasenaHash, TipoUsuario)
    VALUES (
        @Correo,
        CONVERT(NVARCHAR(256), HASHBYTES('SHA2_256', @Contrasena), 2),
        @TipoUsuario
    );

    -- Obtener el ID generado
    DECLARE @NuevoUsuarioId INT = SCOPE_IDENTITY();

    -- Si es Cliente, insertar en Clientes
    IF @TipoUsuario = 'Cliente'
    BEGIN
        IF @Nombre IS NULL OR @Apellido IS NULL
        BEGIN
            RAISERROR('Nombre y Apellido son obligatorios para usuarios tipo Cliente.', 16, 1);
            RETURN;
        END

        INSERT INTO Clientes (UsuarioId, Nombre, Apellido, Telefono)
        VALUES (@NuevoUsuarioId, @Nombre, @Apellido, @Telefono);
    END

    PRINT 'Usuario creado correctamente.';
END;



EXEC CrearUsuario 
    @Correo = 'cliente@demo.com',
    @Contrasena = 'MiClaveSegura',
    @TipoUsuario = 'Cliente',
    @Nombre = 'Laura',
    @Apellido = 'Gómez',
    @Telefono = '555-7890';


CREATE PROCEDURE ValidarLogin
    @Correo NVARCHAR(100),
    @Contrasena NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        c.Nombre,
        c.Apellido,
        u.TipoUsuario
    FROM Usuarios u
    LEFT JOIN Clientes c ON u.UsuarioId = c.UsuarioId
    WHERE u.Correo = @Correo
      AND u.ContrasenaHash = CONVERT(NVARCHAR(256), HASHBYTES('SHA2_256', @Contrasena), 2);
END;


- - Insercion de productos
INSERT INTO
    Productos (
        Nombre,
        Descripcion,
        Precio,
        CategoriaId,
        ImagenUrl
    )
VALUES
    (
        'Netflix 1 Dispositivo x 1 Mes',
        'Series y pelis sin límites por 30 días.',
        3.75,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'Netflix 1 Dispositivo x 2 Meses',
        'Netflix por 60 días en 1 dispositivo.',
        7.50,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'Netflix 1 Dispositivo x 3 Meses',
        'Entretenimiento por 90 días sin parar.',
        11.25,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'Spotify - 3 Meses',
        'Descripcion atractiva para spotify',
        6,
        2,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376765/spotify_ecx2cd.webp'
    ),
    (
        'Netflix 2 Dispositivos x 1 Mes',
        'Comparte Netflix con otra persona.',
        7.50,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'Netflix 2 Dispositivos x 2 Meses',
        '2 usuarios, 2 meses de contenido.',
        15.00,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'Netflix 2 Dispositivos x 3 Meses',
        'Netflix sin pausa para 2 personas.',
        22.50,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'Netflix 3 Dispositivos x 1 Mes',
        'Ideal para compartir con amigos.',
        11.25,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'Netflix 3 Dispositivos x 2 Meses',
        'Diversión para 3 por 60 días.',
        22.50,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'Netflix 3 Dispositivos x 3 Meses',
        'Netflix para todos por 90 días.',
        33.75,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376434/thibault-penin-GrzoKN1aqSg-unsplash-scaled_juwk78.webp'
    ),
    (
        'HBO MAX 1 Dispositivo x 1 Mes',
        'Cine y series HBO por 30 días.',
        1.50,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    ),
    (
        'HBO MAX 1 Dispositivo x 2 Meses',
        '2 meses de HBO en tu dispositivo.',
        3.00,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    ),
    (
        'HBO MAX 1 Dispositivo x 3 Meses',
        'HBO por 90 días en un solo lugar.',
        4.50,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    ),
    (
        'HBO MAX 2 Dispositivos x 1 Mes',
        'Comparte HBO con alguien más.',
        3.00,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    ),
    (
        'HBO MAX 2 Dispositivos x 2 Meses',
        '2 personas, 60 días de HBO.',
        6.00,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    ),
    (
        'HBO MAX 2 Dispositivos x 3 Meses',
        'HBO sin interrupciones para 2.',
        9.00,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    ),
    (
        'HBO MAX 3 Dispositivos x 1 Mes',
        'HBO en casa para todos.',
        4.50,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    ),
    (
        'HBO MAX 3 Dispositivos x 2 Meses',
        'Diversión compartida por 2 meses.',
        9.00,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    ),
    (
        'HBO MAX 3 Dispositivos x 3 Meses',
        'HBO en 3 pantallas, 3 meses.',
        13.50,
        3,
        'https://res.cloudinary.com/difkduty0/image/upload/v1745376920/hbomax_ujaucj.webp'
    );- - VISTAS - - Vista para mostrar los productos con sus categor í as CREATE VIEW Vista_ProductosConCategoria AS
SELECT
    p.Id AS ProductoId,
    p.Nombre AS ProductoNombre,
    p.Descripcion,
    p.Precio,
    p.ImagenUrl,
    c.Nombre AS CategoriaNombre
FROM
    Productos p
    JOIN Categorias c ON p.CategoriaId = c.Id;



