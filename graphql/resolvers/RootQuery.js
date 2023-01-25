import Category from "../../models/category";
import Product from "../../models/product";
import Subcategory from "../../models/subcategory";
import Order from "../../models/order";

import generateMongoFilterStages from "../../utils/generateMongoFilterStages";
import dbConnect from "../../lib/dbConnect";
import { jwtVerify } from "jose";
import { getCookie } from "cookies-next";

const RootQuery = {
  products: async (_parent, args = {}, { req, res }, _info) => {
    // if (sessionExpired) throw new Error("Session expired");
    await dbConnect();

    const token = req.cookies.token;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const stat = await jwtVerify(req.cookies.token, secret);

    const { input } = args;

    const limit = input?.limit ? input.limit : null;

    const skip = input?.skip ? input.skip : 0;

    const sort = input?.sort ? input.sort : "_id";
    const order = input?.order ? input.order : 1;

    const search = input?.search || null;

    const filter = input?.filter;

    const stages = [
      // {localField} should be a field from this Product Model
      // {foreignField} should be a field on the {from} collection
      // {as} specifies where the found data should be temporarily inserted

      // {$lookup} expects that {localField} and {foreignField} are an exact match

      // {$unwind} takes the data up by one level, removing the enclosing []

      // In order to sort product.category.name, "category.name" is to be
      // the expected sort value.

      // Can filter by
      // • Category
      // • Subcategory
      // • X stock
      // • X price

      // {
      //   $lookup: {
      //     from: 'categories',
      //     localField: 'category',
      //     foreignField: '_id',
      //     as: 'category',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'subcategories',
      //     localField: 'subcategory',
      //     foreignField: '_id',
      //     as: 'subcategory',
      //   },
      // },
      // { $unwind: '$category' },
      // { $unwind: '$subcategory' },
      // {
      //   $match: {
      //     price: { $gte: 60, $lte: 70 },
      //   },
      // },
      // {
      //   $match: {
      //     'category.name': { $in: ['food', 'apparel'] },
      //   },
      // },
      // {
      //   $match: {
      //     'subcategory.name': { $in: ['shirt', 'apparel'] },
      //   },
      // },
      {
        $sort: { [sort]: order },
      },
      { $skip: skip },
    ];

    if (limit) stages.push({ $limit: limit });

    generateMongoFilterStages(filter, stages);

    // Must populate category and subcategory data
    // early in aggregation pipeline
    stages.unshift(
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      { $unwind: "$category" },
      { $unwind: "$subcategory" }
    );

    // Search operation must be the first stage
    if (search) {
      stages.unshift({
        $search: {
          text: {
            path: "name",
            query: search,
            fuzzy: {},
          },
        },
      });
    }

    const products = await Product.aggregate(stages);

    return products;
  },
  getProduct: async (_parent, args) => {
    // @TODO: Take in product id only, having
    // an input object is overkill
    // Rename resolvers

    const input = args.input;

    await dbConnect();

    const product = await Product.findById(input._id)
      .populate("category")
      .populate("subcategory");

    return product;
  },
  getAllCategories: async (_parent, { name }) => {
    await dbConnect();
    /*
    Nested population
    https://stackoverflow.com/a/34444982/15676430

    Deep population
    https://mongoosejs.com/docs/populate.html#deep-populate


    And you can join more than one deep level.

    Edit 03/17/2021: This is the library's implementation, what it do behind the scene is 
    make another query to fetch thing for you and then join in memory. 
    Although this work but we really should not rely on. It will make your db design look like SQL tables. 
    This is costly operation and does not scale well. Please try to design your document so that it reduce join.

    edited May 25, 2021 at 18:13
    answered Dec 23, 2015 at 22:58

    James

    @christopher-warren
    Since we are not expecting our data tree to be too large,
    deep population like this is okay and still very performant.

    Consideration - the first 2 populate methods called are older, and
    we should probably find a solution that takes care of all of our populations
    in one method
*/
    const categories = await Category.find(name ? { name } : {})
      .populate("products")
      .populate("subcategories")
      .populate({
        path: "products",
        populate: {
          path: "subcategory",
          model: "Subcategory",
        },
      });
    // console.log(categories)
    return categories;
  },
  getAllSubcategories: async (_parent, { limit, name }) => {
    await dbConnect();
    const subcategories = await Subcategory.find(name ? { name } : {})
      .populate("products")
      .populate("category")
      .populate({
        path: "products",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .limit(limit ? limit : null);

    return subcategories;
  },
  getOrder: async (_parent, { input }) => {
    await dbConnect();
    const order = await Order.findById(input).populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    return order.populate("products");
  },
  getAllOrders: async (_parent, { input }) => {
    await dbConnect();

    const limit = input?.limit ? input.limit : null;
    const skip = input?.skip ? input.skip : 0;

    const sort = input?.sort ? input.sort : null;
    const order = input?.order ? input.order : 1;

    const filter = input?.filter;

    const search = input?.search || null;

    const stages = [
      {
        $sort: { [sort]: order },
      },
      { $skip: skip },

      // {
      //   $match: {
      //     'status.paid': true,
      //   },
      // },
    ];

    if (limit) stages.push({ $limit: limit });

    generateMongoFilterStages(filter, stages);

    if (search) {
      stages.unshift({
        $match: {
          orderNumber: parseFloat(search),
        },
      });
    }

    const orders = await Order.aggregate(stages);

    return orders;
  },
};

export default RootQuery;
