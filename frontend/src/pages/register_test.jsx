import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const RegisterSchema = z
  .object({
    username: z.string().min(1, "Username is required."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Must contain at least one number."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function RegisterTest() {
  const [showPassword, setShowPassword] = useState(false);
  const loginNav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/signup",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status >= 200 && res.status < 300) {
        loginNav("/loginTest");
      } else {
        alert("Registration failed");
      }
    } catch (e) {
      alert("Network error");
    }
  };

  return (
    <div className="page-container relative w-full flex-row flex min-h-screen justify-center items-center md:items-baseline bg-[#E9E5DC]">
      <img
        src="Login/Login-pic2.svg"
        className="absolute top-0 right-0 block md:hidden"
      />
      <div className="regis-box flex gap-10 md:gap-30 flex-col md:flex-row relative py-15 md:bg-white md:h-screen px-20">
        <img
          src="Login/Login-pic2.svg"
          className="absolute top-0 right-10 hidden md:block"
        />
        <div className="regis-left flex flex-col gap-6">
          <h3 className="text-5xl font-black font-serif4">Sign up</h3>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="input-field flex flex-col gap-3"
          >
            <div className="input-group flex flex-col gap-2">
              <label className="text-lg">Username</label>
              <input
                type="text"
                className="px-4 py-3 border-b-1"
                placeholder="e.g Jungwonie"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="input-group flex flex-col gap-2 w-full">
              <label className="text-lg">Password</label>
              <div className="flex gap-3 items-center justify-between">
                <input
                  className="px-4 py-3 w-full border-b-1"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                />
                <span></span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="input-group flex flex-col gap-2 w-full">
              <label className="text-lg">Confirm Password</label>
              <div className="flex gap-3 items-center justify-between">
                <input
                  className="px-4 py-3 w-full border-b-1"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                />
                <span></span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="sign-btn flex justify-center items-center">
              <button
                type="submit"
                className="bg-[#5C6A51] mt-3 cursor-pointer rounded-[10px] px-9 py-4 font-bold text-white text-md"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="navigate-login flex gap-2 items-center justify-center">
            <p>Already have an account? </p>
            <button
              onClick={() => loginNav("/loginTest")}
              className="underline cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>

        <div className="regis-right md:bg-white flex flex-col justify-center items-center gap-2">
          <div className="username">
            <h4 className="font-bold">Username must:</h4>
            <ul className="list-disc">
              <li>Be provided</li>
            </ul>
          </div>
          <div className="password">
            <h4 className="font-bold">Password must:</h4>
            <ul className="list-disc">
              <li>At least 8 characters long</li>
              <li>Uppercase letters: A-Z</li>
              <li>Lowercase letters: a-z</li>
              <li>Numbers: 0-9</li>
            </ul>
          </div>
          <div className="sign-in-pic hidden md:block md:mt-10">
            <img src="Signin/sigin-img1.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterTest;
