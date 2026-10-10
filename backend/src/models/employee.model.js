import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const employeeSchema = new mongoose.Schema(
  {
    employerType: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    companyId: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    postedInternships :[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Internship"
      }
    ]
  },
  { timestamps: true }
);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

employeeSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};  

employeeSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      companyId: this.companyId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const Employee = mongoose.model("Employee",employeeSchema);
