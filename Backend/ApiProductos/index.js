const express = require('express');
const app = express();
const port = 3000;

// Simulando los productos
const products = [
  {
    id: 1,
    name: "Netflix 1 mes - 1 pantalla",
    price: 3000,
    image: "https://example.com/netflix.png",
  },
  {
    id: 2,
    name: "Disney+ 1 mes",
    price: 2500,
    image: "https://example.com/disney.png",
  },
  {
    id: 3,
    name: "HBO Max 2 meses",
    price: 4000,
    image: "https://example.com/hbo.png",
  },
  {
    id: 4,
    name: "Crunchyroll 1 mes",
    price: 2000,
    image: "https://example.com/crunchyroll.png",
  },
  {
    id: 5,
    name: "Spotify Premium 3 meses",
    price: 5000,
    image: "https://example.com/spotify.png",
  },
];

// Endpoint que devuelve los 5 productos
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// Arrancar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
