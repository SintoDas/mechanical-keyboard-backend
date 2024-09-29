import { model, Schema } from "mongoose";
import { TCartItem } from "./cart.interface";

// Define the Mongoose schema
const cartItemSchema = new Schema<TCartItem>({
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product', // Reference to the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensures at least one item is added to the cart
    },
  });
  
  // Create the model
  const CartItem = model<TCartItem>('CartItem', cartItemSchema);
  
  export default CartItem;