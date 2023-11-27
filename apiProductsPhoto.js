const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Pool } = require('pg');
const upload = require('../libs/storage');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'default',
    host: 'ep-misty-dawn-63641137-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'lY4UHB8OZotw',
    port: 5432,
    ssl: { rejectUnauthorized: false },
});

// Configuración de multer para manejar la carga de imágenes
const storage = multer.memoryStorage(); // Almacena las imágenes en memoria
const upload = multer ({ storage: storage });

// Utilizar bodyParser directamente sin necesidad de urlencoded
app.use(bodyParser.json());

// Ruta para manejar solicitudes POST y agregar productos con imágenes
app.post('/products', upload.single('photo'), async (req, res) => {
    const { productname, amount, price, description, due_date } = req.body;

    // Obtener la imagen cargada desde multer (si existe)
    const photo = req.file ? req.file.buffer : null;

    const insertProductQuery = `
        INSERT INTO productos (productname, amount, price, description, due_date, photo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;

    try {
        const result = await pool.query(insertProductQuery, [productname, amount, price, description, due_date, photo]);
        const newProduct = result.rows[0];
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`server starting for product database ${port}`);
});

