import express from "express";
const router = express.Router();
import { auth } from "../auth.js";
import { addOrder, getOrder, deleteOrder,getProductById } from "../helper.js";

router.route("/:id").post(async (req, res) => {
  const data = req.body;
  console.log(data)
  await addOrder(data);
  res.status(200).send("Order Added Successfully");
});

router.route("/:email").get(auth, async (req, res) => {
  const { email } = req.params;
  const orders = await getOrder(email);
  res.status(200).send(orders);
});
router.route("/:id").delete((req, res) => {
  const { id } = req.params;
  deleteOrder(id);
  res.status(200).send({ Message: "Order Deleted Successfully" });
});
export const orderRouter = router;
