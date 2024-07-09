import express from "express";
const port = 3001;
const app = express();
app.get("/", (req, res) => {
    res.send("Hellow World!!!!!!");
});
app.get("/hi", (req, res) => {
    res.send("HIIIIIIIIIIIIIIII");
});
app.listen(port, () => {
    console.log(`start listening on port ${port}`);
});
//# sourceMappingURL=index.js.map