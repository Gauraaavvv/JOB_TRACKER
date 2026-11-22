import { createjobController, getjobapplicationbyId, getAllJobs, updateJobController, deleteJobController } from "../controllers/jobController.js"
import express from "express"
import { authMiddleware } from "../middlewares/authmiddleware.js"

const router = express.Router()

router.use(authMiddleware)

router.post("/", createjobController)
router.get("/", getAllJobs)
router.get("/:id", getjobapplicationbyId)
router.patch("/:id", updateJobController)
router.delete("/:id", deleteJobController)

export default router