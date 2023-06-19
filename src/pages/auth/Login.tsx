import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateToken } from "./JwtUtils";

interface FormProps {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const validationSchema = object().shape({
    username: string().required("username is required"),
    password: string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormProps) => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://64263f33d24d7e0de46c68c3.mockapi.io/users',
        {
          params: {
            username: data.username,
            password: data.password,
          },
        }
      );

      const userData = response.data;

      if (userData.length > 0 && userData[0].username === data.username && userData[0].password === data.password) {
        const userId = userData[0].id;
        const token = generateToken(userId);
        const username = userData[0].username;
  
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", username);
  
        setLoading(false);
        navigate("/list", {
          state: { successMessage: "You have successfully logged in" },
        });
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during authentication");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-grey-lighter">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-3xl text-center">Login Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div>
              <input
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                type="text"
                {...register("username")}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-xs italic text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <input
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                type="password"
                {...register("password")}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-xs italic text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              className="w-full py-3 my-1 text-center text-white rounded bg-sky-600 hover:bg-sky-700 focus:outline-none"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
          <p className="text-center">
            Are you a new groomer?{" "}
            <a
              onClick={() => navigate("/register")}
              className="underline cursor-pointer hover:text-gray-500"
            >
              Register here
            </a>{" "}
          </p>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login