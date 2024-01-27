import { Router } from "express";
import {
  addDailyBills,
  addProduct,
  getDailyBills,
  getDailyExpenses,
  getProduct,
  updateDailyExpense,
} from "./controllers";

const router = Router();

router.post("/add-product", addProduct);
router.post("/get-product", getProduct);
// router.post("/daily-expense/:date", updateDailyExpense);
// router.get("/get-daily-expenses/:date", getDailyExpenses);
router.post("/daily-bills/:date", addDailyBills);
router.get('/get-daily-bills/:date',getDailyBills)

export default router;
