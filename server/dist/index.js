"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Routes_1 = __importDefault(require("./Routes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    });
});
app.use("/api", Routes_1.default);
app.get("/", (req, res) => {
    res.json("hey");
});