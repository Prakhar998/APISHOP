import express from "express";
import { SystemController } from "../controllers/systemController";

const router = express.Router();
router.get("/health", SystemController.healthCheck);

export { router as SystemRoute };
