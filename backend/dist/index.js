import express from "express";
import { PORT } from "./config.js";
const app = express();
app.listen(PORT, () => {
    console.log(`start listening on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Hellow World!!!!!!");
});
app.get("/hi", (req, res) => {
    res.send("HIIIIIIIIIIIIIIII");
});
//# sourceMappingURL=index.js.map