import { Employee } from "../models/employee.model.js";

const registerEmployee = async (req, res) => {
  const {
    employerType,
    sector,
    organizationName,
    name,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    companyId,
    contactNumber,
  } = req.body;

  // Check required fields - excluding optional middleName and lastName
  if (
    [
      employerType,
      sector,
      organizationName,
      name,
      email,
      password,
      confirmPassword,
      companyId,
      contactNumber,
    ].some((field) => field?.trim() === "")
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  // Check if employee already exists with same email or contact number
  const existingEmployee = await Employee.findOne({
    $or: [{ email }, { contactNumber }],
  });

  if (existingEmployee) {
    return res.status(409).json({
      success: false,
      message: "Employee with this email or contact number already exists",
    });
  }

  const newEmployee = await Employee.create({
    employerType,
    sector,
    organizationName,
    name,
    middleName: middleName || "",
    lastName: lastName || "",
    email,
    password,
    companyId,
    contactNumber,
  });

  if (!newEmployee) {
    return res.status(500).json({
      success: false,
      message: "Internal server error creating employee",
    });
  }

  const token = await newEmployee.generateAccessToken();

  return res.status(201).json({
    success: true,
    message: "Employee registered successfully",
  });
};

const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password is required!",
    });
  }

  const employee = await Employee.findOne({ email });

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  const isPasswordValid = await employee.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Password is incorrect!",
    });
  }

  const token = await employee.generateAccessToken();

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "Employee logged in successfully",
      data: {
        employee,
        token: token,
      },
    });
};

const getCurrentEmployee = async (req, res) => {
  return res
    .status(200)
    .json({
      employee: req.user,
      message: "current Employee fetched successfully",
    });
};

const logoutEmployee = async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json("Employee logout succesfully");
};

const getEmployeeInternships = async (req, res) => {
  try {
    // Get the employee ID from the verified JWT token
    const employeeId = req.user._id;

    // Find the employee and populate the posted internships
    const employee = await Employee.findById(employeeId).populate({
      path: "postedInternships",
      select: "-__v", // Exclude version key
      options: { sort: { createdAt: -1 } }, // Sort by newest first
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Return the posted internships
    return res.status(200).json({
      success: true,
      message: "Posted internships retrieved successfully",
      data: {
        internships: employee.postedInternships,
        totalCount: employee.postedInternships.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching posted internships",
    });
  }
};


const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).select("-password");
    res.status(200).json({
      success: true,
      data: employees,
      count: employees.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  registerEmployee,
  loginEmployee,
  getCurrentEmployee,
  logoutEmployee,
  getEmployeeInternships,
  getAllEmployees
};
