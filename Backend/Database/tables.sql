CREATE TABLE Users (
    UserId INT IDENTITY PRIMARY KEY,
    Email NVARCHAR(100) NOT NULL UNIQUE, 
    PasswordHash NVARCHAR(256),
    Role NVARCHAR(20) NOT NULL CHECK (Role IN ('Customer', 'Admin')),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE Customers (
    CustomerId INT IDENTITY PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE TABLE Admins (
    AdminId INT IDENTITY PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    DisplayName NVARCHAR(100),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE TABLE Categories (
    CategoryId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);

CREATE TABLE Products (
    ProductId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2) NOT NULL,
    CategoryId INT NOT NULL,
    ImageUrl NVARCHAR(300),
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

CREATE TABLE Sales (
    SaleId INT IDENTITY PRIMARY KEY,
    ProductId INT NOT NULL,
    CustomerId INT NOT NULL,
    SaleDate DATETIME NOT NULL DEFAULT GETDATE(),
    UnitPrice DECIMAL(10, 2) NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    DeliveryNote NVARCHAR(MAX),
    Status NVARCHAR(20) NOT NULL DEFAULT 'Pending'
        CHECK (Status IN ('Pending', 'Cancelled', 'Completed')),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId)
);

CREATE TABLE SaleStatusHistory (
    HistoryId INT IDENTITY PRIMARY KEY,
    SaleId INT NOT NULL,
    PreviousStatus NVARCHAR(20) NOT NULL,
    NewStatus NVARCHAR(20) NOT NULL,
    ChangeDate DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (SaleId) REFERENCES Sales(SaleId)
);

CREATE TABLE Carts (
    CartId INT IDENTITY PRIMARY KEY,
    CustomerId INT NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId)
);

CREATE TABLE CartItems (
    CartItemId INT IDENTITY PRIMARY KEY,
    CartId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10, 2) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CartId) REFERENCES Carts(CartId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);
