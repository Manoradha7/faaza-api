//import required packages
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { client } from "./index.js";
import { ObjectId } from "mongodb";

// generate hashedpassword for the password
async function genPassword(password) {
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function createUser(
  fname,
  lname,
  username,
  email,
  hashedPassword,
  passwordConfirmation
) {
  return await client.db("faaza").collection("users").insertOne({
    fname,
    lname,
    username,
    email,
    password: hashedPassword,
    passwordConfirmation,
    Status: "InActive",
    token: "",
  });
}

async function getUser(userData) {
  return await client.db("faaza").collection("users").findOne(userData);
}

async function getUserByEmail(email) {
  return await client.db("faaza").collection("users").findOne({ email });
}

async function getUserById(id) {
  return await client
    .db("faaza")
    .collection("users")
    .findOne({ _id: ObjectId(id) });
}

async function updateUser(email, token) {
  return await client
    .db("faaza")
    .collection("users")
    .updateOne({ email }, { $set: { token: token } });
}

async function UpdateUserById(id, data) {
  return await client.db("faaza").collection("users").updateOne({ _id: ObjectId(id) }, { $set: data });
}

async function deleteUserById(id) {
  return await client.db('faaza').collection('users').deleteOne({ _id: ObjectId(id) });
}

//product
async function addProduct(productData){
  return await client.db('faaza').collection("product").insertOne(productData);
}

async function getProduct(email){
  return await client.db('faaza').collection('product').find({email}).toArray();
}
async function getProductById(id){
    return await client.db('faaza').collection('product').find({_id:ObjectId(id)}).toArray();
  }
async function getProducts(productData){
    return await client.db('faaza').collection('product').find(productData).toArray();
  }
async function deleteProduct(id){
  return await client.db('faaza').collection('product').deleteOne({_id:ObjectId(id)})
}

//order
async function addOrder(oredrData){
    return await client.db('faaza').collection("order").insertOne({oredrData});
  }
  
  async function getOrder(email){
    return await client.db('faaza').collection('order').find({email}).toArray();
  }
  async function deleteOrder(id){
    return await client.db('faaza').collection('order').deleteOne({_id:ObjectId(id)})
  }

//Mail function for sending the Mail messages
function Mail(email, res, message) {
  const mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: "Mail From Faaza Store",
    html: message,
  };

  mail.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Mail", err);
      res.status(404).send("error");
    } else {
      console.log("Mailstatus :", info.response);
      res.send("Mail Sent For verification");
    }
  });
}

export {
  genPassword,
  Mail,
  getUser,
  createUser,
  updateUser,
  getUserByEmail,
  getUserById,
  UpdateUserById,
  deleteUserById,
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  addOrder,
  getOrder,
  deleteOrder,
  getProductById
};
