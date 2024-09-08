require("dotenv").config();
const http=require('http')
const express = require("express");
const mongo = require("mongoose");
const errorMiddleWare = require("./errorhandling/errorMiddleWare");
const router = require("./UserDetails/router");
const cors=require('cors');

//initializing the application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//cross-origin resource sharing configuration


const server=http.createServer(app)



//database connected
const connectdb = async () => {
  try {
    await mongo.connect(process.env.MONGO_URL)
    .then(()=>{
      console.log('connected data base')
    }).catch((error)=>{
      console.log(error);
    })
  } catch (error) {
    console.log("fails to connect");
    process.exit(0);
  }
};

app.use(errorMiddleWare);
app.use("/home", router);

//server is being executed
connectdb().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`server is listening on PORT ${process.env.PORT} `);
  });
});
