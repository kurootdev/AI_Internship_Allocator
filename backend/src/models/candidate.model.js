import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const candidateSchema = new mongoose.Schema(
  {
    candidateId: {
      type: String,
      unique: true,
      index: true,
    },
    age: {
      type: Number,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
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
    appliedInternships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    degree: {
      type: String,
      enum: [
        "High School",
        "Diploma",
        "Associate",
        "Bachelor's",
        "Master's",
        "PhD",
      ],
    },
    major: {
      type: String,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },

    district: {
      type: String,
    },
    preferredLocations: [
      {
        type: String,
      },
    ],
    pastParticipationCount: {
      type: Number,
      default: 0,
    },
    socialCategory: {
      type: String,
      enum: ["OBC", "GENERAL", "EWS", "SC", "ST"],
    },
    isRural: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

candidateSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//custom build methods
candidateSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

candidateSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      candidateId: this.candidateId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const Candidate = mongoose.model("Candidate", candidateSchema);
