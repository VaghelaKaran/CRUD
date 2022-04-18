var createError = require('http-errors');
var express = require('express');
var app = express();

const fileUpload=require('express-fileupload');
app.use(fileUpload());
var path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('upload'));


var indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);

module.exports = app;
