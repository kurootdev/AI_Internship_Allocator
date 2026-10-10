import { Employee } from "../models/employee.model.js";
import { Internship } from "../models/internships.model.js";
import { Candidate } from "../models/candidate.model.js";
import mongoose from "mongoose";
import axios from "axios";

const handleAllocate = async (response) => {
  try {
    console.log(response)
    const res = await axios.post("http://127.0.0.1:5000/allocate", response);

    console.log("Allocation Result:", res.data.allottedInternshipToCandidates);
    return res.data.allottedInternshipToCandidates;
  } catch (err) {
    console.error("Error allocating:", err);
  }
};

const postInternship = async (req, res) => {
  try {
    const {
      title,
      sector,
      requiredSkills,
      minDegree,
      minCgpa,
      capacity,
      locationDistrict,
      isRemoteAllowed,
      stipend,
      applicationDeadline,
      duration,
      quotas,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "title",
      "sector",
      "requiredSkills",
      "minDegree",
      "minCgpa",
      "capacity",
      "stipend",
      "applicationDeadline",
      "duration",
    ];

    // Check if all required fields are present
    for (let field of requiredFields) {
      if (
        !req.body[field] ||
        (typeof req.body[field] === "string" && req.body[field].trim() === "")
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} is required and cannot be empty`,
        });
      }
    }

    // Validate requiredSkills array
    if (!Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one required skill must be provided",
      });
    }

    // Validate requiredSkills array elements
    for (let skill of requiredSkills) {
      if (!skill || typeof skill !== "string" || skill.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "All required skills must be non-empty strings",
        });
      }
    }

    // Validate application deadline
    const deadlineDate = new Date(applicationDeadline);
    const currentDate = new Date();

    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid application deadline date format",
      });
    }

    if (deadlineDate <= currentDate) {
      return res.status(400).json({
        success: false,
        message: "Application deadline must be in the future",
      });
    }

    // Validate CGPA range
    if (typeof minCgpa !== "number" || minCgpa < 0 || minCgpa > 10) {
      return res.status(400).json({
        success: false,
        message: "CGPA must be a number between 0 and 10",
      });
    }

    // Validate capacity
    if (typeof capacity !== "number" || capacity < 1) {
      return res.status(400).json({
        success: false,
        message: "Capacity must be a number greater than 0",
      });
    }

    // Validate stipend
    if (typeof stipend !== "number" || stipend < 0) {
      return res.status(400).json({
        success: false,
        message: "Stipend must be a non-negative number",
      });
    }

    // Validate quotas if provided
    let processedQuotas = {
      SC: 0,
      ST: 0,
      rural: 0,
      OBC: 0,
      EWS: 0,
    };

    if (quotas) {
      // Validate quota values
      const quotaKeys = ["SC", "ST", "rural", "OBC", "EWS"];
      let totalQuota = 0;

      for (let key of quotaKeys) {
        if (quotas[key] !== undefined) {
          if (typeof quotas[key] !== "number" || quotas[key] < 0) {
            return res.status(400).json({
              success: false,
              message: `Quota for ${key} must be a non-negative number`,
            });
          }
          processedQuotas[key] = quotas[key];
          totalQuota += quotas[key];
        }
      }

      // Check if total quota exceeds capacity
      if (totalQuota > capacity) {
        return res.status(400).json({
          success: false,
          message: `Total quota (${totalQuota}) cannot exceed internship capacity (${capacity})`,
        });
      }
    }

    // Get employee details from authenticated user (set by verifyJWT middleware)
    const employee = await Employee.findById(req.user._id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Prepare internship data
    const internshipData = {
      title: title.trim(),
      companyName: employee.organizationName,
      sector: sector.trim(),
      requiredSkills: requiredSkills.map((skill) => skill.trim()),
      minDegree: minDegree.trim(),
      minCgpa,
      capacity,
      locationDistrict: locationDistrict ? locationDistrict.trim() : "",
      isRemoteAllowed: isRemoteAllowed || false,
      stipend,
      applicationDeadline: deadlineDate,
      duration: duration.trim(),
      quotas: processedQuotas,
      appliedCandidates: [],
      allottedInternshipToCandidates: [],
    };

    // Start MongoDB session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create the internship
      const newInternship = await Internship.create([internshipData], {
        session,
      });

      if (!newInternship || newInternship.length === 0) {
        throw new Error("Failed to create internship");
      }

      const createdInternship = newInternship[0];

      // Add internship ID to employee's postedInternships array
      const updatedEmployee = await Employee.findByIdAndUpdate(
        employee._id,
        {
          $push: {
            postedInternships: createdInternship._id,
          },
        },
        {
          new: true,
          session,
        }
      );

      if (!updatedEmployee) {
        throw new Error("Failed to update employee's posted internships");
      }

      // Commit the transaction
      await session.commitTransaction();

      return res.status(201).json({
        success: true,
        message: "Internship posted successfully",
        data: {
          internship: createdInternship,
          internshipId: createdInternship.internshipId,
        },
      });
    } catch (transactionError) {
      // Rollback transaction on error
      await session.abortTransaction();
      console.error("Transaction error:", transactionError);
      throw transactionError;
    } finally {
      // End session
      session.endSession();
    }
  } catch (error) {
    console.error("Error posting internship:", error);

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Internship with this ID already exists",
      });
    }

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while posting internship",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const applyForInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;

    // Validate internshipId
    if (
      !internshipId ||
      typeof internshipId !== "string" ||
      internshipId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Internship ID is required",
      });
    }

    // Get candidate details from authenticated user (set by verifyJWT middleware)
    const candidate = await Candidate.findById(req.user._id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Find the internship by internshipId (not _id)
    const internship = await Internship.findOne({
      internshipId: internshipId.trim(),
    });
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Check if application deadline has passed
    const currentDate = new Date();
    if (currentDate > internship.applicationDeadline) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed",
      });
    }

    // Check if candidate has already applied
    const hasAlreadyApplied = candidate.appliedInternships.includes(
      internship._id
    );
    if (hasAlreadyApplied) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this internship",
      });
    }

   

    // Check candidate's CGPA eligibility
    if (candidate.cgpa && candidate.cgpa < internship.minCgpa) {
      return res.status(400).json({
        success: false,
        message: `Minimum CGPA requirement is ${internship.minCgpa}. Your CGPA is ${candidate.cgpa}`,
      });
    }

    // Check degree requirement (optional validation)
    if (candidate.degree && internship.minDegree) {
      const degreeHierarchy = {
        "High School": 1,
        Diploma: 2,
        Associate: 3,
        "Bachelor's": 4,
        "Master's": 5,
        PhD: 6,
      };

      const candidateDegreeLevel = degreeHierarchy[candidate.degree] || 0;
      const requiredDegreeLevel = degreeHierarchy[internship.minDegree] || 0;

      if (candidateDegreeLevel < requiredDegreeLevel) {
        return res.status(400).json({
          success: false,
          message: `Minimum degree requirement is ${internship.minDegree}. You have ${candidate.degree}`,
        });
      }
    }

    // Start MongoDB transaction for atomic operation
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Add internship to candidate's appliedInternships array
      const updatedCandidate = await Candidate.findByIdAndUpdate(
        candidate._id,
        {
          $push: {
            appliedInternships: internship._id,
          },
        },
        {
          new: true,
          session,
        }
      );

      if (!updatedCandidate) {
        throw new Error("Failed to update candidate's applied internships");
      }

      // Add candidate to internship's appliedCandidates array
      const updatedInternship = await Internship.findByIdAndUpdate(
        internship._id,
        {
          $push: {
            appliedCandidates: candidate._id,
          },
        },
        {
          new: true,
          session,
        }
      );

      if (!updatedInternship) {
        throw new Error("Failed to update internship's applied candidates");
      }

      // Commit the transaction
      await session.commitTransaction();

      return res.status(200).json({
        success: true,
        message: "Successfully applied for internship",
        data: {
          internshipId: internship.internshipId,
          internshipTitle: internship.title,
          companyName: internship.companyName,
          applicationDate: new Date(),
          totalApplications: updatedInternship.appliedCandidates.length,
          remainingCapacity:
            internship.capacity - updatedInternship.appliedCandidates.length,
        },
      });
    } catch (transactionError) {
      // Rollback transaction on error
      await session.abortTransaction();
      console.error("Transaction error:", transactionError);
      throw transactionError;
    } finally {
      // End session
      session.endSession();
    }
  } catch (error) {
    console.error("Error applying for internship:", error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while applying for internship",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const saveAllottedCandidates = async (internshipId, allottedCandidates) => {
  try {
    // Convert candidateId strings to ObjectId references
    const candidateObjectIds = [];

    for (const candidateData of allottedCandidates) {
      // Find candidate by candidateId to get their ObjectId
      const candidate = await Candidate.findOne({
        candidateId: candidateData.candidateId,
      }).select("_id");

      if (candidate) {
        candidateObjectIds.push(candidate._id);
      }
    }

    if (candidateObjectIds.length > 0) {
      // Update the internship with allotted candidates
      const updatedInternship = await Internship.findOneAndUpdate(
        { internshipId: internshipId.trim() },
        {
          $addToSet: {
            // Use $addToSet to avoid duplicates
            allottedInternshipToCandidates: { $each: candidateObjectIds },
          },
        },
        { new: true }
      );

      if (updatedInternship) {
        console.log(
          `Successfully saved ${candidateObjectIds.length} allotted candidates to internship ${internshipId}`
        );
        return updatedInternship;
      } else {
        throw new Error("Failed to update internship with allotted candidates");
      }
    }

    return null;
  } catch (error) {
    console.error("Error saving allotted candidates:", error);
    throw error;
  }
};

// Get all candidates who applied for a specific internship
const getInternshipCandidates = async (req, res) => {
  try {
    const { internshipId } = req.params;

    // Validate internshipId parameter
    if (
      !internshipId ||
      typeof internshipId !== "string" ||
      internshipId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Internship ID is required",
      });
    }

    // Find the internship by internshipId and populate applied candidates
    const internship = await Internship.findOne({
      internshipId: internshipId.trim(),
    })
      .populate({
        path: "appliedCandidates",
        select:
          "-password -createdAt -updatedAt -__v -age -firstName -middleName -lastName -contactNumber -gender -email -cgpa -district -_id -appliedInternships",
      })
      .lean();

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Format the response according to your requirement
    const response = {
      candidates: internship.appliedCandidates,
      internship: {
        internshipId: internship.internshipId,
        requiredSkills: internship.requiredSkills,
        sector: internship.sector,
        locationDistrict: internship.locationDistrict,
        minDegree: internship.minDegree,
        capacity: internship.capacity,
        quotas: internship.quotas,
      },
    };

    // Handle allocation with proper error handling
    let allottedCandidates = [];
    try {
      allottedCandidates = await handleAllocate(response);

      // Save allotted candidates if allocation was successful
      if (allottedCandidates && allottedCandidates.length > 0) {
        await saveAllottedCandidates(internshipId, allottedCandidates);
        console.log(
          `Saved ${allottedCandidates.length} allotted candidates for internship ${internshipId}`
        );
      }
    } catch (allocationError) {
      console.error("Allocation service error:", allocationError);
      // Continue execution but log the error
      // You might want to return an error status or handle this differently based on your requirements
    }

    return res.status(200).json({
      ...response,
      allottedCandidates: allottedCandidates || [],
    });
  } catch (error) {
    console.error("Error fetching internship candidates:", error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching internship candidates",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const viewAllocation = async (req, res) => {
  try {
    const { internshipId } = req.params;

    // Validate internshipId parameter
    if (
      !internshipId ||
      typeof internshipId !== "string" ||
      internshipId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Internship ID is required",
      });
    }

    // Find the internship by internshipId and populate allotted candidates
    const internship = await Internship.findOne({
      internshipId: internshipId.trim(),
    })
      .populate({
        path: "allottedInternshipToCandidates",
        select: "-password -createdAt -updatedAt -__v -appliedInternships",
      })
      .lean();

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Format the response
    const response = {
      internshipDetails: {
        internshipId: internship.internshipId,
        title: internship.title,
        companyName: internship.companyName,
        sector: internship.sector,
        capacity: internship.capacity,
        stipend: internship.stipend,
        duration: internship.duration,
        internshipMode: internship.internshipMode,
        locationDistrict: internship.locationDistrict,
        applicationDeadline: internship.applicationDeadline,
        minDegree: internship.minDegree,
        minCgpa: internship.minCgpa,
        requiredSkills: internship.requiredSkills,
        quotas: internship.quotas,
      },
      allottedCandidates: internship.allottedInternshipToCandidates,
      totalAllottedCount: internship.allottedInternshipToCandidates.length,
      remainingCapacity:
        internship.capacity - internship.allottedInternshipToCandidates.length,
    };

    return res.status(200).json({
      success: true,
      message: "Allocation details retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching allocation details:", error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching allocation details",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getAllInternships = async (req, res) => {
  try {
    // Get all active internships (deadline not passed)
    const internships = await Internship.find({
      applicationDeadline: { $gt: new Date() },
    })
      .select("-appliedCandidates -allottedInternshipToCandidates -__v")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Internships retrieved successfully",
      data: {
        internships,
        count: internships.length,
      },
    });
  } catch (error) {
    console.error("Error fetching all internships:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching internships",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const userAppliedInternship = async (req, res) => {
  try {
    // Get the authenticated user's ID from the JWT middleware
    const userId = req.user._id;

    // Find the candidate and populate the appliedInternships field
    const candidate = await Candidate.findById(userId)
      .populate({
        path: "appliedInternships",
        select: "-__v", // Exclude version field
        // You can add more specific fields if needed:
        // select: "title description company location duration stipend requirements"
      })
      .select("appliedInternships firstName lastName email");

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    // Return the applied internships
    return res.status(200).json({
      success: true,
      message: "Applied internships retrieved successfully",
      data: {
        appliedInternships: candidate.appliedInternships,
        totalApplied: candidate.appliedInternships.length,
        candidateInfo: {
          name: `${candidate.firstName} ${candidate.lastName}`.trim(),
          email: candidate.email
        }
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error retrieving applied internships"
    });
  }
};



export {
  postInternship,
  applyForInternship,
  getInternshipCandidates,
  getAllInternships,
  viewAllocation,
  userAppliedInternship
};
