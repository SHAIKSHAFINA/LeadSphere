import express from "express";
import { createLead, getLeads,getSingleLead,updateLead,deleteLead,getLeadStats ,exportLeadsCSV} from "../controllers/leadController";
import authMiddleware from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";
import validationMiddleware from "../middlewares/validationMiddleware";

import {
  createLeadValidation,
} from "../validators/leadValidator";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createLeadValidation,
  validationMiddleware,
  createLead
);
router.get(
  "/stats",
  authMiddleware,
  getLeadStats
);
router.get(
  "/export/csv",
  authMiddleware,
  exportLeadsCSV
);
router.get("/", authMiddleware, getLeads);
router.get(
  "/:id",
  authMiddleware,
  getSingleLead
);

router.put("/:id", authMiddleware, updateLead);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteLead
);
export default router;