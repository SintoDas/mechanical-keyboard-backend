import { RequestHandler } from "express";
import { CheckoutServices } from "./checkout.service"; // Import the Checkout services
import catchAsync from "../../utils/catchAsync"; // Assuming you have a catchAsync utility for error handling
import httpStatus from "http-status";

// Controller to create a new checkout entry
const createCheckout: RequestHandler = catchAsync(async (req, res) => {
  const result = await CheckoutServices.createCheckoutInDB(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Checkout created successfully",
    data: result,
  });
});

// Controller to get all checkouts
const getAllCheckouts: RequestHandler = catchAsync(async (req, res) => {
  const result = await CheckoutServices.getAllCheckoutsFromDB();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkouts retrieved successfully",
    data: result,
  });
});

// Controller to get a single checkout by ID
const getSingleCheckout: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params; // Assumes the checkout ID is passed as a URL parameter
  const result = await CheckoutServices.getSingleCheckoutFromDB(id);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Checkout not found",
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkout retrieved successfully",
    data: result,
  });
});

// Controller to update a checkout by ID
const updateCheckout: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params; // Assumes the checkout ID is passed as a URL parameter
  const updatedData = req.body; // The data to update
  const result = await CheckoutServices.updateCheckoutInDB(id, updatedData);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Checkout not found",
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkout updated successfully",
    data: result,
  });
});

// Controller to soft delete a checkout by ID
const softDeleteCheckout: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params; // Assumes the checkout ID is passed as a URL parameter
  const result = await CheckoutServices.softDeleteCheckoutFromDB(id);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Checkout not found",
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkout deleted successfully",
    data: result,
  });
});

// Exporting all the checkout controllers
export const CheckoutControllers = {
  createCheckout,
  getAllCheckouts,
  getSingleCheckout,
  updateCheckout,
  softDeleteCheckout,
};
