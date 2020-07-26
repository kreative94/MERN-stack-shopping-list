const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('./config');

//routes 
const itemsRoute = require('./routes/api/items');
const authRoute = require('./routes/api/auth');
const listsRoute = require('./routes/api/lists');
const usersRoute = require('./routes/api/users');

const { MONGO_URI, MONGO_DB_NAME, PORT, NODE_ENV } = config;

// const { MONGO_URI } = "mongodb+srv://khofler:Sekirei11%21@cluster0-nnhyq.mongodb.net/list?retryWrites=true&w=majority"
const app = express();
//Body Parser Middleware
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
//Db config
// const db = config.get('mongoURI');
const db = require('./config/database').mongoURI;
// const db = `${MONGO_URI}`;
// const db = MONGO_URI + "/" + MONGO_DB_NAME + "?retryWrites=true&w=majority";

mongoose.connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.use('/api/items', itemsRoute);
app.use('/api/auth', authRoute);
app.use('/api/lists', listsRoute);
app.use('/api/users', usersRoute);

//Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
// const port = 5000;
// app.listen(port, () => console.log(`Server started on port ${port}`));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));