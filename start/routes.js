/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/
//import Route from '@adonisjs/framework/src/Route/Manager';
var Route = use("Route");
/**
 * Dummy route for the root, just to say hello
 */
Route.get("/", "CourierController.dummy");
/**
 * Lookup for couriers
 */
Route.get("/couriers/lookup", "CourierController.lookup");
/**
 * Update couriers
 */
Route.post("/couriers", "CourierController.update").validator("UpdateCourier");
