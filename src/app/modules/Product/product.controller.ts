import { RequestHandler } from "express";
import { ProductServices } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";

// Controller to create a new product
const createProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Product added successfully",
    data: result,
  });
});

// Controller to get all products
const getAllProducts: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Products retrieved successfully",
    data: result,
  });
});

// Controller to get a single product by ID
const getSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params; // Assumes the product ID is passed as a URL parameter
  const result = await ProductServices.getSingleProductFromDB(id);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Product retrieved successfully",
    data: result,
  });
});

// Controller to update a product by ID
const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params; // Assumes the product ID is passed as a URL parameter
  const updatedData = req.body; // The data to update
  const result = await ProductServices.updateProductInDB(id, updatedData);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result,
  });
});
// Controller to soft delete product by ID
const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params; // Assumes the product ID is passed as a URL parameter
  const result = await ProductServices.deleteProductFromDB(id);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Product delete successfully",
    data: result,
  });
});

// Exporting all the product controllers
export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct
};
