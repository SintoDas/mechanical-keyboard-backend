import Product from "../Product/product.model";
import { TCartItem, TProduct } from "./cart.interface";
import CartItem from "./cart.mode";

// Add a product to the cart
const addProductToCart = async (payload: TCartItem) => {
  // Fetch the product details using the productId
  const product = await Product.findById(payload?.productId);

  // Check if the product exists
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if the product is already in the cart
  const existingCartItem = await CartItem.findOne({ productId: payload.productId });

  if (existingCartItem) {
    // If the product is already in the cart, just return the existing cart item
    return existingCartItem;
  } else {
    // Check if the requested quantity exceeds available stock
    if (payload.quantity > product.availableQuantity) {
      throw new Error('Cannot add more than available stock');
    }

    // Create a new cart item
    const newCartItem = new CartItem({
      productId: payload.productId,
      quantity: payload.quantity,
    });

    // Decrease the available stock
    // product.availableQuantity -= payload.quantity;

    // Save the new cart item and the updated product stock
    await newCartItem.save();
    await product.save();

    return newCartItem;
  }
};


// Get all cart items with total price calculation
const getAllCart = async () => {
  const cartItems: TCartItem[] = await CartItem.find().populate<{
    productId: TProduct;
  }>({
    path: 'productId',
    model: 'Product',
  });

  const totalPrice = cartItems.reduce((acc, item) => {
    const product = item.productId as TProduct;
    const price = product?.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const fixedTotalPrice = Number(totalPrice.toFixed(2));

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

// Update cart functionality
const updateCart = async (cartItemId: string, payload: Partial<TCartItem>) => {
  const cartItem = await CartItem.findById(cartItemId).populate('productId');

  if (!cartItem) throw new Error('Cart item not found');

  const product = cartItem.productId as TProduct;
  const quantityDifference = (payload.quantity || cartItem.quantity) - cartItem.quantity;

  // Ensure there is enough stock
  if (quantityDifference > 0 && product.availableQuantity < quantityDifference) {
    throw new Error('Not enough stock available');
  }

  // Update stock availability
  // product.availableQuantity -= quantityDifference;
  // await Product.findByIdAndUpdate(product._id, { availableQuantity: product.availableQuantity });

  // Update cart item quantity
  cartItem.quantity = payload.quantity || cartItem.quantity;
  await cartItem.save();

  // Calculate the updated total price for this cart item
  const totalPrice = cartItem.quantity * product.price;

  return { cartItem, totalPrice };
};


// Export all cart services
export const CartServices = {
  addProductToCart,
  getAllCart,
  getSingleCart,
  deleteCart,
  updateCart,
};
