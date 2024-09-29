
import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import Product from "./product.model";


const createProductIntoDB = async (payload: TProduct) => {
    const newProduct = await Product.create(payload);
    return newProduct;
  };
// Function to get all products from the database
const  getAllProductsFromDB = async (query: Record<string, unknown>) => {

  const productQuery = new QueryBuilder(
    Product.find(),query
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  return result;
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
const updateProductInDB = async (productId: string, payload: Partial<TProduct>) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, payload, {
    new: true, // Returns the updated document
    runValidators: true, // Runs schema validators on update
  });
  return updatedProduct;
};


// Exporting all the product services
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  softDeleteProductFromDB,
  updateProductInDB
};