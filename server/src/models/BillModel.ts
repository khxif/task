import mongoose from "mongoose";
import Product from "./ProductModel";

const billItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
});

const billSchema = new mongoose.Schema({
  billItems: {
    type: [billItem],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const DailyBill = mongoose.model("dailyBill", billSchema);

export default DailyBill;
