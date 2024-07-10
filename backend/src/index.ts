import express, { Express, Request, Response } from "express";
import { PORT } from "./config.js";

const app: Express = express();

app.listen(PORT, () => {
    console.log(`start listening on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hellow World!!!!!!");
});

app.get("/hi", (req: Request, res: Response) => {
    res.send("HIIIIIIIIIIIIIIII");
});

