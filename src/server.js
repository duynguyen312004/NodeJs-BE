const express = require("express");
require('dotenv').config();
const ViewEngine = require('./config/viewEngine');
const webRoutes = require('./route/web');
const connectDB = require('./config/connectDB');
// const cors = require('cors')

const app = express()
// app.use(cors({ credentials: true, origin: true }));
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME || 'localhost';

//config req.body
app.use(express.json()); //used to parsed JSON bodies
app.use(express.urlencoded()); //parsed url-encoded bodies;

ViewEngine(app);

app.use('/', webRoutes)

connectDB();

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})