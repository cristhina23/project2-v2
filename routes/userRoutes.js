const router = require("express").Router();
const { getUsers, getUserById, updateUserById, createUser, deleteUserById} = require("../controllers/userController");

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
  updateUserById);

router.post("/",
  /* #swagger.tags = ['Users']
     #swagger.description = 'Create a new user' */
  createUser);

router.delete("/:id",
  /* #swagger.tags = ['Users']
     #swagger.description = 'Delete a user' */
  deleteUserById);

module.exports = router;