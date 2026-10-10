import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useInternshipStore = create((set, get) => ({
  internships: [],

  applyForInternship: async (internshipId) => {
    try {
      const response = await axiosInstance.post(
        `/user/apply-internship/${internshipId}`
      );
      toast.success("Applied successfully");
      return response; // Return response so caller can handle it
    } catch (error) {
      toast.error(error?.response.data.message);
      throw error; // Throw error so caller can catch it
    }
  },

  getAllInternships: async () => {
    try {
      const res = await axiosInstance("/user/get-all-internships");
      // console.log("internships :",res)
      set({ internships: res.data.data.internships });
      // console.log("internships:",get().internships)
    } catch (error) {
      console.log("error internships :", error);
    }
  },

  allocateInternship: async (internshipId) => {
    try {
      const res = await axiosInstance(
        `/employee/get-candidates/${internshipId}`
      );
      console.log("allocations  :", res);
      toast.success("Allocation Done !!");
    } catch (error) {
      console.log("error internships :", error);
      toast.error("Allocation Failed !!");
    }
  },

  viewAllocation: async (internshipId) => {
    try {
      const res = await axiosInstance(
        `/employee/view-allocation/${internshipId}`
      );
      //   console.log("view allocations result  :",res)
      return res.data.data.allottedCandidates;
    } catch (error) {
      console.log("view allocations error  :", error);
    }
  },

  getRecommendations: async () => {
    try {
      const res = await axiosInstance("/user/recommend");
      // console.log("recommendation result  :",res)
      return res.data.data;
    } catch (error) {
      console.log("recommendation error  :", error);
    }
  },

  getUserAppliedInternship: async () => {
    try {
      const res = await axiosInstance("/user/get-user-applied-internship");
      // console.log("user applied internship result  :",res)
      return res.data.data.appliedInternships;
    } catch (error) {
      console.log("User applied Internships error  :", error);
    }
  },
}));
