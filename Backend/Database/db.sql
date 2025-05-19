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
CREATE TABLE Carts (
    CartId INT PRIMARY KEY IDENTITY,
    ClienteId INT NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ClienteId) REFERENCES Clientes(ClienteId)
);
CREATE TABLE CartItems (
    CartItemId INT PRIMARY KEY IDENTITY,
    CartId INT NOT NULL,
    ProductoId INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    Price DECIMAL(10, 2) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CartId) REFERENCES Carts(CartId),
    FOREIGN KEY (ProductoId) REFERENCES Productos(Id)
);

CREATE PROCEDURE AgregarAlCarrito
    @ClienteId INT,
    @ProductoId INT,
    @Cantidad INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CartId INT;

    -- Obtener el carrito activo del cliente
    SELECT @CartId = CartId
    FROM Carts
    WHERE ClienteId = @ClienteId AND IsActive = 1;

    -- Si no hay carrito activo, crear uno
    IF @CartId IS NULL
    BEGIN
        INSERT INTO Carts (ClienteId)
        VALUES (@ClienteId);

        SET @CartId = SCOPE_IDENTITY();
    END

    DECLARE @PrecioProducto DECIMAL(10,2);
    SELECT @PrecioProducto = Precio FROM Productos WHERE Id = @ProductoId;

    -- Verificar si ya existe ese producto en el carrito
    IF EXISTS (
        SELECT 1 FROM CartItems
        WHERE CartId = @CartId AND ProductoId = @ProductoId
    )
    BEGIN
        -- Si existe, actualizar la cantidad
        UPDATE CartItems
        SET Quantity = Quantity + @Cantidad,
            UpdatedAt = GETDATE()
        WHERE CartId = @CartId AND ProductoId = @ProductoId;
    END
    ELSE
    BEGIN
        -- Si no existe, agregarlo
        INSERT INTO CartItems (CartId, ProductoId, Quantity, Price)
        VALUES (@CartId, @ProductoId, @Cantidad, @PrecioProducto);
    END
END;

go;

CREATE OR ALTER PROCEDURE VerCarritoActivo
    @ClienteId INT
AS BEGIN
    SET NOCOUNT ON;

    SELECT 
        ci.CartItemId,
        p.Nombre AS Producto,
        p.Descripcion,
        p.ImagenUrl, -- <-- añadimos esta columna
        ci.Quantity,
        ci.Price,
        (ci.Quantity * ci.Price) AS Subtotal,
        ci.CreatedAt,
        c.CartId
    FROM Carts c
    INNER JOIN CartItems ci ON c.CartId = ci.CartId
    INNER JOIN Productos p ON ci.ProductoId = p.Id
    WHERE c.ClienteId = @ClienteId AND c.IsActive = 1;
END;


-------

CREATE PROCEDURE ActualizarCantidadCarrito
    @CartId INT,
    @ProductoId INT,
    @NuevaCantidad INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el carrito está activo
    IF NOT EXISTS (SELECT 1 FROM Carts WHERE CartId = @CartId AND IsActive = 1)
    BEGIN
        RAISERROR('Carrito no encontrado o inactivo.', 16, 1);
        RETURN;
    END

    -- Si la nueva cantidad es menor o igual a 0, eliminar el producto del carrito
    IF @NuevaCantidad <= 0
    BEGIN
        DELETE FROM CartItems
        WHERE CartId = @CartId AND ProductoId = @ProductoId;
    END
    ELSE
    BEGIN
        -- Actualizar la cantidad si el producto existe en el carrito
        IF EXISTS (SELECT 1 FROM CartItems WHERE CartId = @CartId AND ProductoId = @ProductoId)
        BEGIN
            UPDATE CartItems
            SET Quantity = @NuevaCantidad,
                UpdatedAt = GETDATE()
            WHERE CartId = @CartId AND ProductoId = @ProductoId;
        END
        ELSE
        BEGIN
            RAISERROR('El producto no existe en el carrito.', 16, 1);
        END
    END
END;

--------
CREATE OR ALTER PROCEDURE ValidarLogin
    @Correo NVARCHAR(100),
    @Contrasena NVARCHAR(100)
