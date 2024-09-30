import CartItem from "../Cart/cart.mode";
import Product from "../Product/product.model";
import { TCheckout } from "./checkout.interface"; // Import the TCheckout interface
import Checkout from "./checkout.model"; // Import the Checkout model

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
    new: true, // Returns the updated document
    runValidators: true, // Runs schema validators on update
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
  getAllCheckoutsFromDB,
  getSingleCheckoutFromDB,
  updateCheckoutInDB,
  softDeleteCheckoutFromDB
};
