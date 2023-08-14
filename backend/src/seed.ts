import products from "../data.json";
import * as dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect";
import { Product } from "./model/productSchema";
import { Category } from "./model/categorySchema";
dotenv.config();
dbConnect();
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("all products are added");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const createCategory = async () => {
  try {
    const category = await Category.find();
    if (category.length > 0) {
      throw new Error("Category already exist, no need to add");
    }
    const categoryFromProductData = getCategoryFromProductData();
    await Category.insertMany(categoryFromProductData);
    console.log("all categories are inserted");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

const getCategoryFromProductData = () => {
  const prod = products;
  const categories = new Array();
  let eachCategorySet = new Set();
  for (let i = 0; i < prod.length; i++) {
    let eachCategory = {
      title: prod[i]["category"],
    };

    categories.push(eachCategory);
  }
  const arrayUniqueCategories = [...new Map(categories.map((item) => [item["title"], item])).values()];
  console.log(arrayUniqueCategories);
  return arrayUniqueCategories;
};

// getCategoryFromProductData();
// createCategory();
seedProducts();
