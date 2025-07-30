CREATE OR ALTER PROCEDURE CreateCustomer
    @Email NVARCHAR(100),
    @Password NVARCHAR(100),
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Phone NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF @FirstName LIKE '%[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]%'
    BEGIN
        SELECT 'Invalid characters in FirstName' AS error;
        RETURN;
    END

    IF @LastName LIKE '%[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]%'
    BEGIN
        SELECT 'Invalid characters in LastName' AS error;
        RETURN;
    END

    IF CHARINDEX('@', @Email) = 0 OR CHARINDEX('.', @Email) = 0
    BEGIN
        SELECT 'Invalid email format' AS error;
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        SELECT 'Email already registered' AS error;
        RETURN;
    END

    DECLARE @PhoneDigitsOnly NVARCHAR(20) = REPLACE(REPLACE(REPLACE(@Phone, ' ', ''), '-', ''), '(', '');
    SET @PhoneDigitsOnly = REPLACE(@PhoneDigitsOnly, ')', '');

    IF NOT (
        (@PhoneDigitsOnly LIKE '09[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' AND LEN(@PhoneDigitsOnly) = 10)
        OR (@PhoneDigitsOnly LIKE '+5939[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' AND LEN(@PhoneDigitsOnly) = 13)
    )
    BEGIN
        SELECT 'Invalid Ecuadorian phone number' AS error;
        RETURN;
    END

    DECLARE @PasswordHash VARBINARY(32);
    SET @PasswordHash = HASHBYTES('SHA2_256', CONVERT(VARBINARY(MAX), @Password));

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Insertar usuario
        INSERT INTO Users (Email, PasswordHash, Role, CreatedAt)
        VALUES (@Email, CONVERT(NVARCHAR(256), @PasswordHash, 1), 'Customer', GETDATE());

        DECLARE @NewUserId INT = SCOPE_IDENTITY();

        -- Insertar cliente
        INSERT INTO Customers (UserId, FirstName, LastName, Phone)
        VALUES (@NewUserId, @FirstName, @LastName, @Phone);

        DECLARE @NewCustomerId INT = SCOPE_IDENTITY();

        COMMIT TRANSACTION;

        SELECT 'Customer successfully created' AS message, @NewCustomerId AS CustomerId;

    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT ERROR_MESSAGE() AS error;
    END CATCH
END;
GO
