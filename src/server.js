require("dotenv").config();
const express = require("express");
const app = express();
const SQLconnection = require("./db/connection");
const userRouter = require("./routes/userroutes");
const User = require("./models/user");

const port = process.env.PORT || 5002

app.use(express.json());

app.use(userRouter);

function syncTables() {
    User.sync({alter:true})
};

app.get("/health", (req,res) => {
    res.status(200).json({message: "API is up and running"})
});

app.listen (port, () => {
    console.log(`app is listening on Port ${port}`)
    syncTables();
});