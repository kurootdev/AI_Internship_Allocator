import { Router } from "express";
import { verifyJWT } from "../middlewares/employee.middleware.js"
import { getCurrentEmployee, loginEmployee, logoutEmployee, registerEmployee,getEmployeeInternships, getAllEmployees } from "../controllers/employee.conroller.js";
import { getInternshipCandidates, postInternship,viewAllocation } from "../controllers/internship.controller.js";

const employeeRouter = Router();

// Define your auth routes here
employeeRouter.route("/signup").post(registerEmployee);
employeeRouter.route("/signin").post(loginEmployee);
employeeRouter.route("/logout").post(verifyJWT,logoutEmployee);
employeeRouter.route("/get").get(verifyJWT,getCurrentEmployee);

employeeRouter.post('/post-internship', verifyJWT, postInternship);
employeeRouter.route("/get-candidates/:internshipId").get(verifyJWT,getInternshipCandidates);
employeeRouter.route("/get-posted-internship").get(verifyJWT,getEmployeeInternships);
employeeRouter.route("/view-allocation/:internshipId").get(viewAllocation);
employeeRouter.route("/get-all-employee").get(getAllEmployees);

// employeeRouter.put('/internships/:internshipId', authenticateEmployee, updateInternship);
// employeeRouter.delete('/internships/:internshipId', authenticateEmployee, deleteInternship);
    
export default employeeRouter;