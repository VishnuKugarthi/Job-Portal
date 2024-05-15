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
import SelectItemForPayment from "./payment/page";
import { boolean } from "joi";
import PaymentPage from "./payment/page";

export default function PostAJob() {
  const user = useSelector((state) => state.User.userData);
  // const router = useRouter();

  console.log(`user?._id = ${JSON.stringify(user)}, ${user?.email}`);

  // const userId = user?._id;

  // useEffect(() => {
  //   console.log("EFFECT");
  //   console.log(userId, Cookies.get("token"));
  //   console.log(!userId || !Cookies.get("token"));

  //   if (!userId || !Cookies.get("token")) {
  //     router.push("/auth/login");
  //   }
  // }, [user, userId, Cookies]);

  const [formData, setFormData] = useState({
    user: user?.email,
    job_title: "",
    salary: 0,
    email: "",
    company_name: "",
    job_location: "",
    job_description: "",
    job_mode: "",
    job_type: "",
    job_experience: "",
    job_vacancy: 0,
  });
  // const [error, setError] = useState({
  //   user: "",
  //   job_title: "",
  //   salary: "",
  //   email: "",
  //   company_name: "",
  //   job_location: "",
  //   job_description: "",
  //   job_mode: "",
  //   job_type: "",
  //   job_experience: "",
  //   job_vacancy: "",
  // });

  // useEffect(() => {
  // if (formData.user == null) {
  //   router.push("/auth/login");
  // }
  // }, [user]);

  // useEffect(() => {
  //   window.createLemonSqueezy();

  //   LemonSqueezy.Setup({
  //     eventHandler: async (event) => {
  //       // Do whatever you want with this event data

  //       console.log("LemonSqueezy event");
  //       console.log(event);

  //       if (event.event === "Checkout.Success") {
  //         const res = await post_job(formData);
  //         if (res.success) {
  //           toast.success(res.message);
  //           setTimeout(() => {
  //             router.push("/frontend/displayJobs");
  //           }, 1000);
  //         } else {
  //           toast.error(res.message);
  //         }
  //       }
  //     },
  //   });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const res = await post_job(formData);
    // if (res.success) {
    //   toast.success(res.message);
    //   setTimeout(() => {
    //     router.push("/frontend/displayJobs");
    //   }, 1000);
    // } else {
    //   toast.error(res.message);
    // }
  };

  const job_mode_options = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const job_type_options = [
    { value: "fulltime", label: "Full time" },
    { value: "parttime", label: "Part time" },
    { value: "internship", label: "Internship" },
    { value: "contract", label: "Contract" },
  ];

  console.log("formData");
  console.log(formData);

  console.log("user?.name");
  console.log(user?.name);

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
      {/* <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script> */}
      <div className="w-full py-20 flex items-center justify-center flex-col">
        <h1 className="text-xl mt-4 capitalize border-b-2 border-b-indigo-600 py-2 mb-8 md:text-xl lg:text-2xl">
          Enter Job Details
        </h1>
        <form
          onSubmit={handleSubmit}
          className="sm:w-1/2 w-full px-4 mx-4  h-full"
        >
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="job_title" className="mb-1 text-base ">
              Job title :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_title: e.target.value })
              }
              type="text"
              id="job_title"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter title of the job"
              required
            />
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="company" className="mb-1 text-base ">
              Company name :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, company_name: e.target.value })
              }
              type="text"
              id="company_name"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter company name"
              required
            />
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="company" className="mb-1 text-base ">
              Location :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_location: e.target.value })
              }
              type="text"
              id="job_location"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter location of the job"
              required
            />
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="job_description" className="mb-1 text-base ">
              Description :
            </label>
            <textarea
              rows={10}
              onChange={(e) =>
                setFormData({ ...formData, job_description: e.target.value })
              }
              onResize={"none"}
              type="text"
              id="job_description"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter description of the job"
              required
            />
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="salary" className="mb-1 text-base ">
              Salary offered :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              type="number"
              id="salary"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter salary offered for the job"
              required
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center">
            <label htmlFor="job_mode" className="mb-1 text-base ">
              Mode :
            </label>
          </div>
          <div className="mb-5">
            <Select
              className="border border-indigo-600 rounded"
              onChange={(e) => setFormData({ ...formData, job_mode: e.value })}
              placeholder="select job mode"
              options={job_mode_options}
              required
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center">
            <label htmlFor="job_type" className="mb-1 text-base ">
              Type :
            </label>
          </div>
          <div className="mb-5">
            <Select
              className="border border-indigo-600 rounded"
              onChange={(e) => setFormData({ ...formData, job_type: e.value })}
              placeholder="select job type"
              options={job_type_options}
              required
            />
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="job_experience" className="mb-1 text-base ">
              Years of experience required :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_experience: e.target.value })
              }
              type="text"
              id="job_experience"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter number of years of experience required for the job"
              required
            />
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="email" className="mb-1 text-base ">
              Email :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              id="email"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter contact email for the job"
              required
            />
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="job_vacancy" className="mb-1 text-base ">
              Number of vacancies available :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_vacancy: e.target.value })
              }
              type="number"
              id="job_vacancy"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter number of vacancies available for the job"
              required
            />
          </div>

          {/* <div className="my-7">
            <fieldset>
              <legend>Select </legend>

              <input
                id="draft"
                className="peer/draft mr-1"
                type="radio"
                name="status"
                checked
              />
              <label
                for="draft"
                className="peer-checked/draft:text-sky-500 mr-4"
              >
                $99
              </label>

              <input
                id="published"
                className="peer/published mr-1"
                type="radio"
                name="status"
              />
              <label
                for="published"
                className="peer-checked/published:text-sky-500"
              >
                $129
              </label>

              <div className="hidden peer-checked/draft:block">
                Drafts are only visible to administrators.
              </div>
              <div className="hidden peer-checked/published:block">
                Your post will be publicly visible on your site.
              </div>
            </fieldset>

          </div> */}
          {/* -------------------------- lemonsqueezy -------------------------- */}
          {/* <SelectItemForPayment formData={formData} /> */}
          {/* <button
            type="submit"
            className="w-full my-5 py-2 rounded bg-indigo-600 text-white"
          >
            Submit
          </button> */}
          <Link
            href={{
              pathname: "/frontend/payment",
              // query: formData, // the data
              query: {
                search: formData,
              },
            }}
          >
            Proceed to payment
          </Link>
        </form>
      </div>
      {/* <PaymentPage formData={formData} /> */}
      <ToastContainer />
    </>
  );
}
