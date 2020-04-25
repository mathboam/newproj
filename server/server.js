const exp = require('express');
const Cors = require('cors');
const BodyPaser = require('body-parser')

// init app
const app =exp();

//middleware for data
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


// for cross communication
app.use(Cors())



