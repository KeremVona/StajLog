import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await axios.post(
          "http://localhost:5000/api/authentication/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.valid) {
          navigate("/home");
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        localStorage.removeItem("token");
        console.error(err.message);
      }
    };

    checkToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/authentication/login",
        formData
      );

      localStorage.setItem("token", response.data.jwtToken);

      setTimeout(() => {
        navigate("/home");
      }, 400);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-800 font-bold">
              Email:
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="@email"
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            />
            <a
              href="#"
              className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
            >
              Forget Password
            </a>
            <Link
              to="/register"
              className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
            >
              Don't have an account?
            </Link>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-bold">
              password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
