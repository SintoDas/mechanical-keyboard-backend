import express from 'express';
import { CheckoutControllers } from './checkout.controller'; // Import the Checkout controllers
import validateRequest from '../../middlewares/validateRequests'; // Middleware for request validation
import { CheckoutValidations } from './checkout.validation'; // Import the Checkout validations

const router = express.Router();

// Route to create a new checkout entry
router.post(
  '/create-checkout',
  validateRequest(CheckoutValidations.checkoutSchema), // Validate the request body
  CheckoutControllers.createCheckout // Call the checkout creation controller
);

// Route to get all checkouts
router.get(
  '/',
  CheckoutControllers.getAllCheckouts // Call the controller to get all checkouts
);

// Route to get a single checkout by ID
router.get(
  '/:id', // Assumes the checkout ID is passed as a URL parameter
  CheckoutControllers.getSingleCheckout // Call the controller to get a single checkout
);

// Route to update a checkout by ID
router.put(
  '/:id', // Assumes the checkout ID is passed as a URL parameter
  validateRequest(CheckoutValidations.updateCheckoutSchema), // Validate the request body for updates
  CheckoutControllers.updateCheckout // Call the checkout update controller
);

// Route to soft delete a checkout by ID
router.delete(
  '/:id', // Assumes the checkout ID is passed as a URL parameter
  CheckoutControllers.softDeleteCheckout // Call the controller to soft delete a checkout
);

router.post('/create-payment-intent', CheckoutControllers.createPaymentIntent);


export const CheckoutRoutes = router; // Export the router for use in your application
