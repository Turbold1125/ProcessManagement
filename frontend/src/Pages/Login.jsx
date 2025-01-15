import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/userContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/login`, userData);
      const { user, token } = response.data;
  
      // Decode token to check expiration
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        throw new Error("The token has already expired.");
      }
  
      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
  
      // Update current user in the context
      setCurrentUser(user);
  
      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Нэвтрэх</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}
        <form onSubmit={loginUser}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              И-мейл
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="И-мейл оруулна уу"
              value={userData.email}
              onChange={changeInputHandler}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">
              Нууц үг
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Нууц үг оруулна уу"
              value={userData.password}
              onChange={changeInputHandler}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
