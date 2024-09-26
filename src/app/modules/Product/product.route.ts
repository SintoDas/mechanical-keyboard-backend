import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequests';
import { ProductValidations } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',validateRequest(ProductValidations.productSchema),
  ProductControllers.createProduct, // Call the product creation controller
);
// Route to get all products
router.get(
  '/',
  ProductControllers.getAllProducts,
);

// Route to get a single product by ID
router.get(
  '/:id', // Assumes the product ID is passed as a URL parameter
  ProductControllers.getSingleProduct,
);
router.delete(
  '/:id', // Assumes the product ID is passed as a URL parameter
  ProductControllers.softDeleteProduct,
);

export const ProductRoutes = router;