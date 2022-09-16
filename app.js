const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
//Middlewares
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
//IMPORT ROUTES
const realEstateRoutes = require('./routes/real_estate');
const authRoutes = require('./routes/auth');
const transportRoutes = require('./routes/transport');
const searchRoutes = require('./routes/search');

app.use('/real-estate', realEstateRoutes);
app.use('/user', authRoutes);
app.use('/transport', transportRoutes);
app.use('/search', searchRoutes);

//ROUTES
app.get('/', (req, res) => {
    res.send('Main Page');
});

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true,
  useUnifiedTopology: true },
() => {
    console.log('Connected to DB')
})

//LISTEN SERVER
app.listen(3001);