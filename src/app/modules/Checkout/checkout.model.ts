import { model, Schema } from "mongoose";
import { TCheckout } from "./checkout.interface";

// Define the schema for TCheckout
const checkoutSchema = new Schema<TCheckout>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'stripe'], // Ensure only 'cod' or 'stripe' can be used
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Define and export the Checkout model
const Checkout = model<TCheckout>('Checkout', checkoutSchema);

export default Checkout;