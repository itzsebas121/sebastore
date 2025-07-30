CREATE OR ALTER PROCEDURE GetCategories
AS
BEGIN
    SELECT CategoryId, Name
    FROM Categories
    ORDER BY Name;
END;
GO

CREATE OR ALTER PROCEDURE GetProducts
    @NameFilter NVARCHAR(100) = NULL,
    @CategoryId INT = NULL,
    @MinPrice DECIMAL(10, 2) = NULL,
    @MaxPrice DECIMAL(10, 2) = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 20
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    -- Crear tabla temporal
    CREATE TABLE #FilteredProducts (
        ProductId INT,
        Name NVARCHAR(100),
        Description NVARCHAR(MAX),
        Price DECIMAL(10,2),
        ImageUrl NVARCHAR(300),
        CategoryId INT,
        CategoryName NVARCHAR(100)
    );

    -- Insertar resultados filtrados
    INSERT INTO #FilteredProducts
    SELECT 
        P.ProductId,
        P.Name,
        P.Description,
        P.Price,
        P.ImageUrl,
        P.CategoryId,
        C.Name AS CategoryName
    FROM Products P
    INNER JOIN Categories C ON P.CategoryId = C.CategoryId
    WHERE 
        (@NameFilter IS NULL OR P.Name LIKE '%' + @NameFilter + '%') AND
        (@CategoryId IS NULL OR P.CategoryId = @CategoryId) AND
        (@MinPrice IS NULL OR P.Price >= @MinPrice) AND
        (@MaxPrice IS NULL OR P.Price <= @MaxPrice);

    -- Resultado 1: Total de productos filtrados
    SELECT COUNT(*) AS TotalCount FROM #FilteredProducts;

    -- Resultado 2: Página de resultados
    SELECT *
    FROM #FilteredProducts
    ORDER BY ProductId
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;

    DROP TABLE #FilteredProducts;
END;
GO

CREATE OR ALTER PROCEDURE LoginUser
    @Email NVARCHAR(100),
    @Password NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validar existencia del correo
    IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        SELECT 'Email not registered' AS error;
        RETURN;
    END

    -- Obtener hash de la contraseña ingresada
    DECLARE @InputHash VARBINARY(32) = HASHBYTES('SHA2_256', CONVERT(VARBINARY(MAX), @Password));
    DECLARE @InputHashString NVARCHAR(256) = CONVERT(NVARCHAR(256), @InputHash, 1);

    -- Obtener datos del usuario
    DECLARE @UserId INT, @Role NVARCHAR(20), @PasswordHash NVARCHAR(256);
    SELECT TOP 1 @UserId = UserId, @Role = Role, @PasswordHash = PasswordHash
    FROM Users
    WHERE Email = @Email;

    -- Comparar contraseñas
    IF @InputHashString != @PasswordHash
    BEGIN
        SELECT 'Incorrect credentials' AS error;
        RETURN;
    END

    -- Retornar datos según el rol
    IF @Role = 'Customer'
    BEGIN
        DECLARE @CustomerId INT;
        SELECT @CustomerId = CustomerId FROM Customers WHERE UserId = @UserId;

        SELECT
            @UserId AS UserId,
            @Role AS Role,
            @CustomerId AS CustomerId;
    END
    ELSE IF @Role = 'Admin'
    BEGIN
        DECLARE @AdminId INT;
        SELECT @AdminId = AdminId FROM Admins WHERE UserId = @UserId;

        SELECT
            @UserId AS UserId,
            @Role AS Role,
            @AdminId AS AdminId;
    END
    ELSE
    BEGIN
        SELECT 'Unknown role' AS error;
    END
END;
