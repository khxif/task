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

    return res.status(400).json([product]);
  } catch (error) {
    res.json({ message: (error as Error).message });
  }
};

export const updateDailyExpense = async (req: Request, res: Response) => {
  const date = req.params.date;
  const { amount } = req.body;
  if (!date || !amount)
    return res.status(400).json({ message: "Missing Details" });

  const currentExpense: any = await DailyExpense.find({ date });

  if (!currentExpense || currentExpense.length === 0) {
    const newExpense = new DailyExpense({ amount, date });
    const data = await newExpense.save();
    return res.status(200).json({ message: "Expense added" });
  }

  const currentTotal = currentExpense.reduce(
    (acc: any, current: any) => acc + current.amount,
    0
  );
  const resp = await DailyExpense.findOneAndUpdate(
    { date: date },
    { $set: { amount: currentTotal + amount } },
    { upsert: false }
  );
  // console.log("response" + resp);

  return res.status(200).json({ message: "Expense updated" });
};

export const getDailyExpenses = async (req: Request, res: Response) => {
  const date = req.params.date;

  const data = await DailyExpense.findOne({ date });
  if (!data) return res.status(200).json(null);
  res.json(data);
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
  const data = await DailyBill.find({date})
  console.log(data);
  res.json(data)
}