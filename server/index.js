const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

// Load routes
const users = require('./routes/api/users');
const polls = require('./routes/api/polls');

// Load models
const User = require('./models/user');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

const dbUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ssc1v.mongodb.net/VotingApp?retryWrites=true&w=majority`;

const dbOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

mongoose.connect(dbUri, dbOptions)
        .then(() => console.log('База данных успешно подключена!'))
        .catch((err) => console.error(err));


require('./config/passport')(passport);

app.use(cookie());
app.use(session({ 
    secret: "cats",
    resave: false,
    saveUninitialized: false 
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/polls', polls);
app.use('/api/users', users);

app.listen(PORT, () => {
    console.log('Сервер запущен на порту localhost:3000');
});