const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}))
app.use(cors());


mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });

mongoose.connection.on('open', () => {
    const routes = require('./routes')
    app.use('/api', routes())
    console.log('Connected to database');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})