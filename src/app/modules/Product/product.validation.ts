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
// Define the update schema for the product
const updateProductSchema = z.object({
  image: z.string().url().optional(), // Optional, must be a valid URL if provided
  title: z.string().optional(), // Optional for updates
  brand: z.string().optional(), // Optional for updates
  availableQuantity: z.number().min(0, { message: 'Quantity cannot be negative.' }).optional(), // Optional for updates
  price: z.number().positive({ message: 'Price must be a positive number.' }).optional(), // Optional for updates
  rating: z.number().min(0).max(5).optional(), // Optional for updates
  description: z.string().optional(), // Optional for updates
  isDeleted: z.boolean().optional(), // Optional for updates
});

export const ProductValidations = {
  productSchema,
  updateProductSchema
};
