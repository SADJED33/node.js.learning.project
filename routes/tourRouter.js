const express = require('express');
const tourControllers = require('./../controllers/tourControllers')
  


const Router = express.Router();
Router.param('id', tourControllers.checkId);
Router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.checkBody,tourControllers.creatTour);

Router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updatTour) 
  .delete(tourControllers.deletTour);

module.exports=Router; 