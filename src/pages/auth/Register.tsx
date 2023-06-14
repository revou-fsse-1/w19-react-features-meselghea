import React from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Register: React.FC = () => {
  const validationSchema = object().shape({
    username: string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: string()
      .required("Email is required")
      .email("Invalid email address"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    axios
      .post('https://64263f33d24d7e0de46c68c3.mockapi.io/users')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-grey-lighter">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-3xl text-center">
            Registration Form
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div>
              <input className="block w-full p-3 mb-4 border rounded border-grey-light" type="text" {...register("username")} placeholder="Username"/>
              {errors.username && (
                <p className="text-xs italic text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input className="block w-full p-3 mb-4 border rounded border-grey-light" type="email" {...register("email")} placeholder="Email"/>
              {errors.email && (
                <p className="text-xs italic text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input className="block w-full p-3 mb-4 border rounded border-grey-light" type="password" {...register("password")} placeholder="Password"/>
              {errors.password && (
                <p className="text-xs italic text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className='w-full py-3 my-1 text-center text-white rounded bg-sky-600 hover:bg-sky-700 focus:outline-none' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
