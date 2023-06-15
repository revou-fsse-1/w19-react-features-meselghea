import React from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const validationSchema = object().shape({
    username: string().required("Username is required"),
    password: string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (user: { username: string; password: string; }) => {
    try {
      const response = await axios.get('https://64263f33d24d7e0de46c68c3.mockapi.io/users', {
        params: {
          username: user.username,
          password: user.password,
        },
      });

      if (response.data.userExists) {
        console.log("User exists");
      } else {
        console.log("User does not exist");
      }
    } catch (error) {
      console.error(error);
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
              type="email"
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
          >
            Submit
          </button>
          <p>  Are you a new groomer? <button onClick={()=>navigate("/register")}> <p className="underline-offset-3">Register here</p></button>
                        </p>
        </form>
      </div>
    </div>
  </div>
);
};

export default Login