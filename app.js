const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://material:' +
    process.env.MONGO_ATLAS_PW +
    '@material-node-api-shard-00-00-r4jtb.mongodb.net:27017,material-node-api-shard-00-01-r4jtb.mongodb.net:27017,material-node-api-shard-00-02-r4jtb.mongodb.net:27017/test?ssl=true&replicaSet=material-node-api-shard-0&authSource=admin&retryWrites=true', {
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

const materialRoutes = require('./api/routes/material');
const employeeRoutes = require('./api/routes/employee');
const orderRoutes = require('./api/routes/order');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Acess-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/material', materialRoutes);
app.use('/employee', employeeRoutes);
app.use('/order', orderRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            error_status: error.status
        }
    });
});

module.exports = app;