import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { signIn, signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { BiLogoGoogle } from "react-icons/bi";
import NavBar from "@/components/NavBar";
import { setUserData } from "@/Utils/UserSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      Router.push("/");
    }
  }, []);

  if (session) {
    localStorage.setItem("user", JSON.stringify(session?.user));

    dispatch(
      setUserData(
        localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : null
      )
    );
    Router.push("/");
  }

  return (
    <>
      <NavBar />
      <div className="w-full h-screen">
        <div className="flex flex-col items-center  text-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <div>
                {session ? (
                  <>
                    <button
                      className="mt-8 cursor-pointer text-lg hover:text-red-500 transition-all duration-500 w-full bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-300 py-2 px-4 flex items-center justify-center rounded-md text-center"
                      onClick={() => signOut()}
                    >
                      <span className="ml-2">Sign out</span>
                    </button>
                  </>
                ) : (
                  <button
                    className="cursor-pointer text-lg hover:text-green-700 transition-all duration-500 w-full bg-indigo-600 text-gray-100 hover:bg-gray-100 shadow-md border border-gray-300 py-2 px-4 flex items-center justify-center rounded-md text-center"
                    onClick={() => signIn("google")}
                  >
                    <BiLogoGoogle className="text-3xl" />
                    <span className="ml-2">Sign in with Google</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
