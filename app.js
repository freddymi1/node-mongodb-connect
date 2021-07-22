const express = require('express')
require('dotenv').config();
require('./config/config.db')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUIexp = require ('swagger-ui-express');

const app = express()
const PORT = process.env.MONGO_PORT | 5050;
const cors = require('cors');

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const swaggerOptions = {
  definition: {
    info: {
      title: "Cars API",
      version: "1.0.0",
      description: "Cars managment API",
      contact: {
        name: "Freddy Michel",
      }
    },
    servers: [
      {
        url: "http://localhost:5050"
      }
    ],
  },
  apis: ["./src/routes/*.js"]
};

const spec = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUIexp.serve, swaggerUIexp.setup(spec))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const authRoute = require('./src/routes/auth');
const userRoute = require('./src/routes/users');
const carsRoute = require('./src/routes/cars');
const commentRoute = require('./src/routes/comment');



app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/cars', carsRoute);
app.use('/api/comments', commentRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Serveur lancer sur le port ${PORT}`);
});