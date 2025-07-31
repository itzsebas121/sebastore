CREATE OR ALTER PROCEDURE UpdateCartItem
    @CustomerId INT,
    @ProductId INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @Quantity <= 0
    BEGIN
        SELECT 'La cantidad debe ser mayor a cero.' AS error;
        RETURN;
    END

    DECLARE @CartId INT;

    SELECT @CartId = CartId
    FROM Carts
    WHERE CustomerId = @CustomerId AND IsActive = 1;

    IF @CartId IS NULL
    BEGIN
        SELECT 'No se encontró un carrito activo para este cliente.' AS error;
        RETURN;
    END

    IF EXISTS (
        SELECT 1 FROM CartItems
        WHERE CartId = @CartId AND ProductId = @ProductId
    )
    BEGIN
        UPDATE CartItems
        SET Quantity = @Quantity,
            UpdatedAt = GETDATE()
        WHERE CartId = @CartId AND ProductId = @ProductId;

        SELECT 'Cantidad del producto actualizada correctamente.' AS message;
    END
    ELSE
    BEGIN
        SELECT 'El producto no se encuentra en el carrito.' AS error;
    END
END
GO