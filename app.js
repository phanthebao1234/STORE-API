const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
require('express-async-errors');
// async erros

const express = require('express');
const app = express();

const connectDB = require('./db/connect.js');
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json());

//router
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">product route</a>');
})

//product route
app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async (req, res) => {
    try {
        //connect db 
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`App is listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
