const route = require("express").Router();
const checkAuthMiddleware = require('../../middleware/check-auth');

const CarsController = require('../controller/carController')

/**
 * @swagger
 * /api/users/:id:
 *  get:
 *    description: Use to request one users
 *    response:
 *      200:
 *        description: A successfull response
 *          
 */

/**
 * @swagger
 * /api/cars:
 *  get:
 *    description: Use to request all cars
 *    response:
 *      200:
 *        description: A successfull response
 *          
 */

/**
 * @swagger
 * /api/cars:
 *  post:
 *    description: Use to add cars
 *    response:
 *      200:
 *        description: A successfull response
 *          
 */

/**
 * @swagger
 * /api/cars/:id:
 *  put:
 *    description: Use to update cars
 *    response:
 *      200:
 *        description: A successfull response
 *          
 */


/**
 * @swagger
 * /api/cars/:id:
 *  delete:
 *    description: Use to delete one cars
 *    response:
 *      200:
 *        description: A successfull response
 *          
 */

route.post('/', CarsController.AddCars)
route.get('/:id', CarsController.getOneCar)
route.get('/', CarsController.getAllCar);
route.put('/:id', CarsController.UpdateCar);
route.delete('/:id',  checkAuthMiddleware.checkAuth, CarsController.DeleteCar);


module.exports = route;