"use client";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { post_job } from "@/Services/job";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import PaymentOverlay from "./payment/loadLemonJs";
import LoadLemonJs from "./payment/loadLemonJs";
import SelectItemForPayment from "./payment/page";
import { boolean } from "joi";
import PaymentPage from "./payment/page";

export default function Payment() {
  const user = useSelector((state) => state.User.userData);
  // const router = useRouter();
  // const data = router.query;

  // console.log(`user?._id = ${JSON.stringify(user)}, ${user?.email}`);

  // console.log("FORM DATA COMING FROM /postajob");
  // console.log(data);

  const searchParams = useSearchParams();
  console.log("FORM DATA COMING FROM /postajob");
  console.log(searchParams.get("search"));

  return (
    <>
      <NavBar />
      {/* <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script> */}
      <div className="w-full py-20 flex items-center justify-center flex-col">
        <h1 className="text-xl mt-4 capitalize border-b-2 border-b-indigo-600 py-2 mb-8 md:text-xl lg:text-2xl">
          Select Job Post Variant
        </h1>
      </div>
    </>
  );
}
