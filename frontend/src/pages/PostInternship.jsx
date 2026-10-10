import React, { useState } from "react";
import { useEmployeeStore } from "../store/EmployeeAuthStrore";

export default function PostInternship() {
  const { postInternship } = useEmployeeStore();

  const [form, setForm] = useState({
    title: "",
    companyName: "",
    sector: "",
    requiredSkills: [],
    minDegree: "",
    minCgpa: "",
    capacity: "",
    locationDistrict: "",
    internshipMode: "",
    stipend: "",
    applicationDeadline: "",
    duration: "",
    quotas: { SC: "", ST: "", OBC: "", EWS: "", rural: "" },
  });

  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.quotas) {
      setForm({
        ...form,
        quotas: { ...form.quotas, [name]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // handle skills add
  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setForm({
        ...form,
        requiredSkills: [...form.requiredSkills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  // remove skill
  const handleRemoveSkill = (skill) => {
    setForm({
      ...form,
      requiredSkills: form.requiredSkills.filter((s) => s !== skill),
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      minCgpa: form.minCgpa ? Number(form.minCgpa) : undefined,
      capacity: form.capacity ? Number(form.capacity) : undefined,
      stipend: form.stipend ? Number(form.stipend) : undefined,
      quotas: {
        SC: Number(form.quotas.SC) || 0,
        ST: Number(form.quotas.ST) || 0,
        OBC: Number(form.quotas.OBC) || 0,
        EWS: Number(form.quotas.EWS) || 0,
        rural: Number(form.quotas.rural) || 0,
      },
    };

    try {
      setLoading(true);
      const res = await postInternship(payload);
      setSuccess("Internship posted successfully!");
      console.log("Response:", res.data);

      setForm({
        title: "",
        companyName: "",
        sector: "",
        requiredSkills: [],
        minDegree: "",
        minCgpa: "",
        capacity: "",
        locationDistrict: "",
        internshipMode: "",
        stipend: "",
        applicationDeadline: "",
        duration: "",
        quotas: { SC: "", ST: "", OBC: "", EWS: "", rural: "" },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl transition-all hover:shadow-blue-200">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          🚀 Post an Internship
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in the details below to post a new internship.
        </p>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-2">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">
              Internship Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="Enter internship title"
            />
          </div>

          {/* Company + Sector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Sector <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sector"
                value={form.sector}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Enter sector"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block font-semibold mb-1">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {form.requiredSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Degree + CGPA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Minimum Degree <span className="text-red-500">*</span>
              </label>
              <select
                name="minDegree"
                value={form.minDegree}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
              <label className="block font-semibold mb-1">
                Minimum CGPA <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="minCgpa"
                value={form.minCgpa}
                onChange={handleChange}
                required
                min="0"
                max="10"
                step="0.01"
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Enter minimum CGPA"
              />
            </div>
          </div>

          {/* Capacity + Stipend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                required
                min="1"
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter number of seats"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Stipend (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stipend"
                value={form.stipend}
                onChange={handleChange}
                required
                min="0"
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter stipend amount"
              />
            </div>
          </div>

          {/* District + Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Location District
              </label>
              <input
                type="text"
                name="locationDistrict"
                value={form.locationDistrict}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter district"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Internship Mode <span className="text-red-500">*</span>
              </label>
              <select
                name="internshipMode"
                value={form.internshipMode}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="">Select mode</option>
                <option value="On-Site">On-Site</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          {/* Deadline + Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Application Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={form.applicationDeadline}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
                placeholder="e.g., 3 months"
              />
            </div>
          </div>

          {/* Quotas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["SC", "ST", "OBC", "EWS", "rural"].map((quota) => (
              <div key={quota}>
                <label className="block font-semibold mb-1">
                  {quota.toUpperCase()} Quota Seats{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name={quota}
                  value={form.quotas[quota]}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
                  placeholder={`Enter ${quota} seats`}
                />
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-[1.01]"
          >
            {loading ? "Posting..." : "🚀 Post Internship"}
          </button>
        </form>
      </div>
    </div>
  );
}
