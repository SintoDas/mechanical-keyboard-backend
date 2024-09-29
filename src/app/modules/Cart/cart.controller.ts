import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { CartServices } from "./cart.sevice";


// Controller to add a product to the cart
const addProductToCart: RequestHandler = catchAsync(async (req, res) => {
  const result = await CartServices.addProductToCart(req.body,);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Product added to cart successfully",
    data: result,
  });
});

// Controller to get all cart items
const getAllCart: RequestHandler = catchAsync(async (req, res) => {
  const result = await CartServices.getAllCart();
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart items retrieved successfully",
    data: result,
  });
});

// Controller to get a single cart item by ID
const getSingleCart: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartServices.getSingleCart(id);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart item retrieved successfully",
    data: result,
  });
});

// Controller to delete a cart item by ID
const deleteCart: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CartServices.deleteCart(id);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart item deleted successfully",
  });
});

// Controller to update a cart item by ID
const updateCart: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartServices.updateCart(id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart item updated successfully",
    data: result,
  });
});

// Exporting all the cart controllers
export const CartControllers = {
  addProductToCart,
  getAllCart,
  getSingleCart,
  deleteCart,
  updateCart,
};
