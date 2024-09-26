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
  const result = await ProductServices.getAllProductsFromDB();

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
// Controller to soft delete product by ID
const softDeleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params; // Assumes the product ID is passed as a URL parameter
  const result = await ProductServices.softDeleteProductFromDB(id);

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
  softDeleteProduct
};
