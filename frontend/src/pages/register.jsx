import { useNavigate } from "react-router-dom";
import bubblespeech from "/login-regis/WARPEACE_1.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const signUpSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    confirmAge: z.literal(true, {
      errorMap: () => ({ message: "You must confirm your age" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUp() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
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
        nav("/");
      } else {
        alert("Registration failed");
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#2D3138] flex flex-col md:flex-row md:gap-x-12">
      <div className="w-full md:w-1/2 lg:w-3/5 p-8 lg:pl-36 flex flex-col justify-center box-border">
        <h2 className="text-[#F04E23] font-bold text-4xl md:text-3xl xl:text-5xl mb-8 text-shadow">
          Register Your Account
        </h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-4 md:max-w-sm lg:max-w-md"
        >
          <div className="flex flex-col">
            <label className="text-white text-xl mb-2">Username</label>
            <input
              type="text"
              {...register("username")}
              className="text-white bg-black rounded-[3px] p-3 py-1.5"
            />
            {errors.username && (
              <p className="text-gray-300 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-white text-xl mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="text-white bg-black rounded-[3px] p-3 py-1.5"
            />
            {errors.password && (
              <p className="text-gray-300 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-white text-xl mb-2">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="text-white bg-black rounded-[3px] p-3 py-1.5"
            />
            {errors.confirmPassword && (
              <p className="text-gray-300 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <p className="text-white text-xl mb-3">
              Password must contain following:
            </p>
            <ul className="text-white text-lg list-disc">
              <li className="ml-5">
                Password must be at least 6 characters.
              </li>
              <li className="ml-5">Must contain at least one number.</li>
            </ul>
          </div>

          <div className="flex mt-5">
          <input
            type="checkbox"
            {...register("confirmAge")}
            className="accent-yellow-400 scale-125 mt-1 cursor-pointer"
          />
          <label className="text-white text-lg pl-4">
            By creating an account,
            <br />
            I confirm I am at least 15 years old.
          </label>
        </div>
        {errors.confirmAge && (
          <p className="text-gray-300 text-sm mt-1">{errors.confirmAge.message}</p>
        )}


          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 cursor-pointer p-2 px-10 rounded-[3px] text-xl text-black font-bold"
            >
              Register
            </button>
          </div>

          <p className="text-white text-lg mt-4 text-center">
            Already have an account?
            <button
              onClick={() => nav("/")}
              type="button"
              className="underline font-bold ml-1.5 cursor-pointer"
            >
              log in
            </button>
          </p>
        </form>
      </div>

      <div className="hidden md:flex md:w-1/2 lg:w-2/5 items-center justify-center p-8 box-border">
        <img
          src={bubblespeech}
          className="max-w-full h-auto md:scale-115 opacity-65 md:mr-5 lg:mr-24 xl:mr-28"
        />
      </div>
    </div>
  );
}

export default SignUp;
