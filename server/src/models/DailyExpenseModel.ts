import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const DailyExpense = mongoose.model("daily-expense", expenseSchema);

export default DailyExpense;
