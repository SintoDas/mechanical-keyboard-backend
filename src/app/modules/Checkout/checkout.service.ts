
import Stripe from "stripe";
import config from "../../config";
import CartItem from "../Cart/cart.mode";
import Product from "../Product/product.model";
import { TCheckout } from "./checkout.interface";
import Checkout from "./checkout.model";
const stripe = new Stripe(config.payment_secret as string, {apiVersion: '2024-06-20'});


// Function to create a new checkout entry in the database
const createCheckoutInDB = async (payload: TCheckout) => {
  const checkout = await Checkout.create(payload);

  // After checkout, update product stock for all cart items
  const cartItems = await CartItem.find();
  for (const cartItem of cartItems) {
    const product = await Product.findById(cartItem?.productId);
    if (product) {
      product.availableQuantity -= cartItem.quantity;
      await product.save();
    }
  }

  return checkout;
};

// Function to create a payment intent using Stripe
// const createPaymentIntent = async (amount: number, currency: string) => {
//   // Create a new payment intent
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount,
//     currency,
//   });

//   return paymentIntent.client_secret; // Return the client secret for frontend use
// };

const createPaymentIntent = async (amount: number, currency: string) => {
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return paymentIntent.client_secret; // Return the client secret for frontend use
};

// Function to get all checkouts from the database
const getAllCheckoutsFromDB = async () => {
  const checkouts = await Checkout.find();
  return checkouts;
};

// Function to get a single checkout by ID from the database
const getSingleCheckoutFromDB = async (checkoutId: string) => {
  const checkout = await Checkout.findById(checkoutId);
  return checkout;
};

// Function to update a checkout entry in the database
const updateCheckoutInDB = async (checkoutId: string, payload: Partial<TCheckout>) => {
  const updatedCheckout = await Checkout.findByIdAndUpdate(checkoutId, payload, {
    new: true,
    runValidators: true,
  });
  return updatedCheckout;
};

// Function to soft delete a checkout by setting isDeleted to true
const softDeleteCheckoutFromDB = async (checkoutId: string) => {
  const deletedCheckout = await Checkout.findByIdAndUpdate(
    checkoutId,
    { isDeleted: true },
    { new: true }
  );
  return deletedCheckout;
};

// Exporting all the checkout services
export const CheckoutServices = {
  createCheckoutInDB,
  createPaymentIntent,
  getAllCheckoutsFromDB,
  getSingleCheckoutFromDB,
  updateCheckoutInDB,
  softDeleteCheckoutFromDB,
};
