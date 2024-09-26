import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";


// Define the schema for TProduct
const productSchema = new Schema<TProduct>(
    {
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      availableQuantity: {
        type: Number,
        required: true,
        min: 0, // Ensure quantity cannot be negative
      },
      price: {
        type: Number,
        required: true,
        min: 0, // Ensure price cannot be negative
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5, // Rating in stars, typically between 0 and 5
      },
      description: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt timestamps
    }
  );
  
  // Define and export the Product model
  const Product = model<TProduct>('Product', productSchema);
  
  export default Product;