// import {Request, Response } from "express";
// const express = require('express');
// const router = express.Router();
// import usersRouter from './users.ts'

// router.use("/users", usersRouter);

// export default router;

// import { Router } from "express";
// import { userRoutes } from "./users";

// const router = Router();

// router.use("/user", userRoutes);

// export { router as allRoutes };

import express, { Request, Response, Router } from "express";
import usersRouter from "./users";
import packagesRouter from "./packages";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Api funcionando!" }).status(200);
});

router.use("/users", usersRouter);
router.use("/packages", packagesRouter);

export default router;
