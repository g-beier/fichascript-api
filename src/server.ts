import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config";
import featRoutes from "./api/feats";
import originRoutes from "./api/origins";

const router = express();

// MONGOOSE
mongoose
  .connect(config.mongo.url, {
    w: "majority",
    retryWrites: true,
    dbName: "tormenta20",
  })
  .then(() => {
    console.log("connected");
    StartServer();
  })
  .catch((err) => {
    console.error(err);
  });

const StartServer = (): void => {
  router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // RULES

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      res.status(200).json({});
    }

    next();
  });

  // routes

  router.use("/api/feats", featRoutes);
  router.use("/api/origins", originRoutes);

  // ping - healthcheck
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );
  // error - didnt use any route
  router.use((req, res, next) => {
    const error = new Error("not found");
    res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => {
    console.log("server running");
  });
};
