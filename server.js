const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const env = require('./config');
const config = require('config');

const app = express();
app.use(cors());
app.use(morgan('dev'));
//Body Parser Middleware
app.use(bodyParser.json());

//Db config
const db = config.get('mongoURI');

mongoose.connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.use('/api/items', require('./routes/api/items'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/lists', require('./routes/api/lists'));
app.use('/api/users', require('./routes/api/users'));

//Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build/'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server started on port ${port}`));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));