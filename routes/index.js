const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({
    message: "Welcome to the Store API",
    docs: "/api-docs",
    author: "Viszelle Cristhina Chacon"
  })
);

module.exports = router;