AS BEGIN
    SET NOCOUNT ON;

    DECLARE @ContrasenaHash NVARCHAR(256) = CONVERT(NVARCHAR(256), HASHBYTES('SHA2_256', @Contrasena), 2);

    IF EXISTS (
        SELECT 1
        FROM Usuarios u
        WHERE u.Correo = @Correo
          AND u.ContrasenaHash = @ContrasenaHash
    )
    BEGIN
        SELECT 
            u.UsuarioId,
            c.Nombre,
            c.Apellido,
            u.TipoUsuario
        FROM Usuarios u
        LEFT JOIN Clientes c ON u.UsuarioId = c.UsuarioId
        WHERE u.Correo = @Correo
          AND u.ContrasenaHash = @ContrasenaHash;
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
    @Nombre NVARCHAR(100),
    @Apellido NVARCHAR(100),
    @Telefono NVARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificamos que no exista ya el correo
    IF EXISTS (SELECT 1 FROM Usuarios WHERE Correo = @Correo)
    BEGIN
        RAISERROR('Ya existe un usuario con ese correo.', 16, 1);
        RETURN;
    END

    -- Insertar en Usuarios con TipoUsuario fijo como 'Cliente'
    INSERT INTO Usuarios (Correo, ContrasenaHash, TipoUsuario)
    VALUES (
        @Correo,
        CONVERT(NVARCHAR(256), HASHBYTES('SHA2_256', @Contrasena), 2),
        'Cliente'
    );

    -- Obtener el ID generado
    DECLARE @NuevoUsuarioId INT = SCOPE_IDENTITY();

    -- Validar que nombre y apellido no sean NULL (por seguridad)
    IF @Nombre IS NULL OR @Apellido IS NULL
    BEGIN
        RAISERROR('Nombre y Apellido son obligatorios.', 16, 1);
        RETURN;
    END

    -- Insertar en Clientes
    INSERT INTO Clientes (UsuarioId, Nombre, Apellido, Telefono)
    VALUES (@NuevoUsuarioId, @Nombre, @Apellido, @Telefono);

    PRINT 'Usuario cliente creado correctamente.';
END;



EXEC CrearUsuario 
    @Correo = 'cliente@demo.com',
    @Contrasena = 'MiClaveSegura',
    @TipoUsuario = 'Cliente',
    @Nombre = 'Laura',
    @Apellido = 'Gómez',
    @Telefono = '555-7890';


CREATE OR ALTER PROCEDURE ValidarLogin
    @Correo NVARCHAR(100),
    @Contrasena NVARCHAR(100)
AS
BEGIN
    

    SELECT 
		c.ClienteId as UsuarioId,
        c.Nombre,
        c.Apellido,
        u.TipoUsuario
    FROM Usuarios u
    LEFT JOIN Clientes c ON u.UsuarioId = c.UsuarioId
    WHERE u.Correo = @Correo
      AND u.ContrasenaHash = CONVERT(NVARCHAR(256), HASHBYTES('SHA2_256', @Contrasena), 2);
END;

CREATE PROCEDURE ObtenerUsuarioPorClienteId
    @ClienteId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.UsuarioId,
        u.Correo,
        u.TipoUsuario,
        c.ClienteId,
        c.Nombre,
        c.Apellido,
        c.Telefono
    FROM Clientes c
    INNER JOIN Usuarios u ON u.UsuarioId = c.UsuarioId
    WHERE c.ClienteId = @ClienteId;
END;

CREATE OR ALTER PROCEDURE ObtenerHistorialVentasPorCliente
    @ClienteId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        V.VentaId,
        P.Nombre AS NombreProducto,
        V.FechaVenta,
        V.ValorTotal,
        V.Estado
    FROM Ventas V
    INNER JOIN Productos P ON V.ProductoId = P.Id
    WHERE V.ClienteId = @ClienteId
    ORDER BY V.FechaVenta DESC;
END;

CREATE PROCEDURE ObtenerDetalleVentaPorId
    @VentaId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        V.VentaId,
        P.Nombre AS NombreProducto,
        V.PrecioUnitario,
        V.ValorTotal,
        V.FechaVenta,
        V.Estado,
        V.DescripcionEntrega
    FROM Ventas V
    INNER JOIN Productos P ON V.ProductoId = P.Id
    WHERE V.VentaId = @VentaId;
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



