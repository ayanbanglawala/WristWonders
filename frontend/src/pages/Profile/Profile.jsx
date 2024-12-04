import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import useUpdateProfile from "../../Hooks/useUpdateProfile";
import { useAuthContext } from "../../Context/AuthContext";

const Profile = () => {
    const { authUser, setAuthUser } = useAuthContext();
    
  const [profile, setProfile] = useState({
    fName: authUser.fName,
    lName: authUser.lName,
    email: authUser.email,
    phone: authUser.phone,
  });
  const {updateProfile, loading} = useUpdateProfile();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    updateProfile({ fName : profile.fName, lName : profile.lName, email: profile.email, phone: profile.phone });
    setAuthUser({ fName : profile.fName, lName : profile.lName, email: profile.email, phone: profile.phone });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Navbar />
      {loading && (
        <div className="overlay">
          <span className="loading loading-spinner loading-lg bg-blue-600"></span>
        </div>
      )}
      <div className="max-w-3xl mx-auto mt-12 bg-white shadow-xl rounded-3xl p-8">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Edit Profile
        </h2>
        <form className="space-y-8">
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                name="fName"
                value={profile.fName}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                name="lName"
                value={profile.lName}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
