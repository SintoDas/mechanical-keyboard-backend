// cart.routes.ts
import express from 'express';
import { CartControllers } from './cart.controller';
import validateRequest from '../../middlewares/validateRequests';
import { CartValidations } from './cart.validation';

const router = express.Router();

// Route to create a new cart
router.post(
  '/create-cart',
  validateRequest(CartValidations.createCartItemSchema), // Validate the cart creation request
  CartControllers.addProductToCart // Call the cart creation controller
);

// Route to get all carts
router.get('/', CartControllers.getAllCart);

// Route to get a single cart by ID
router.get('/:id', CartControllers.getSingleCart);

// Route to update a cart by ID
router.put(
  '/:id',
  validateRequest(CartValidations.updateCartItemSchema), // Validate update request
  CartControllers.updateCart
);

// Route to delete a cart by ID
router.delete('/:id', CartControllers.deleteCart);

export const CartRoutes = router;
