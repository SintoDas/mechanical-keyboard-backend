
import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import Product from "./product.model";


const createProductIntoDB = async (payload: TProduct) => {
    const newProduct = await Product.create(payload);
    return newProduct;
  };

  const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    // Define the number of items per page
    const itemsPerPage = query.limit ? parseInt(query.limit as string) : 10; // Default to 10 if not provided
    const page = query.page ? parseInt(query.page as string) : 1; // Default to page 1 if not provided
  
    // Create a base query for fetching products
    const productQueryBuilder = new QueryBuilder(Product.find(), query)
      .search(productSearchableFields) // Assume productSearchableFields is defined
      .filter()
      .sort()
      .fields();
  
    // Create a separate query for counting documents (do not reuse the same query instance)
    const countQueryBuilder = new QueryBuilder(Product.find(), query)
      .search(productSearchableFields)
      .filter();
  
    // Execute the counting query
    const totalProducts = await countQueryBuilder.modelQuery.countDocuments();
  
    // Execute the paginated query
    const results = await productQueryBuilder.paginate().modelQuery;
  
    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
  
    return {
      results,
      totalProducts,
      totalPages,
      currentPage: page,
    };
  };


// Function to get a single product by ID from the database
const getSingleProductFromDB = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};
// Function to soft delete a product by setting isDeleted to true
const deleteProductFromDB = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};
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
  deleteProductFromDB,
  updateProductInDB
};