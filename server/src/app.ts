import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./context";
import { appRouter } from "./routers/app.router";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(process.env.PORT);
