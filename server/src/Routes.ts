import { Router } from "express";
import {
  addDailyBills,
  addProduct,
  deleteProduct,
  getAllProducts,
  getDailyBills,
  getProduct,
} from "./controllers";

const router = Router();

router.post("/add-product", addProduct);
router.post("/get-product", getProduct);
router.post("/daily-bills/:date", addDailyBills);
router.get("/get-daily-bills/:date", getDailyBills);
router.get("/get-products", getAllProducts);
router.delete("/get-products/:id", deleteProduct);

export default router;
