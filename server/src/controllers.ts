import { Request, Response } from "express";
import DailyBill from "./models/BillModel";
import DailyExpense from "./models/DailyExpenseModel";
import Product from "./models/ProductModel";

export const addProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;

  if (!name) return res.status(400).json({ message: "Missing Datas" });
  if (!price)
    return res.status(400).json({ message: "Price must be a number" });

  try {
    const product = new Product({ name, price });
    await product.save();

    res.json({ message: "Product added successfully", product }).status(200);
  } catch (error) {
    res.json({ message: (error as Error).message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ message: "Name of item is missing!" });

  try {
    const product = await Product.findOne({ name });
    console.log(product);
    if (!product) return res.status(200).json(null);

    return res.status(400).json([product]);
  } catch (error) {
    res.json({ message: (error as Error).message });
  }
};

export const addDailyBills = async (req: Request, res: Response) => {
  const date = req.params.date;
  const { billItems: items, amount } = req.body;

  const billItems = items.map((item: any) => ({
    name: item.name,
    amount: item.price,
  }));

  const newBill = new DailyBill({ billItems, amount, date });
  const bill = await newBill.save();

  console.log("bill" + bill);

  res.status(200).json(bill);
};

export const getDailyBills = async (req: Request, res: Response) => {
  const date = req.params.date;
  const data = await DailyBill.find({ date });
  console.log(data);
  res.json(data);
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    console.log(products);

    if (!products) return res.status(200).json(null);
    res.status(200).json(products);
  } catch (error) {
    res.json({ message: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({message:'Product deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
