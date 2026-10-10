import {create} from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  users : [],
  
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/get");
      console.log("check auth res :", res);
      set({ authUser: res.data.candidate });
      // console.log("authUser :",get().authUser)
    } catch (error) {
      console.log("Error in checkAuth :", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

    signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/user/signup", data);
      console.log("signUp res :", res);
      toast.success("Candidate registered seccesffully")
      // set({ authUser: res.data.newCandidate });
    } catch (error) {
      console.log("signUp Error :", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/user/signin", data);
      // console.log(res)
      set({ authUser: res.data.data.candidate });
      toast.success("Candidate login successfully")
    } catch (error) {
      console.log("login error",error)
      toast.error(error.response.data.message)
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

   logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      toast.success("logout Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile : async (data) =>{
    try {
      const res = await axiosInstance.post("/user/update-profile",data)
      set({authUser : res.data.data.candidate});
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.message || "error")
    }
  },

  getAllUsers : async ()=>{
    try {
      const res = await axiosInstance.get("/user/get-all-candidates")
      set({users : res.data.data})
    } catch (error) {
      console.log("error while getting all users :",error)
    }
  }

}))