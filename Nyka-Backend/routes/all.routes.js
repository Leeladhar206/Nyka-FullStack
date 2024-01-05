const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");
const { UserModel } = require("../model/user.model");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { ProductModel } = require("../model/product.model");

const allRouter = express.Router();

require("dotenv").config();

allRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    req.body.password = hashedPass;

    const newUser = new UserModel(req.body);
    await newUser.save();

    return res.status(201).send({ message: "User created", newUser });
  } catch (error) {
    console.error("Error in user registration:", error);

    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Validation Error", error });
    }
    return res.status(400).send({ message: "Internal Server Error", error });
  }
});

allRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .send({ message: "User not found. Please register to login." });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ message: "Incorrect credentials. Please try again." });
    }

    const userToken = jwt.sign({ userId: existingUser._id }, process.env.Key, {
      expiresIn: "1d",
    });

    return res.status(201).send({
      message: "Login Successful",
      token: userToken,
      user: existingUser,
    });
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(400).send({ message: "Internal Server Error", error });
  }
});

allRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || null;

  try {
    if (token) {
      const loggedOut = await BlackListModel.updateOne(
        {},
        { $addToSet: { blackList: token } },
        { upsert: true }
      );

      res.status(200).send({ message: "Logged out Successfully", loggedOut });
    }
  } catch (error) {
    console.error("Error in user logout:", error);
    res.status(400).send({ message: "Internal Server Error" });
  }
});

allRouter.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res
      .status(200)
      .send({ message: "Products fetched Successfully", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(400).send({ message: "Internal Server Error", error });
  }
});

allRouter.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(200).json({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product fetched Successfully", product });
  } catch (error) {
    console.error("Error fetching Single product details:", error);
    res.status(400).send({ message: "Internal Server Error", error });
  }
});

allRouter.post("/products", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);

    await newProduct.save();
    res
      .status(201)
      .send({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).send({ message: "Internal Server Error", error });
  }
});

allRouter.patch("/products/:id", authMiddleware, async (req, res) => {
  const productId = req.params.id;
// console.log(productId)
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(200).send({ message: "Product not found" });
    }

    res
      .status(204)
      .send({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).send({ message: "Internal Server Error", error });
  }
});

allRouter.delete("/products/:id",authMiddleware, async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(200).send({ message: "Product not found" });
    }

    res
      .status(202)
      .send({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(400).send({ message: "Internal Server Error", error });
  }
});

module.exports = { allRouter };
