const { Pool } = require('pg');

const pool = new Pool({
    user: 'default',
    host: "ep-misty-dawn-63641137-pooler.us-east-1.postgres.vercel-storage.com",
    database: 'verceldb',
    password: "lY4UHB8OZotw",
    port: 5432,
    ssl: { rejectUnauthorized: false },
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    productname VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    due_date DATE,
    imgUrl VARCHAR(255) NOT NULL
  );`;

pool.query(createTableQuery)
    .then(res => {
        console.log("table created to store sports technological products");
        pool.end();
    })
    .catch(err => {
        console.error(err);
        pool.end();
    });