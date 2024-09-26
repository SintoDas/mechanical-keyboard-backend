import { z } from 'zod';

// Define the validation schema for the product
const productSchema = z.object({
  image: z.string(), // Assuming the image URL might be optional and must be a valid URL
  title: z.string({ required_error: 'Product title is required.' }),
  brand: z.string({ required_error: 'Brand is required.' }),
  availableQuantity: z.number().min(0, { message: 'Quantity cannot be negative.' }), // Assuming minimum value should be 0
  price: z.number().positive({ message: 'Price must be a positive number.' }),
  rating: z.number().min(0).max(5).optional(), // Assuming rating should be between 0 and 5
  description: z.string().optional(),
  isDeleted: z.boolean().default(false), // Soft delete field with a default value of false
});
// Exporting the validation schema
export const ProductValidations = {
  productSchema,
};
