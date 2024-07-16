import axios from "axios";
import { v4 as uuid } from "uuid";

const queryParams = {
  companyName: "goMart",
  clientID: "905d03a6-f564-44e6-8095-b0dad9da6c3e",
  clientSecret: "MVLBweGSrXrtNYxn",
  ownerName: "Madhav Ganesan",
  ownerEmail: "125156066@gmail.com",
  rollNo: "125156066",
};

// const categories = [
//     "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "House", "Keypad",
//     "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"
// ];

// const companies = ["MYN","FLP", "SNP", "MYN", "AZO"];

const categories = ["Phone"];

const companies = ["MYN", "FLP"];

let Products = [];

async function getProducts(company, category, token) {
  try {
    const response = await axios.get(
      `http://20.244.56.144/test/companies/${company}/categories/${category}/products`,
      {
        params: {
          top: 5,
          minPrice: 100,
          maxPrice: 1000,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching data for company: ${company}, category: ${category}`,
      error.message
    );
    return [];
  }
}

const fetchAndStoreData = async (req, res) => {
  console.log("sdf");
  let token;

  await axios
    .post(`http://20.244.56.144/test/auth`, queryParams)
    .then((response) => {
      console.log("Data:", response.data);
      console.log(response.data.access_token);
      token = response.data.access_token;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  console.log("next");
  for (const category of categories) {
    for (const company of companies) {
      const products = await getProducts(company, category, token);
      products.forEach((product) => {
        product.id = uuid();
        product.company = company;
        product.category = category;
      });
      products.forEach((product) => {
        Products.push(product);
      });
      // Products.push(products)
    }
  }
  console.log("Fetched products:", Products);
};

fetchAndStoreData();

const check = (req, res) => {
  try {
    res.json({ message: "Hi" });
  } catch (error) {
    res.json({ message: error });
  }
};

const getProductsByCategoryCompanyAndPrice = (
  data,
  categoryName,
  minPrice,
  maxPrice
) => {
  const flattenedData = data.flat();
  return flattenedData.filter(
    (product) =>
      product.category === categoryName &&
      product.price >= minPrice &&
      product.price <= maxPrice
  );
};

const getEachProduct = (req, res) => {
  try {
    const { top, minPrice, maxPrice } = req.query;
    const { categoryname } = req.params;
    console.log(minPrice, maxPrice, categoryname);

    if (minPrice === undefined || maxPrice === undefined) {
      return res
        .status(300)
        .json({
          message: "Category, company, minPrice, and maxPrice are required",
        });
    }
    const minPriceNum = parseFloat(minPrice);
    const maxPriceNum = parseFloat(maxPrice);

    const result = getProductsByCategoryCompanyAndPrice(
      Products,
      categoryname,
      minPriceNum,
      maxPriceNum
    );
    
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getSpecificProducts = (req, res) => {
  try {
    console.log("fff");
    const { categoryname, productid } = req.params;

    const product = Products.find(
      (each) => each.id === productid && each.category === categoryname
    );
    console.log(product);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

const getAll = (req, res) => {
  try {
    console.log(Products);
    res.json(Products);
  } catch (error) {
    res.json({ message: error });
  }
};

export { check, getAll, getEachProduct, getSpecificProducts };
