const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const mongodb = require('./db/connect');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use(cors({
  origin: "*", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'))



app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 5000;

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  }
})