import { response } from "express";
import { Candidate } from "../models/candidate.model.js";
import { Internship } from "../models/internships.model.js";
import axios from "axios";

const registerUser = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    contactNumber,
    gender,
    email,
    password,
    confirmPassword,
  } = req.body;

  if (
    [firstName, contactNumber, gender, email, password, confirmPassword].some(
      (field) => field?.trim() === ""
    )
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingCandidate = await Candidate.findOne({
    $or: [{ email }, { contactNumber }],
  });

  if (existingCandidate) {
    return res.status(409).json({
      message: "User with this email or contact number already exists",
    });
  }
  const candidateCount = await Candidate.countDocuments();
  const candidateId = `PMI${String(candidateCount + 1).padStart(5, "0")}`;

  const newCandidate = await Candidate.create({
    candidateId,
    firstName: firstName,
    middleName: middleName || "",
    lastName: lastName || "",
    contactNumber: contactNumber,
    gender: gender,
    email: email,
    password: password,
  });

  if (!newCandidate) {
    return res
      .status(500)
      .json({ message: "Internal server Error creating user" });
  }

  // const token = await newCandidate.generateAccessToken();

  return res
    .status(201)
    .json({ message: "User registered successfully", newCandidate });
};

const loginCandidate = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password is required!",
    });
  }

  const candidate = await Candidate.findOne({ email });

  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  const isPasswordValid = await candidate.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Password is incorrect!",
    });
  }

  const token = await candidate.generateAccessToken();

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "User logged in successfully",
      data: {
        candidate,
        token: token,
      },
    });
};

const updateCandidateProfile = async (req, res) => {
  try {
    // Get candidate ID from authenticated user (assuming middleware sets req.user)
    const candidateId = req.user?._id;

    if (!candidateId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not authenticated",
      });
    }

    // Define fields that can be updated (excluding sensitive/system fields)
    const allowedUpdates = [
      "age",
      "firstName",
      "middleName",
      "lastName",
      "contactNumber",
      "gender",
      "skills",
      "degree",
      "major",
      "cgpa",
      "district",
      "preferredLocations",
      "socialCategory",
      "isRural",
    ];

    // Extract only allowed fields from request body
    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    // Check if there are any valid updates
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
        allowedFields: allowedUpdates,
      });
    }

    // Validate specific fields

    // Age validation
    if (updates.age !== undefined) {
      if (updates.age < 16 || updates.age > 65) {
        return res.status(400).json({
          success: false,
          message: "Age must be between 16 and 65",
        });
      }
    }

    // CGPA validation
    if (updates.cgpa !== undefined) {
      if (updates.cgpa < 0 || updates.cgpa > 10) {
        return res.status(400).json({
          success: false,
          message: "CGPA must be between 0 and 10",
        });
      }
    }

    // Contact number validation
    if (updates.contactNumber !== undefined) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(updates.contactNumber)) {
        return res.status(400).json({
          success: false,
          message: "Contact number must be 10 digits",
        });
      }

      // Check if contact number already exists (excluding current user)
      const existingCandidate = await Candidate.findOne({
        contactNumber: updates.contactNumber,
        _id: { $ne: candidateId },
      });

      if (existingCandidate) {
        return res.status(400).json({
          success: false,
          message: "Contact number already exists",
        });
      }
    }

    // Gender validation
    if (updates.gender !== undefined) {
      const validGenders = ["Male", "Female", "Other"];
      if (!validGenders.includes(updates.gender)) {
        return res.status(400).json({
          success: false,
          message: "Gender must be one of: Male, Female, Other",
        });
      }
    }

    // Social category validation
    if (updates.socialCategory !== undefined) {
      const validCategories = ["OBC", "GENERAL", "EWS", "SC", "ST"];
      if (!validCategories.includes(updates.socialCategory)) {
        return res.status(400).json({
          success: false,
          message: "Social category must be one of: OBC, GENERAL, EWS, SC, ST",
        });
      }
    }

    // Skills validation (ensure it's an array of strings)
    if (updates.skills !== undefined) {
      if (!Array.isArray(updates.skills)) {
        return res.status(400).json({
          success: false,
          message: "Skills must be an array",
        });
      }

      // Filter out empty skills and trim whitespace
      updates.skills = updates.skills
        .filter((skill) => skill && typeof skill === "string")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
    }

    // Preferred locations validation
    if (updates.preferredLocations !== undefined) {
      if (!Array.isArray(updates.preferredLocations)) {
        return res.status(400).json({
          success: false,
          message: "Preferred locations must be an array",
        });
      }

      // Filter out empty locations and trim whitespace
      updates.preferredLocations = updates.preferredLocations
        .filter((location) => location && typeof location === "string")
        .map((location) => location.trim())
        .filter((location) => location.length > 0);
    }

    // Update the candidate profile
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $set: updates },
      {
        new: true, // Return updated document
        runValidators: true, // Run mongoose validations
        select: "-password", // Exclude password from response
      }
    );

    if (!updatedCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        candidate: updatedCandidate,
        updatedFields: Object.keys(updates),
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getCurrentCandidate = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  return res.status(200).json({
    candidate: req.user,
    message: "current user fetched successfully",
  });
};

const logoutCandidate = async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json("candidate logout succesfuuly");
};

const sendRecommendationRequest = async (response) => {
  try {
    const res = await axios.post("http://127.0.0.1:5000/recommend", response);

    // console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const recommendIntership = async (req, res) => {
  try {
    // Get candidate details from authenticated user (set by verifyJWT middleware)
    const candidate = await Candidate.findById(req.user._id)
      .select("-password -createdAt -updatedAt -__v -appliedInternships")
      .lean();

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Get all active internships (deadline not passed)
    const internships = await Internship.find({
      applicationDeadline: { $gt: new Date() },
    })
      .select(
        "internshipId requiredSkills sector locationDistrict minDegree capacity quotas"
      )
      .lean();

    // Format candidate data to match the required output structure
    const formattedCandidate = {
      candidateId: candidate.candidateId,
      skills: candidate.skills || [],
      degree: candidate.degree,
      major: candidate.major || candidate.specialization,
      preferredLocations: candidate.preferredLocations || [],
      pastParticipationCount: candidate.pastParticipationCount || 0,
      socialCategory: candidate.socialCategory || "General",
      isRural: candidate.isRural || false,
    };

    // Format internships to match the exact required output structure
    const formattedInternships = internships.map((internship) => ({
      internshipId: internship.internshipId,
      requiredSkills: internship.requiredSkills,
      sector: internship.sector,
      locationDistrict: internship.locationDistrict,
      minDegree: internship.minDegree,
      capacity: internship.capacity,
      quotas: internship.quotas,
    }));

    // Return the exact format your AI model expects
    const response = {
      candidate: formattedCandidate,
      internships: formattedInternships,
    };

    const data = await sendRecommendationRequest(response);

    let recommendInternships = [];

    const internshipPromises = data.recommendations.map(async (obj) => {
      return await Internship.findOne({ internshipId: obj.internshipId });
    });

    recommendInternships = await Promise.all(internshipPromises);

    return res.status(200).json({
      success: true,
      data: recommendInternships,
    });
  } catch (error) {
    console.error("Error getting internship recommendations:", error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid candidate ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while getting recommendations",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).select("-password");
    res.status(200).json({
      success: true,
      data: candidates,
      count: candidates.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  registerUser,
  updateCandidateProfile,
  loginCandidate,
  logoutCandidate,
  getCurrentCandidate,
  recommendIntership,
};
