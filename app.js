const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // 1. Import cors


const indexRouter = require('./routes/index');
const proposalRouter = require('./routes/proposal');
const documentRouter = require('./routes/document');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/proposal', proposalRouter);
app.use('/document', documentRouter)
module.exports = app;
