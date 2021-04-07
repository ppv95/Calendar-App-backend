const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

//Crear express server
const app = express();

// database
dbConnection();

// CORS
app.use(cors())

//Public Directory
app.use( express.static('public') );

// body parsing
app.use( express.json() );

//routes
app.use('/api/auth',require('./routes/auth') );
app.use('/api/events',require('./routes/events') );


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})