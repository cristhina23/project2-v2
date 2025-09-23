const router = require('express').Router();
const { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById  } = require('../controllers/productController')

router.get('/',
  /* #swagger.tags = ['Products']
     #swagger.description = 'Get all products from database' */
  getAllProducts )

  router.get('/:id',
  /* #swagger.tags = ['Products']
     #swagger.description = 'Get a single product by ID' */
  getProductById) 

  router.post('/',
  /* #swagger.tags = ['Products']
     #swagger.description = 'Create a new product' */
  createProduct)

  router.put('/:id',
   /* #swagger.tags = ['Products']
     #swagger.description = 'Update a product' */
  updateProductById
);


   router.delete('/:id',
    /* #swagger.tags = ['Products']
     #swagger.description = 'Delete a product' */
    deleteProductById)

  module.exports = router;
