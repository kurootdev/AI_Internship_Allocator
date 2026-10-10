import mongoose from "mongoose";

const internshipsSchema = new mongoose.Schema(
  {
    internshipId: {
      type: String,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    requiredSkills: [
      {
        type: String,
        required: true,
      },
    ],
    minDegree: {
      type: String,
      required: true,
    },
    minCgpa: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    locationDistrict: {
      type: String,
    },
    internshipMode: {
      type: String,
      enum : ["On-Site","Remote"]
    },
    stipend: {
      type: Number,
      required: true,
      min: 0,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    appliedCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
      },
    ],
      quotas: {
        SC: { type: Number, default: 0, min: 0 },
        ST: { type: Number, default: 0, min: 0 },
        rural: { type: Number, default: 0, min: 0 },
        OBC: { type: Number, default: 0, min: 0 },
        EWS: { type: Number, default: 0, min: 0 },
      },
    allottedInternshipToCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate", // reference Candidate model
      },
    ],
  },
  {
    timestamps: true,
  }
);

internshipsSchema.pre("save", function (next) {
  if (!this.internshipId) {
    this.internshipId = "INT-" + Date.now();
  }
  next();
});

export const Internship = mongoose.model("Internship", internshipsSchema);
