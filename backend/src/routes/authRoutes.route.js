import { Router } from "express";
import {
  registerUser,
  updateCandidateProfile,
  loginCandidate,
  logoutCandidate,
  getCurrentCandidate,
  recommendIntership,
  getAllCandidates,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { applyForInternship, getAllInternships,userAppliedInternship } from "../controllers/internship.controller.js";
const authRouter = Router();

// Define your auth routes here
authRouter.route("/signup").post(registerUser);
authRouter.route("/signin").post(loginCandidate);
authRouter.route("/update-profile").post(verifyJWT, updateCandidateProfile);
authRouter.route("/logout").post(verifyJWT, logoutCandidate);
authRouter.route("/get").get(verifyJWT, getCurrentCandidate);

authRouter.route("/apply-internship/:internshipId").post(verifyJWT, applyForInternship);
authRouter.route("/recommend").get(verifyJWT, recommendIntership);
authRouter.route("/get-all-internships").get(getAllInternships)
authRouter.route("/get-user-applied-internship").get(verifyJWT,userAppliedInternship);
authRouter.route("/get-all-candidates").get(getAllCandidates);
export default authRouter;
