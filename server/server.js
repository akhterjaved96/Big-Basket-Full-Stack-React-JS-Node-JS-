const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// configure cors
app.use(cors());

// configure express to receive the form data
app.use(express.json());

// configure dotEnv
dotEnv.config({path: './.env'});

const hostname = process.env.LOCAL_HOST_NAME;
const port = process.env.LOCAL_PORT;

// connect to Mongo DB
mongoose.connect(process.env.MONGO_DB_URL, {
    bufferCommands: false,
    dbName: "big-basket",
    maxPoolSize: 100
}, (error) => {
    if (error) throw new Error('Connection is Failed..');
    console.log('Connected to MongoDB Successfully...');
})

// basic request
app.get('/', (request , response) => {
    response.send(`<h2>Welcome to BigBasket Server Application</h2>`);
});

// router configuration
app.use('/api/users', require('./router/userRouter'));
app.use('/api/products', require('./router/productRouter'));

app.listen(port, hostname, () => {
    console.log(`Express Server is started at http://${hostname}:${port}`);
});

