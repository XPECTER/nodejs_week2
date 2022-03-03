import express, { Request, Response, NextFunction } from "express"; 
import helmet from "helmet";
import cors from "cors";
import requestIp from "request-ip";
import { createConnection } from "typeorm";

const port = 3000;
const app = express();

import userRouter from "./routes/user";
import postRouter from "./routes/post";

const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Method:", req.method, "Request IP :", requestIp.getClientIp(req), ", Request URL:", req.originalUrl, " - ", new Date());
    next();
};

app.use(helmet());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.hidePoweredBy());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestMiddleware);

app.use("/api", [userRouter, postRouter]);

app.get("/", (req: Request, res: Response) => {
    res.send("root page made by typescript");
});

createConnection()
    .then(() => {
        console.log("DB Connection");
        
        app.listen(port, "0.0.0.0", () => {
            console.log("Express server listening on port :", port);
        });
    })
    .catch((error) => {
        console.log(error);
    });

export default app;