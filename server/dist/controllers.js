"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyExpenses = exports.updateDailyExpense = exports.getProduct = exports.addProduct = void 0;
const ProductModel_1 = __importDefault(require("./ProductModel"));
const DailyExpenseModel_1 = __importDefault(require("./models/DailyExpenseModel"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    if (!name)
        return res.status(400).json({ message: "Missing Datas" });
    if (!price)
        return res.status(400).json({ message: "Price must be a number" });
    try {
        const product = new ProductModel_1.default({ name, price });
        yield product.save();
        res.json({ message: "Product added successfully", product }).status(200);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.addProduct = addProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name)
        return res.status(400).json({ message: "Name of item is missing!" });
    try {
        const product = yield ProductModel_1.default.findOne({ name });
        console.log(product);
        return res.status(400).json([product]);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getProduct = getProduct;
const updateDailyExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.params.date;
    const { amount } = req.body;
    if (!date || !amount)
        return res.status(400).json({ message: "Missing Details" });
    const currentExpense = yield DailyExpenseModel_1.default.find({ date });
    if (!currentExpense || currentExpense.length === 0) {
        const newExpense = new DailyExpenseModel_1.default({ amount, date });
        const data = yield newExpense.save();
        return res.status(200).json({ message: "Expense added" });
    }
    const currentTotal = currentExpense.reduce((acc, current) => acc + current.amount, 0);
    const resp = yield DailyExpenseModel_1.default.findOneAndUpdate({ date: date }, { $set: { amount: currentTotal + amount } }, { upsert: false });
    // console.log("response" + resp);
    return res.status(200).json({ message: "Expense updated" });
});
exports.updateDailyExpense = updateDailyExpense;
const getDailyExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.params.date;
    const data = yield DailyExpenseModel_1.default.findOne({ date });
    if (!data)
        return res.status(200).json(null);
    res.json(data);
});
exports.getDailyExpenses = getDailyExpenses;
