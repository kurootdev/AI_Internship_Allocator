import { Candidate } from "../models/candidate.model.js";
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

    const candidate = await Candidate.findById(decodedToken?._id).select(
      "-password"
    );

    if (!candidate) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access Token"
      });
    }

    req.user = candidate;
    next();
  } catch (error) {
    console.log("auth middleware error", error);
    
    return res.status(401).json({
      success: false,
      message: "Invalid access token"
    });
  }
};