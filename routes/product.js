import express from "express";
const router = express.Router();
import { auth } from "../auth.js";
import { addProduct, getProduct, deleteProduct,getProducts,getProductById } from "../helper.js";

router.route("/").post( async (req, res) => {
  const data = req.body;
  await addProduct(data);
  res.status(200).send("Product Added Successfully");
});
router.route("/").get(async (req, res) => {
    const products = await getProducts();
    res.status(200).send(products);
  });
  router.route("/:id").get(async (req, res) => {
 const {id} = req.params;
    const product = await getProductById(id);
    res.status(200).send(product);
  });
router.route("/:email").get(auth, async (req, res) => {
  const { email } = req.params;
  const products = await getProduct(email);
  res.status(200).send(products);
});
router.route("/:id").delete((req, res) => {
  const { id } = req.params;
  deleteProduct(id);
  res.status(200).send({ Message: "Product Deleted Successfully" });
});
export const productRouter = router;
