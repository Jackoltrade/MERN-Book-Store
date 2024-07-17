import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hellow World!!!!!!");
});
app.post("/books", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});
mongoose
    .connect(mongoDBURL)
    .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
        console.log(`start listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map