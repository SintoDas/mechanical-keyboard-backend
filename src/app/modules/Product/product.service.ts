import { TProduct } from "./product.interface";
import Product from "./product.model";


const createProductIntoDB = async (payload: TProduct) => {
    const newProduct = await Product.create(payload);
    return newProduct;
  };
// Function to get all products from the database
const getAllProductsFromDB = async () => {
  const products = await Product.find();
  return products;
};

// Function to get a single product by ID from the database
const getSingleProductFromDB = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};
// Function to soft delete a product by setting isDeleted to true
const softDeleteProductFromDB = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndUpdate(
    productId,
    { isDeleted: true },
    { new: true }
  );
  return deletedProduct;
}

// Exporting all the product services
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  softDeleteProductFromDB
};