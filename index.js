const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path =require("path")
const port=process.env.PORT || 3000;
const dotenv=require('dotenv')
app.use(cors());
app.options("*", cors());
require("./src/db/conn")
require("dotenv/config");
//middleware
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler.js");

const usersRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
//dotenv.config({ path: './config.env'})
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
//app.use(authjwt());
app.use(authJwt());
app.use(errorHandler);
const api = process.env.API_URL;
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/blog`, blogRoutes);

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});
