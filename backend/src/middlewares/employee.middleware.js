import { Employee }from "../models/employee.model.js" 
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request"
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const employee = await Employee.findById(decodedToken?._id).select(
      "-password"
    );

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access Token"
      });
    }

    req.user = employee;
    next();
  } catch (error) {
    console.log("auth middleware error", error);
    
    return res.status(401).json({
      success: false,
      message: "Invalid access token"
    });
  }
};