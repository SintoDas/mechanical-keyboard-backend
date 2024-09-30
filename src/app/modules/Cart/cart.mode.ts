import { model, Schema } from 'mongoose';
import { TCartItem } from './cart.interface';

// Define the Mongoose schema for cart items
const cartItemSchema = new Schema<TCartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model (Capital 'P')
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Ensure at least one item is added to the cart
  },
});

// Create the model
const CartItem = model<TCartItem>('CartItem', cartItemSchema);

export default CartItem;
