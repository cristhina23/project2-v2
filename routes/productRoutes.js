const router = require('express').Router();
const { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById  } = require('../controllers/productController')
const { isAuthenticated } = require('../middlewares/authenticate');

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
   isAuthenticated,  
  createProduct)

  router.put('/:id',
   /* #swagger.tags = ['Products']
     #swagger.description = 'Update a product' */
   isAuthenticated,
  updateProductById
);


   router.delete('/:id',
    /* #swagger.tags = ['Products']
     #swagger.description = 'Delete a product' */
   isAuthenticated,
   deleteProductById)

  module.exports = router;
