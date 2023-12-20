const express = require('express');
const ProductManager = require('./productManager')

const app = express();
const port = 8080;

const path = require('path');
const productManager = new ProductManager(path.join(__dirname, '../productos.json'));

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit; 
        let products;

        if (limit) {
            products = await productManager.getProducts();
            products = products.slice(0, parseInt(limit));
        } else {
            products = await productManager.getProducts();
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado o inexistente' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
