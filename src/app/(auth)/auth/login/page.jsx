"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import schlogo from "../../../../../public/images/schlogo.jpg";
import loginImg from "../../../../../public/images/ice.jpg";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { playfair_display } from "@/app/font";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { signIn } from "@/auth";
import { loginAction } from "../../../../../actions/loginAction";

let validationSchema = yup.object({
  admission_number: yup.string().required("Staff ID is required"),
  password: yup.string().required("Password is required"),
});
const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const [message, setMessage] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const {
    setError,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const handleFormSubmit = async (data) => {
    setLoginLoading(true);
    const res = await loginAction(data, callbackUrl);
    if (!res?.error) {
      setLoginLoading(false);

      toast.success("Login successful. Redirecting...");
      router.push(callbackUrl);
    } else {
      setLoginLoading(false);
      const errorMessage =
        res?.error || "Login failed, kindly check your credentials";
      setMessage({
        message: errorMessage,
        status: "error",
      });
      toast.error(errorMessage);
    }
  };

  return (
    <section className="w-screen h-screen">
      <div className="flex ">
        <div
          className={`max-md:hidden bg-slate-950 dark:bg-slate-200 bg-cover bg-center flex-[1] md:flex-[1.1] h-screen text-white w-[40vw] `}
          style={{
            backgroundImage: `url(${loginImg.src})`,
          }}
        >
          <div className="w-3/4 max-lg:w-full  flex flex-col m-auto justify-center h-full ">
            <div className="pt-[50px] max-lg:mx-2 ">
              <p className="text-[#ebeef2] text-[30px] font-palanquin font-extrabold mb-5 max-[768px]:text-center lg:text-center">
                Blazskills University
              </p>
              <p className="w-2/3  font-palanquin font-normal text-[#ebeef2] text-[20px] max-lg:w-full max-lg:text-[15px] lg:w-full max-[768px]:text-center lg:text-center">
                Welcome to Blazskills University Staff portal. Manage your
                school portal from here.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#ebeef2] flex-[2] h-screen ">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="">
              <div className="flex flex-col justify-center items-center mb-[50px]">
                <Image
                  src={schlogo}
                  priority
                  alt="logo"
                  className="h-[100px] w-[100px] object-cover mb-2"
                />
                <p
                  className={`text-[36px] font-[700] ${playfair_display.className} leading-[45px] mb-[10px]`}
                >
                  Sign In
                </p>
                <p
                  className={`text-[16px] font-[500] leading-[25.6px] ${playfair_display.className}`}
                >
                  Welcome, please login to your account.
                </p>
              </div>
              {/* {message?.status === "error" ? (
                <div className="text-sm text-red-500 pb-10">
                  {message?.message}
                </div>
              ) : message?.status === "success" ? (
                <div className="text-sm text-green-500 pb-10">
                  {message?.message}
                </div>
              ) : null} */}
              <form
                method="post"
                className="flex flex-col gap-5"
                autoComplete="off"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <div className="h-[55px] ">
                  <input
                    className={`${playfair_display.className} w-full h-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4600DA]/[0.5] bg-slate-400/[0.2] placeholder:text-black/[0.5]`}
                    type="text"
                    autoComplete="admission_number"
                    placeholder="Your staff id"
                    name="admission_number"
                    {...register("admission_number")}
                  />
                  {errors?.admission_number && (
                    <div
                      className={`text-sm text-red-500 ${playfair_display.className}`}
                    >
                      {errors?.admission_number?.message}
                    </div>
                  )}
                </div>
                <div className="h-[55px] ">
                  <input
                    className={`${playfair_display.className} w-full h-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4600DA]/[0.5] bg-slate-400/[0.2] placeholder:text-black/[0.5]`}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    name="password"
                    {...register("password")}
                  />
                  {errors?.password && (
                    <div
                      className={`text-sm text-red-500 ${playfair_display.className}`}
                    >
                      {errors?.password?.message}
                    </div>
                  )}
                </div>
                {/* <div className=" h-[40px] bg-[#4600DA]/[0.8] hover:bg-[#4600DA]/[0.7] cursor-pointer w-full flex flex-col justify-center items-center rounded-lg">
                  <div className="flex items-center justify-center space-x-1 ">
                    <LogIn size={20} className=" text-white" />
                    <button
                      type="submit"
                      className="text-lg text-white font-medium"
                    >
                      Sign In
                    </button>
                  </div>
                </div> */}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className={`${
                    loginLoading
                      ? "cursor-progress bg-[#4600DA]/[0.4]  "
                      : "cursor-pointer bg-[#4600DA]/[0.8] hover:bg-[#4600DA]/[0.7]"
                  } h-[40px]  w-full flex flex-col justify-center items-center rounded-lg `}
                >
                  <div className="flex items-center justify-center space-x-1 ">
                    <LogIn size={20} className=" text-white" />
                    <p
                      className={`text-lg text-white font-medium ${playfair_display.className}`}
                    >
                      {loginLoading ? "Logging In..." : "Login"}
                    </p>
                  </div>
                </button>
                {/* <div
                  className={`flex space-x-2 justify-center ${roboto.className}`}
                >
                  <p className="text-center text-sm">Not a staff?</p>
                  <Link href="/login/student">
                    <p className="text-center text-sm text-blue-500">
                      Student Login
                    </p>
                  </Link>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
