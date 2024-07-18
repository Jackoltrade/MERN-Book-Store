import express, { Express, Request, Response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { title } from "process";

const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hellow World!!!!!!");
});

app.post("/books", async (req: Request, res: Response) => {
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

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// get all books
app.get("/books", async (req: Request, res: Response) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// get a book by id
app.get("/books/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// update a book by id
app.put("/books/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).send({
                message: `invalid book id: ${id}.`
            })
        }

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        }
        
        if (typeof(req.body.title) !== "string") {
            return res.status(400).send({
                message: "Title must be a string"
            })
        }
        if (typeof(req.body.author) !== "string") {
            return res.status(400).send({
                message: "Author must be a string"
            })
        }
        if (typeof(req.body.publishYear) !== "number") {
            return res.status(400).send({
                message: "publishYear must be a number"
            })
        }

        const result = await Book.findByIdAndUpdate(id, req.body);
        
        if (result) {
            return res.status(200).send({message: `book id ${id} updated successfuly`});
        }
        return res.status(404).send({message: `book id ${id} not found`});

    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

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
