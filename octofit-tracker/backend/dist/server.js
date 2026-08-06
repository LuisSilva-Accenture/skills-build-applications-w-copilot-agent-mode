"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./config/database.js");
const api_js_1 = __importDefault(require("./routes/api.js"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        baseUrl,
    });
});
app.use('/api', api_js_1.default);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
