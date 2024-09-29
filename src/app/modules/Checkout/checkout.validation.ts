import { z } from 'zod';

// Define the validation schema for the checkout
const checkoutSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  email: z.string()
    .email({ message: 'Invalid email address.' }) ,// Validates the email format
  phone: z.string({ required_error: 'Phone number is required.' }),
  address: z.string({ required_error: 'Delivery address is required.' }),
  paymentMethod: z.enum(['cod', 'stripe'], { required_error: 'Payment method is required.' }),
});

// Define the update schema for the checkout
const updateCheckoutSchema = z.object({
  name: z.string().optional(), // Optional for updates
  email: z.string()
    .email({ message: 'Invalid email address.' })
    .optional(), // Optional for updates
  phone: z.string().optional(), // Optional for updates
  address: z.string().optional(), // Optional for updates
  paymentMethod: z.enum(['cod', 'stripe']).optional(), // Optional for updates
});

// Exporting the validation schemas
export const CheckoutValidations = {
  checkoutSchema,
  updateCheckoutSchema
};
