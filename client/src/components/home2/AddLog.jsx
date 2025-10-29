import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/content/user";

const AddLog = () => {
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
        console.log(profileData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getProfile();
  }, []);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        <p className="text-gray-600">
          Update your personal information and settings.
        </p>
      </header>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="john.doe@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent 
            shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLog;
