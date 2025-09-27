const router = require("express").Router();
const { getUsers, getUserById, updateUserById, createUser, deleteUserById} = require("../controllers/userController");
const { isAuthenticated } = require('../middlewares/authenticate');


router.get("/",
   /* #swagger.tags = ['Users']
     #swagger.description = 'Get all users from database' */
  getUsers);

router.get("/:id",
  /* #swagger.tags = ['Users']
     #swagger.description = 'Get a single user by ID' */
  getUserById);

router.put("/:id",
  /* #swagger.tags = ['Users']
     #swagger.description = 'Update a user by ID' */
  isAuthenticated,
  updateUserById);

router.post("/",
  /* #swagger.tags = ['Users']
     #swagger.description = 'Create a new user' */
  isAuthenticated,
  createUser);

router.delete("/:id",
  /* #swagger.tags = ['Users']
     #swagger.description = 'Delete a user' */
  isAuthenticated,
  deleteUserById);

module.exports = router;