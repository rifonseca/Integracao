const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const routers = require("./routers");
const client = require("../config/db");

const app = express();
const PORT = 8085;

app.use(cors()); 
app.use(routers);

const connectWithRetry = () => {
    console.log("Attempting to connect to the database...");

    client.query("select 1")
        .then(() => {
            console.log("Connection successful");
            app.listen(PORT, () => {
                console.log(`Servidor rodando na url: http://localhost:${PORT}`);
            });
        })
        .catch(err => {
            console.error("Connection failed, retrying in 5 seconds...", err);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();
