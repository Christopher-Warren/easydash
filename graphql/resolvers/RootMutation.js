import normalizeInputs from "../../utils/normalizeInputs";
import bcrypt from "bcryptjs";

import { jwtVerify, SignJWT } from "jose";

import User from "../../models/user";
import Product from "../../models/product";
import Category from "../../models/category";
import Subcategory from "../../models/subcategory";
import Order from "../../models/order";

import S3 from "aws-sdk/clients/s3";
import dbConnect from "../../lib/dbConnect";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

const RootMutation = {
  createProduct: async (
    _parent,
    { productInput, sessionExpired },
    { req, res }
  ) => {
    await dbConnect();

    // check authentication
    const JWT_SECRET = process.env.JWT_SECRET;
    const secret = new TextEncoder().encode(JWT_SECRET);

    console.log("mutation", await jwtVerify(req.cookies.token, secret));

    return null;
    if (sessionExpired) throw new Error("Session expired");
    if (!isAdmin) throw new Error("Easydash runs in read only mode");
    if (!productInput.subcategory)
      throw new Error("Please enter a Subcategory");
    if (productInput.category === "new-category")
      throw new Error(`Category "new-category" is unavailible`);

    if (productInput.subcategory === "new-subcategory")
      throw new Error(`Subcategory "new-subcategory" is unavailible`);

    normalizeInputs(productInput);

    // Ensure that the input category exists
    let foundCategory = await Category.findOne({
      name: productInput.category,
    });

    if (!foundCategory) {
      foundCategory = await Category.create({
        name: productInput.category,
      });
    }

    // If a subcategory was entered, create the subcategory
    // and assign it to the product
    let foundSubcategory = await Subcategory.findOne({
      name: productInput.subcategory,
    });
    if (!foundSubcategory) {
      foundSubcategory = await Subcategory.create({
        name: productInput.subcategory,
        category: foundCategory._id,
      });
    }

    // Create the product, with category _id
    const createdProduct = await Product.create({
      name: productInput.name,
      category: foundCategory._id,
      subcategory: foundSubcategory._id,
      description: productInput.description,
      price: productInput.price,
      stock: productInput.stock,
      createdAt: Date.now(),
    });
    const { name, category, description, price, stock, date, _id } =
      createdProduct;

    // Add the product to the category in which it belogs to
    // Add subcategory to the category if exists
    const updateCat = await Category.findByIdAndUpdate(foundCategory._id, {
      products: [...foundCategory.products, _id],
      subcategories: foundCategory.subcategories.includes(foundSubcategory._id)
        ? [...foundCategory.subcategories]
        : [...foundCategory.subcategories, foundSubcategory._id],
    }).populate("products");

    const updateSubcat = await Subcategory.findByIdAndUpdate(
      foundSubcategory._id,
      {
        products: [...foundSubcategory.products, _id],
      }
    ).populate("products");

    return {
      name,
      category,
      description,
      price,
      stock,
      date,
      _id,
      category: updateCat,
      subcategory: updateSubcat,
    };
  },
  modifyProduct: async (
    _parent,
    { productInput, sessionExpired },
    { isAdmin }
  ) => {
    await dbConnect();
    if (sessionExpired) throw new Error("Session expired");
    if (!isAdmin) throw new Error("Easydash runs in read only mode");

    if (!productInput.subcategory && productInput.category)
      throw new Error("Must enter a subcategory when changing category.");

    if (productInput.category === "new-category")
      throw new Error(`Category "new-category" is unavailible`);

    if (productInput.subcategory === "new-subcategory")
      throw new Error(`Subcategory "new-subcategory" is unavailible`);

    normalizeInputs(productInput);
    const { _id: ID } = productInput;
    const { name } = productInput;
    const { description } = productInput;
    const { price } = productInput;
    const { stock } = productInput;
    const { category: categoryName } = productInput;
    const { subcategory: subcategoryName } = productInput;

    const modifiedProduct = await Product.findById(ID);

    const oldCategory = await Category.findById(modifiedProduct.category);
    const oldSubcategory = await Subcategory.findById(
      modifiedProduct.subcategory
    );

    if (name) modifiedProduct.name = name;
    if (description) modifiedProduct.description = description;
    if (price) modifiedProduct.price = price;
    if (stock) modifiedProduct.stock = stock;

    // Handle case where:
    // New category is entered
    const existantCategory = await Category.findOne({ name: categoryName });
    const existantSubcategory = await Subcategory.findOne({
      name: subcategoryName,
    });

    if (categoryName && categoryName !== oldCategory.name) {
      // When destination category and subcategory exist,
      // update data, no new categories or subcategories
      // are needed
      if (existantCategory && existantSubcategory) {
        existantCategory.products.push(ID);
        existantSubcategory.products.push(ID);

        modifiedProduct.category = existantCategory._id;
        modifiedProduct.subcategory = existantSubcategory._id;
      }
      // Destination category exists, but a new subcategory
      // needs to be created
      if (existantCategory && !existantSubcategory) {
        // create new subcategory and update data
        const newSubcategory = await Subcategory.create({
          name: subcategory,
          category: existantCategory._id,
          products: [ID],
        });

        existantCategory.subcategories.push(newSubcategory._id);
        existantCategory.products.push(ID);

        modifiedProduct.subcategory = newSubcategory._id;
        modifiedProduct.category = existantCategory._id;
      }

      // Case where brand new category is entered
      if (!existantCategory) {
        const newCategory = await Category.create({
          name: categoryName,
          products: [ID],
        });
        const newSubcategory = await Subcategory.create({
          name: subcategoryName,
          products: [ID],
          category: newCategory._id,
        });
        newCategory.subcategories = [newSubcategory._id];

        modifiedProduct.category = newCategory._id;
        modifiedProduct.subcategory = newSubcategory._id;

        newSubcategory.save();
        newCategory.save();
      }

      // Remove product from old category and subcategory

      oldCategory.products = oldCategory.products.filter(
        (product) => product.toString() !== ID
      );
      oldSubcategory.products = oldSubcategory.products.filter(
        (product) => product.toString() !== ID
      );
    }

    if (categoryName === oldCategory.name || !categoryName) {
      if (!subcategory) return;

      if (existantSubcategory) {
        modifiedProduct.subcategory = existantSubcategory._id;
        existantSubcategory.products.push(ID);
      }
      if (!existantSubcategory) {
        const newSubcategory = await Subcategory.create({
          name: subcategoryName,
          category: modifiedProduct.category,
          products: [ID],
        });
        oldCategory.subcategories.push(newSubcategory._id);
        modifiedProduct.subcategory = newSubcategory._id;
      }
      oldSubcategory.products = oldSubcategory.products.filter(
        (product) => product.toString() !== ID
      );
    }

    try {
      if (existantCategory) {
        if (existantCategory._id.toString() !== oldCategory._id.toString()) {
          await existantCategory.save();
        }
      }
      if (existantSubcategory) {
        if (
          existantSubcategory._id.toString() !== oldSubcategory._id.toString()
        ) {
          await existantSubcategory.save();
        }
      }

      await oldCategory.save();
      await oldSubcategory.save();

      await modifiedProduct.save();
    } catch (error) {
      console.log(error);
    }
    // Remove categories that have no products
    const finalProduct = await Product.findById(ID)
      .populate("category")
      .populate("subcategory");

    return finalProduct;
  },
  deleteProducts: async (
    _parent,
    { productIds, sessionExpired },
    { isAdmin }
  ) => {
    await dbConnect();
    if (sessionExpired) throw new Error("Session expired");
    if (!isAdmin) throw new Error("Easydash runs in read only mode");
    const s3 = new S3({ apiVersion: "2006-03-01", region: "us-east-2" });

    let deletedCount = 0;
    const removedProducts = productIds.map(async (productId) => {
      const product = await Product.findOneAndDelete({ _id: productId });

      const data = await s3
        .listObjects({
          Bucket: "easydashbucket",
          Prefix: `product_photos/${productId}`,
        })
        .promise();

      const imageKeys = data.Contents.map((val) => {
        return { Key: val.Key };
      });

      let deletedImages;
      if (imageKeys.length > 0) {
        deletedImages = await s3
          .deleteObjects({
            Bucket: "easydashbucket",
            Delete: { Objects: imageKeys },
          })
          .promise();
      }

      deletedCount++;

      return product;
    });

    const removedCategoryProducts = await Category.updateMany(
      { products: { $in: productIds } },
      { $pull: { products: { $in: productIds } } }
    );
    const removedSubcategoryProducts = await Subcategory.updateMany(
      { products: { $in: productIds } },
      { $pull: { products: { $in: productIds } } }
    );

    const oldcat = await Category.deleteMany({ products: [] });
    const oldsub = await Subcategory.deleteMany({ products: [] });

    return removedProducts.length.toString();
  },
  createOrder: async (_parent, { orderInput }) => {
    await dbConnect();
    let orderNumber = await Order.count();
    orderNumber += 100000;

    const { billingInput } = orderInput;
    const { shippingInput } = orderInput;

    // Prevent orders from being created
    // if qty exceeds items in stock
    for (const item of orderInput.products) {
      const product = await Product.findOne({ _id: item.product });
      if (product.stock < item.qty)
        throw new Error(
          "Selected qty. cannot exceed the amount of items in stock"
        );
    }

    // Initialize order
    const order = await Order.create({
      orderNumber,
      createdAt: Date.now(),
      products: orderInput.products,
      status: {
        processed: false,
        paid: false,
        fulfilled: false,
      },
      billingInfo: billingInput,
      shippingInfo: shippingInput,
    });

    // Populate products field so we can access the item prices
    await order.populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    // Generate the sum of each ordered product & qty
    const productSum = order.products.map((obj) => {
      obj.sum = obj.product.price * obj.qty;
      return obj;
    });
    order.products = productSum;

    // Generate the order total
    const total = order.products.reduce((acc, obj) => {
      return acc + obj.sum;
    }, 0);
    order.total = total;

    // Remove product from stock
    order.products.forEach(async (val) => {
      const product = await Product.findOne({ _id: val.product._id });
      product.stock -= val.qty;

      await product.save();
    });

    await order.save();
    await order.populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    return order;
  },
  createUser: async (_parent, { userInput }) => {
    await dbConnect();
    try {
      const existingUser = await User.findOne({ email: userInput.email });
      if (existingUser) {
        throw new Error("User already exists.");
      }
      const hashedPassword = await bcrypt.hash(userInput.password, 12);
      let role;
      // Check whitelist to assign user role
      // then save the role in our db
      if (userInput.email === process.env.ADMIN_ROLE) {
        role = "ADMIN";
      } else if (userInput.email === process.env.USER_ROLE) {
        role = "USER";
      } else {
        role = "CUSTOMER";
      }
      const user = new User({
        email: userInput.email,
        password: hashedPassword,
        role: role,
      });
      const result = await user.save();

      return {
        ...result._doc,
        _id: result.id,
        password: null,
        role: role,
      };
    } catch (err) {
      throw { err };
    }
  },
  login: async (_parent, { email, password }, { req, res }) => {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid password or email address");

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual || !user) throw new Error("Invalid password or email address");

    const alg = "HS256";
    const JWT_SECRET = process.env.JWT_SECRET;
    const secret = new TextEncoder().encode(JWT_SECRET);

    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("10s")
      .sign(secret);

    console.log("token: ", token);

    // const token = jwt.sign(
    //   { userId: user.id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "7d" }
    // );

    // We can set a maxAge to infinite, and trigger session expired
    // err based off jwt verify.
    // maxAge: 60000 * 60 * 24 * 7,

    // Need to change this to use 'jose'
    setCookie("token", token, {
      // Expires after 7 days
      req,
      res,
      maxAge: 60000 * 60 * 24 * 7 * 2,
      httpOnly: true,
      sameSite: true,
    });

    return { userId: user.id, email: email, role: user.role };
  },
  logout: (_parent, _args, { req, res }) => {
    deleteCookie("token", { req, res });
    // On frontend we need to remove 'user' localstorage item,
    // and update isLoggedInVar

    return { message: "You have logged out successfully" };
  },
};

export default RootMutation;
