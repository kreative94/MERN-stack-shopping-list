const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('./config');

//routes 
const items = require('./routes/api/items');
const auth = require('./routes/api/auth');
const lists = require('./routes/api/lists');
const users = require('./routes/api/users');

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

//Body Parser Middleware
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

//Db config
// const db = config.get('mongoURI');
// const db = require('./config').mongoURI;
const db = `${MONGO_URI}`;

mongoose.connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.use('/api/items', items);
app.use('/api/auth', auth);
app.use('/api/lists', lists);
app.use('/api/users', users);

//Server static assets if in production
if(process.env.NODE_ENV) {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;