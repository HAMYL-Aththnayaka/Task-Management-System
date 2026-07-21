const express = require("express");
const cors = require("cors");
require('dotenv').config();

require("./config/db");
const authRouter = require("./routes/authRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter);

app.get('/',(req,res)=>{
    console.log("/get method accessed")
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`The Server is Running on port :${port}`);
})