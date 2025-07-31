CREATE OR ALTER PROCEDURE RemoveProductFromCart
    @CustomerId INT,
    @ProductId INT
AS
BEGIN
    SET NOCOUNT ON;

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
        DELETE FROM CartItems
        WHERE CartId = @CartId AND ProductId = @ProductId;

        SELECT 'Producto eliminado del carrito correctamente.' AS message;
    END
    ELSE
    BEGIN
        SELECT 'El producto no se encuentra en el carrito.' AS error;
    END
END
GO