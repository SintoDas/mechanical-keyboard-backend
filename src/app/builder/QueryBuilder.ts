/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

// Define a PriceFilter interface
interface PriceFilter {
  $gte?: number; // Minimum price
  $lte?: number; // Maximum price
}

// Define a QueryObject interface
interface QueryObject {
  searchTerm?: string;
  sort?: string;
  limit?: number;
  page?: number;
  fields?: string;
  minPrice?: number;
  maxPrice?: number;
  price?: PriceFilter; // Define the price field as a PriceFilter
}

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: QueryObject; // Use QueryObject as the type for query

  constructor(modelQuery: Query<T[], T>, query: QueryObject) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj: Record<string, any> = { ...this.query }; // Use 'any' for more flexibility

    // Exclude certain fields from filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields', 'minPrice', 'maxPrice'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Price range filtering
    if (this.query.minPrice || this.query.maxPrice) {
      queryObj.price = {}; // Initialize price as an object
      if (this.query.minPrice) {
        queryObj.price.$gte = Number(this.query.minPrice); // Min price
      }
      if (this.query.maxPrice) {
        queryObj.price.$lte = Number(this.query.maxPrice); // Max price
      }
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort = (this.query.sort as string)?.split(',').join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = (this.query.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
