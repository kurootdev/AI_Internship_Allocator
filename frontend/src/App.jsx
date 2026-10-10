import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import Internships from "./pages/Internships";
import Admin from "./components/Admin";
import InternshipPortal from "./components/InternshipPortal";
import UserPortal from "./components/UserPortal";
import InternshipDetails from "./components/InternshipDetails";
import AISupport from "./pages/AISupport";

// Employer Components
import Employer from "./components/Employer";
import EmployerLayout from "./pages/EmployerLayout";
import CandidateLayout from "./pages/CandidateLayout";

// 🔹 New Imports
import SignUpCandidate from "./pages/SignUpCandidate";
import SignUpEmployer from "./pages/SignUpEmployer";
import PostInternship from "./pages/PostInternship";
import SignInEmp from "./pages/SignInEmp";
import { useAuthStore } from "./store/authStore";
import { useInternshipStore } from "./store/internshipStore";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useEmployeeStore } from "./store/EmployeeAuthStrore";
import ViewAllocation from "./components/ViewAllocation";
import CandidateResults from "./components/CandidateResults";
import AllocatedCandidates from "./components/AllocatedCandidates";
import Faq from "./components/Faq";
import Recommendation from "./pages/Recommendation";
import UsersDisplay from "./components/UserDisplay";
import EmployeesDisplay from "./components/EmployeeDisplay";
import UserDisplay from "./components/UserDisplay";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {
    authEmployee,
    checkAuthEmp,
    isCheckingAuthEmp,
    getPostedIntership,
    postedInternship,
  } = useEmployeeStore();
  const { getAllInternships, internships } = useInternshipStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    checkAuthEmp();
  }, [checkAuthEmp]);

  useEffect(() => {
    getPostedIntership();
  }, [getPostedIntership]);

  useEffect(() => {
    getAllInternships();
  }, [getAllInternships, internships]);

  // dont remove the this below code
  // if((isCheckingAuth && !authUser) || (isCheckingAuthEmp && !authEmployee)){
  //   return(
  //     <div className="w-screen h-screen flex justify-center items-center">
  //     <Loader className="size-10 animate-spin"/>
  //     </div>
  //   )
  // }

  return (
    <>
      <Header />

      {/* Main Content with padding to prevent overlap */}
      <main className="pt-40">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faq />} />
          {/* iss route ko use krke home page pe chatbot lagega */}
          {/* <Route path="/ai-support" element={<AISupport />} /> */}
          <Route
            path="/login"
            element={!authUser ? <SignIn /> : <Navigate to="/candidate" />}
          />
          <Route
            path="/login-employer"
            element={
              !authEmployee ? <SignInEmp /> : <Navigate to="/employer" />
            }
          />
          {/* 🔹 Candidate & Employer Sign Up */}
          <Route
            path="/sign-up-candidate"
            element={!authUser ? <SignUpCandidate /> : <Navigate to="/" />}
          />
          <Route
            path="/sign-up-employer"
            element={!authEmployee ? <SignUpEmployer /> : <Navigate to="/" />}
          />
          {/* Private Routes */}
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          {/* Candidate Dashboard */}
          <Route
            path="/candidate"
            element={authUser ? <CandidateLayout /> : <Navigate to="/login" />}
          >
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="internships" element={<Internships />} />
            <Route path="recommendations" element={<Recommendation />} />
            <Route
              path="internships/view-details"
              element={<InternshipDetails />}
            />
            <Route path="results" element={<CandidateResults />} />
            <Route
              path="results/allocations"
              element={<AllocatedCandidates />}
            />

            <Route path="ai-support" element={<AISupport />} />
            <Route
              path="queries"
              element={<h2 className="p-4">Queries Page</h2>}
            />
            <Route path="faqs" element={<Faq />} />
            <Route
              path="contact"
              element={<h2 className="p-4">Contact Page</h2>}
            />
          </Route>
          {/* Employer Dashboard */}
          <Route
            path="/employer"
            element={
              authEmployee ? (
                <EmployerLayout />
              ) : (
                <Navigate to="/login-employer" />
              )
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Employer />} />
            <Route path=":company" element={<Employer />} />
            <Route path="post-internship" element={<PostInternship />} />
            <Route path="internship-posted" element={<InternshipPortal />} />
            <Route
              path="internship-posted/view-allocation"
              element={<ViewAllocation />}
            />
          </Route>
          {/* Admin */}
          <Route
            path="/admin"
            element={
              authUser?.email === "admin@gmail.com" ? <Admin /> : <NotFound />
            }
          />
          <Route
            path="/admin/employees"
            element={
              authUser?.email === "admin@gmail.com" ? (
                <EmployeesDisplay />
              ) : (
                <NotFound />
              )
            }
          />
          <Route
            path="/admin/candidates"
            element={
              authUser?.email === "admin@gmail.com" ? (
                <UserDisplay />
              ) : (
                <NotFound />
              )
            }
          />

          {/* Other Routes */}
          <Route path="/internship/details" element={<InternshipDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </main>
    </>
  );
}
