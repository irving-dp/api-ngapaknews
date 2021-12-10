//init express js
const express = require('express');
const app = express();
//make file upload can be accessed in url direct browser
app.use('/uploads', express.static('uploads'));

//morgan to logging request details
const morgan = require('morgan');

//body parser get request form 
const bodyParser = require('body-parser');

//mongo db connection
const mongoose = require('mongoose');
//connect to monggodb atlas
mongoose.connect("mongodb+srv://root:" + process.env.MONGO_ATLAS_PW + "@cluster0-zk8em.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//log request
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//CORS Error Handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //* give access to any client
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

//initial routes
const kategori_router       = require('./api/routes/KategoriRoute.');
const sub_kategori_router   = require('./api/routes/SubKategoriRoute');
const event_kategori_router = require('./api/routes/EventKategoriRoute');

//routes which should handle request
app.use('/kategori', kategori_router);
app.use('/sub-kategori', sub_kategori_router);
app.use('/event-kategori', event_kategori_router);

//Error handling request http not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Error handling request status
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;