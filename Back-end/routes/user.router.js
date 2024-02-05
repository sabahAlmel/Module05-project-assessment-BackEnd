import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getOneUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middelwares.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.put("/update", authenticate, updateUser);
userRouter.delete("/delete", authenticate, deleteUser);
userRouter.get("/readOne", authenticate, getOneUser);

export { userRouter };
