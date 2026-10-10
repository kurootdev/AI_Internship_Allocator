import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useEmployeeStore = create((set, get) => ({
  authEmployee: null,
  isSigningUpEmp: false,
  isLoggingInEmp: false,
  isCheckingAuthEmp: true,
  postedInternship: [],
  employees: [],

  checkAuthEmp: async () => {
    try {
      const res = await axiosInstance.get("/employee/get");
      console.log("check auth Employee  res :", res);
      set({ authEmployee: res.data.employee });
      // console.log("authEmployee :",get().authEmployee)
    } catch (error) {
      console.log("Error in checkAuthEmp :", error);
      set({ authEmployee: null });
    } finally {
      set({ isCheckingAuthEmp: false });
    }
  },

  signupEmp: async (data) => {
    set({ isSigningUpEmp: true });

    try {
      const res = await axiosInstance.post("/employee/signup", data);
      console.log("signUp Employee res :", res);
      toast.success("Employee registered seccesffully");
      // set({ authEmployee: res.data.employee });
    } catch (error) {
      console.log("signUp Employee Error :", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUpEmp: false });
    }
  },

  loginEmp: async (data) => {
    set({ isLoggingInEmp: true });
    try {
      const res = await axiosInstance.post("/employee/signin", data);
      // console.log(res)
      set({ authEmployee: res.data.data.employee });
      toast.success("Employee login successfully");
    } catch (error) {
      console.log("login Employee  error", error);
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ isLoggingInEmp: false });
    }
  },

  logoutEmp: async () => {
    try {
      await axiosInstance.post("/employee/logout");
      set({ authEmployee: null });
      toast.success("logout Employee Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  postInternship: async (data) => {
    try {
      const response = await axiosInstance.post(
        "/employee/post-internship",
        data
      );
      toast.success("Intership posted successfully");
      return response; // Return response so caller can handle it
    } catch (error) {
      throw error; // Throw error so caller can catch it
    }
  },

  getPostedIntership: async () => {
    try {
      const res = await axiosInstance.get("/employee/get-posted-internship");
      set({ postedInternship: res.data.data.internships });
      // console.log("postedInternship :", get().postedInternship)
      return res; // Return response so caller can handle it
    } catch (error) {
      set({ postedInternship: [] });
      console.log("get posted internship error :", error); // Throw error so caller can catch it
    }
  },
  getAllEmployees: async () => {
    try {
      const res = await axiosInstance.get("/employee/get-all-employee");
      console.log(res)
      // set({ users: res.data.data });
    } catch (error) {
      console.log("error while getting all employee :", error);
    }
  },
}));
