const express = require('express');
const userControllers = require('./../controllers/userControllers')

const Router = express.Router();
// Router.param('id', (req,res,next,val)=>{
//   console.log(`user id is : ${val}`);
//   next();
// });
Router 
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
Router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports=Router;