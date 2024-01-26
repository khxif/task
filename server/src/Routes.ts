import { Router } from "express";
import {
  addProduct,
  getDailyExpenses,
  getProduct,
  updateDailyExpense,
} from "./controllers";

const router = Router();

router.post("/add-product", addProduct);
router.post("/get-product", getProduct);
router.post("/daily-expense/:date", updateDailyExpense);
router.get("/get-daily-expenses/:date", getDailyExpenses);

export default router;
