import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { signIn, signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Router from "next/router";
import { login_me } from "@/Services/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "@/Utils/UserSlice";
import NavBar from "@/components/NavBar";
import {
  BiLogoGoogle,
  BiLogoGooglePlusCircle,
  BiLogoGoogleCloud,
  BiLogoGooglePlus,
} from "react-icons/bi";

export default function Login() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError({ ...error, email: "Email Field is Required" });
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "Password Field is required" });
      return;
    }

    const res = await login_me(formData);
    if (res.success) {
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      dispatch(
        setUserData(
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
        )
      );
      Router.push("/");
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-full h-screen bg-indigo-600">
        <div className="flex flex-col items-center  text-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <div>
                {session ? (
                  <>
                    <p>Welcome, {session.user.name}!</p>
                    {/* <p>{session.user.email}</p>
                        <p> {session.user.image}</p>
                        <p> {session.expires}</p> */}
                    <button
                      class="cursor-pointer text-lg hover:text-red-500 transition-all duration-500 w-full bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-300 py-2 px-4 flex items-center justify-center rounded-md text-center"
                      onClick={() => signOut()}
                    >
                      <span class="ml-2">Sign out</span>
                    </button>
                  </>
                ) : (
                  // <button onClick={() => signIn("google")}>
                  //   Sign in with Google
                  // </button>

                  <button
                    class="cursor-pointer text-lg hover:text-green-700 transition-all duration-500 w-full bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-300 py-2 px-4 flex items-center justify-center rounded-md text-center"
                    onClick={() => signIn("google")}
                  >
                    <BiLogoGoogle className="text-3xl" />
                    <span class="ml-2">Sign in with Google</span>
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

// pages/index.js
// import { signIn, signOut, useSession } from "next-auth/react";

// export default function Login() {
//   const { data: session } = useSession();

//   return (
//     <div>
//       {session ? (
//         <>
//           <p>Welcome, {session.user.name}!</p>
//           <p>Welcome, {session.user.email}</p>
//           <p>Welcome, {session.user.image}</p>
//           <p>Welcome, {session.expires}</p>
//           <button onClick={() => signOut()}>Sign out</button>
//         </>
//       ) : (
//         <button onClick={() => signIn("google")}>Sign in with Google</button>
//       )}
//     </div>
//   );
// }
