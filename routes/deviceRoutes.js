import express from "express";
import {
  getDevices,
  getWhitelist,
  addWhitelistDevice,
  removeWhitelistDevice
} from "../controllers/deviceController.js";

const router = express.Router();

router.get("/devices", getDevices);
router.get("/whitelist", getWhitelist);

router.post("/whitelist", addWhitelistDevice);

router.delete("/whitelist/:mac", removeWhitelistDevice);

export default router;
