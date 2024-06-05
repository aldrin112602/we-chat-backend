require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user.route.js");
const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.disable("x-powered-by");
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({ maxAge: (90 * 24 * 60 * 60), force: true }));
app.use(helmet.dnsPrefetchControl());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });
  next();
});

// routes
app.use("/api/user/", userRoute);


app.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to Wechat API',
        author: {
            name: 'Aldrin Caballero',
            github: 'https://github.com/aldrin112602',
            email: 'caballeroaldrin02@gmail.com'
        },
        date: new Date()
    })
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
      });
  })
  .catch(() => {
    console.log("Connection failed!");
  });