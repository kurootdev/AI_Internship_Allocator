import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import img1 from "../assets/logos/profileImg.png";

export default function ProfilePage() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

  if (isUpdatingProfile && !authUser) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Initial profile state: all fields controlled by local state only
  const [profile, setProfile] = useState({
    age: authUser.age || "",
    firstName: authUser?.firstName,
    middleName: authUser.middleName,
    lastName: authUser.lastName,
    contactNumber: authUser.contactNumber,
    gender: authUser.gender,
    skills: authUser.skills,
    degree: authUser.degree,
    major: authUser.major,
    cgpa: authUser.cgpa,
    district: authUser.district,
    preferredLocations: authUser.preferredLocations,
    socialCategory: authUser.socialCategory,
    isRural: authUser.isRural, // boolean for rural status
    avatar: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const fileRef = useRef(null);


  // Standard input change handler
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // 🔹 Avatar Upload Handler (stub)
  const handleFileChange = async (e) => {
    // Your avatar upload logic here
  };

  // Skills Add/Remove
  const handleSkillAdd = (e) => {
    if ((e.key === "Enter" || e.key === ",") && newSkill.trim() !== "") {
      e.preventDefault();
      if (!profile.skills.includes(newSkill.trim())) {
        setProfile((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()],
        }));
      }
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  // Locations Add/Remove
  const handleLocationAdd = (e) => {
    if ((e.key === "Enter" || e.key === ",") && newLocation.trim() !== "") {
      e.preventDefault();
      if (!profile.preferredLocations.includes(newLocation.trim())) {
        setProfile((prev) => ({
          ...prev,
          preferredLocations: [...prev.preferredLocations, newLocation.trim()],
        }));
      }
      setNewLocation("");
    }
  };

  const handleLocationRemove = (loc) => {
    setProfile((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter((l) => l !== loc),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    useAuthStore.setState({ isUpdatingProfile: true });
    try {
      await updateProfile(profile);
      toast.success("updated profile successfully");
    } catch (error) {
      console.log("candidate updation failed", error);
      toast.error(error?.message || "error")
    } finally {
      useAuthStore.setState({ isUpdatingProfile: false });
    }
  };

  // Avatar display priority
  // const displayImage = profile.avatar || "/default-avatar.png";
  const displayImage = img1;

  if (!profile) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Candidate Profile
        </h2>

        {/* 🔹 Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={handleFileChange}
          />
          <img
            alt="profile"
            className="rounded-full h-28 w-28 object-cover cursor-pointer border-2 border-gray-300"
            src={displayImage}
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm text-gray-500 mt-2">Click image to update</p>
        </div>

        {/* 🔹 Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">
                Candidate ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="candidateId"
                value={authUser.candidateId || ""}
                readOnly
                required
                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="font-semibold">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div>
              <label className="font-semibold">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={profile.middleName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={profile.contactNumber}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={authUser.email || ""}
                readOnly
                required
                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Education */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-semibold">
                Degree <span className="text-red-500">*</span>
              </label>
              <select
                name="degree"
                value={profile.degree}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="">Select Degree</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Associate">Associate</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">
                Major <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="major"
                value={profile.major}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">
                CGPA <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cgpa"
                value={profile.cgpa}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="font-semibold">
              Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleSkillAdd}
              placeholder="Type a skill and press Enter"
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">
                District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="district"
                value={profile.district}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">
                Preferred Locations <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.preferredLocations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {loc}
                    <button
                      type="button"
                      onClick={() => handleLocationRemove(loc)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                onKeyDown={handleLocationAdd}
                placeholder="Type a location and press Enter"
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Other Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Past Participation Count</label>
              <input
                type="number"
                name="pastParticipationCount"
                value={authUser.pastParticipationCount}
                onChange={handleChange}
                disabled={true}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">
                Social Category <span className="text-red-500">*</span>
              </label>
              <select
                name="socialCategory"
                value={profile.socialCategory}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                <option value="GENERAL">General</option>
                <option value="OBC">OBC</option>
                <option value="EWS">EWS</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
          </div>

          {/* Rural */}
          <div>
            <label className="font-semibold">
              From Rural Area <span className="text-red-500">*</span>
            </label>
            <select
              name="isRural"
              value={profile.isRural ? "Yes" : "No"}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  isRural: e.target.value === "Yes",
                }))
              }
              required
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
