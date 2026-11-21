import { createjobController, getjobapplicationbyId, getAllJobs, updateJobController, deleteJobController } from "../controllers/jobController.js"
import express from "express"

const router = express.Router()

router.post("/", createjobController)
router.get("/", getAllJobs)
router.get("/:id", getjobapplicationbyId)
router.patch("/:id", updateJobController)
router.delete("/:id", deleteJobController)

export default router