// cart.validation.ts
import { z } from "zod";

// Define the validation schema for cart items
const createCartItemSchema = z.object({
  productId: z.string(), 
  quantity: z.number(), 
});


// Exporting the validation schemas
export const CartValidations = {
createCartItemSchema
};