import Product from "../Product/product.model";
import { TCartItem, TProduct } from "./cart.interface";
import CartItem from "./cart.mode";


// Add a product to the cart
const addProductToCart = async (payload: TCartItem) => {
  // Fetch the product details from the database using the provided productId
  const product = await Product.findById(payload?.productId);

  // Check if the product exists
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if the product is already in the cart
  const existingCartItem = await CartItem.findOne({ productId: payload.productId });

  if (existingCartItem) {
    // Calculate the new quantity if the product already exists in the cart
    const newQuantity = existingCartItem.quantity + payload.quantity;

    // Check if the new quantity exceeds the available stock
    if (newQuantity > product.availableQuantity) {
      throw new Error('Cannot add more than available stock');
    }

    // Update the existing cart item's quantity
    existingCartItem.quantity = newQuantity;

    // Decrease the product's available quantity
    product.availableQuantity -= payload.quantity;

    // Save both the updated cart item and the product stock
    await existingCartItem.save();
    await product.save();

    return existingCartItem;
  } else {
    // If the product is not in the cart, add it as a new cart item
    if (payload.quantity > product.availableQuantity) {
      throw new Error('Cannot add more than available stock');
    }

    // Create a new cart item
    const newCartItem = new CartItem({
      productId: payload.productId,
      quantity: payload.quantity,
    });

    // Decrease the product's available quantity
    product.availableQuantity -= payload.quantity;

    // Save both the new cart item and the product stock
    await newCartItem.save();
    await product.save();

    return newCartItem;
  }
};

  const getAllCart = async () => {
    // Fetch cart items and populate the productId field with Product details
    const cartItems: TCartItem[] = await CartItem.find().populate<{
      productId: TProduct;
    }>({
      path: 'productId',
      model: 'Product',
    });
  
    // Calculate the total price of all items in the cart
    const totalPrice = cartItems.reduce((acc, item) => {
      // Use type assertion to access price when productId is populated
      const product = item.productId as TProduct; // Assert productId as Product type
      const price = product?.price || 0; // Safely access the price field
      const quantity = item.quantity || 1; // Default quantity to 1 if not defined
      return acc + price * quantity;
    }, 0);
    const fixedTotalPrice = Number(totalPrice.toFixed(2));

    // Return cart items along with the calculated total price
    return { cartItems, totalPrice: fixedTotalPrice };
  };
  
// Get a single cart item by ID
const getSingleCart = async (id: string) => {
    const cartItem = await CartItem.findById(id);
    if (!cartItem) {
        throw new Error('Cart item not found');
    }
    return cartItem;
};

// Delete a cart item by ID
const deleteCart = async (id: string) => {
    const deletedCartItem = await CartItem.findByIdAndDelete(id);
    if (!deletedCartItem) {
        throw new Error('Cart item not found');
    }
    return deletedCartItem;
};

const updateCart = async (id: string, payload: Partial<TCartItem>) => {
  // Find the cart item to be updated and populate the productId field
  const cartItem = await CartItem.findById(id).populate<{
    productId: TProduct;
  }>({
    path: 'productId',
    model: 'Product',
  });

  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  const productId = cartItem.productId;

  const product = productId; // At this point, productId is guaranteed to be a TProduct

  // Calculate the difference in quantity (new - old)
  const quantityDifference = (payload.quantity || cartItem.quantity) - cartItem.quantity;

  if (quantityDifference > 0) {
    // Increasing the quantity
    if (product.availableQuantity < quantityDifference) {
      throw new Error('Not enough stock available');
    }
    // Decrease the available quantity in the product
    product.availableQuantity -= quantityDifference;
  } else if (quantityDifference < 0) {
    // Decreasing the quantity
    product.availableQuantity += Math.abs(quantityDifference);
  }

  // Update the product's available quantity
  await Product.findByIdAndUpdate(product._id, { availableQuantity: product.availableQuantity });

  // Update the cart item with the new quantity (or any other fields passed in payload)
  const updatedCartItem = await CartItem.findByIdAndUpdate(id, payload, { new: true });

  if (!updatedCartItem) {
    throw new Error('Failed to update cart item');
  }

  return updatedCartItem;
};

// Exporting all the cart services
export const CartServices = {
    addProductToCart,
    getAllCart,
    getSingleCart,
    deleteCart,
    updateCart,
};
