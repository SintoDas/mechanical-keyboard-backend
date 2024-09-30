import { z } from 'zod';

// Define the validation schema for cart items
const createCartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),  // Ensure productId is not empty
  quantity: z.number().min(1, "Quantity must be at least 1"),  // Ensure quantity is at least 1
});
const updateCartItemSchema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1').optional(),
});


// Exporting the validation schemas
export const CartValidations = {
  createCartItemSchema,
  updateCartItemSchema
};
