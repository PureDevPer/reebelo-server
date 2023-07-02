import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response, Express } from "express";
import { HTTP_STATUS_CODES } from "./constants/httpStatusCodes";
import { api } from "./api/api";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", api());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.error(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_ERROR).json({
            error: err?.message,
        });
    } else {
        next();
    }
});

app.use((req: Request, res: Response) => {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Not Found" });
});

const PORT: string = process.env.PORT || "5000";

const handleListening = () => console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);

// export default app;
