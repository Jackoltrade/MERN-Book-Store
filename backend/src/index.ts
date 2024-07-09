import express, { Express, Request, Response } from "express";

const port = 3001;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hellow World!!!!!!");
});

app.get("/hi", (req: Request, res: Response) => {
    res.send("HIIIIIIIIIIIIIIII");
});

app.listen(port, () => {
    console.log(`start listening on port ${port}`);
});
