import NavBar from "@/components/NavBar";
import Link from "next/link";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post_job } from "@/Services/job";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import PaymentOverlay from "./payment/loadLemonJs";
import LoadLemonJs from "./payment/loadLemonJs";
import SelectItemForPayment from "./payment/home";
import { boolean } from "joi";
import PaymentPage from "./payment/home";
import Accordion from "./payment/accordion";

export default function Success() {
  const user = useSelector((state) => state.User.userData);

  if (
    user?.name == null ||
    user?.name == "" ||
    user?.name == undefined ||
    user?.name == "undefined"
  ) {
    return (
      <>
        <NavBar />
        <div className="w-full  py-20 flex items-center  justify-center flex-col">
          <div className="my-10">
            Please <Link href={"/auth/login"}>login</Link> first
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen py-20 flex items-center justify-center flex-col bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4">
            Congratulations!
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Your job posting has been successfully published.
          </p>
          <div>
            <Link
              href={"/"}
              className="inline-block py-3 px-10 rounded bg-indigo-600 text-white text-lg font-medium hover:bg-indigo-700 transition duration-300"
            >
              View Jobs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
