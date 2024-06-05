require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const crypto = require('crypto');
const mongoose = require("mongoose");
const User = require("./models/user.model.js");
const userRoute = require("./routes/user.route.js");
const app = express();


// Middleware
app.use(express.json());
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
app.use("/api/user", userRoute);


const validateUser = (username, password) => {
    return username === 'exampleUser' && password === 'examplePassword';
  };



app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    const isValidUser = validateUser(username, password);

    if (isValidUser) {
        const token = crypto.randomBytes(32).toString('hex');
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }


    res.json({
        message: 'Welcome to Wechat API',
        author: {
            name: 'Aldrin Caballero',
            github: 'https://github.com/aldrin112602',
            email: 'caballeroaldrin02@gmail.com'
        },
        date: new Date()
    })
})


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