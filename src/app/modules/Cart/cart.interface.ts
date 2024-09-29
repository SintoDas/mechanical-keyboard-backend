import { Types, Document } from 'mongoose';

// Define the Product interface with necessary fields
export interface TProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
  availableQuantity: number; // Include this field for stock tracking
}

// Update TCartItem to account for both ObjectId and populated Product
export interface TCartItem extends Document {
  productId: Types.ObjectId | TProduct; // Can be either an ObjectId or a populated Product
  quantity: number; // Quantity of the product in the cart
}
