import { RequestHandler } from "express";
import { CheckoutServices } from "./checkout.service"; // Import the Checkout services
import catchAsync from "../../utils/catchAsync"; // Utility for error handling
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
// Create Stripe payment intent
// Controller to create Stripe payment intent
const createPaymentIntent: RequestHandler = catchAsync(async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const clientSecret = await CheckoutServices.createPaymentIntent(amount, currency);
    res.status(httpStatus.OK).json({
      success: true,
      client_secret: clientSecret,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Failed to create payment intent: ${error}`,
    });
  }
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
  const { id } = req.params; // Checkout ID from URL parameter
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
  const { id } = req.params; // Checkout ID from URL parameter
  const updatedData = req.body; // Data to update
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
  const { id } = req.params; // Checkout ID from URL parameter
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
  createPaymentIntent,
  getAllCheckouts,
  getSingleCheckout,
  updateCheckout,
  softDeleteCheckout,
}
