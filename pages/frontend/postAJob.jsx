import NavBar from "@/components/NavBar";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post_job } from "@/Services/job";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import PaymentOverlay from "../payment/loadLemonJs";
import LoadLemonJs from "../payment/loadLemonJs";
import SelectItemForPayment from "../payment/page";

export default function PostAJob() {
  const user = useSelector((state) => state.User.userData);
  const router = useRouter();

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
    user: user?._id,
    job_title: "",
    salary: 0,
    email: "",
    company_name: "",
    job_description: "",
    job_mode: "",
    job_type: "",
    job_experience: "",
    job_vacancy: 0,
  });
  const [error, setError] = useState({
    user: "",
    job_title: "",
    salary: "",
    email: "",
    company_name: "",
    job_description: "",
    job_mode: "",
    job_type: "",
    job_experience: "",
    job_vacancy: "",
  });

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

    if (formData.user == null) {
      return toast.error("Please Login First");
    }

    if (!formData.title) {
      setError({ ...error, title: "Job title field is required" });
      return;
    }

    if (!formData.salary) {
      setError({ ...error, salary: "Salary field is required" });
      return;
    }

    if (!formData.email) {
      setError({ ...error, email: "Email field is Required" });
      return;
    }

    if (!formData.company) {
      setError({ ...error, company_name: "Company anme field is required" });
      return;
    }
    if (!formData.description) {
      setError({
        ...error,
        job_description: "Job description field is required",
      });
      return;
    }
    if (!formData.job_mode) {
      setError({ ...error, job_mode: "Job category field is required" });
      return;
    }
    if (!formData.job_type) {
      setError({ ...error, job_type: "Job type field is required" });
      return;
    }
    if (!formData.job_experience) {
      setError({
        ...error,
        job_experience: "Job experience field is required",
      });
      return;
    }
    if (!formData.job_vacancy) {
      setError({ ...error, job_vacancy: "Job vacancy field is required" });
      return;
    }

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

  return (
    <>
      <NavBar />
      {/* <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script> */}
      <div className="w-full  py-20 flex items-center  justify-center flex-col">
        <h1 className="text-xl mt-4 uppercase border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl">
          Enter Job Details
        </h1>
        <form
          onSubmit={handleSubmit}
          className="sm:w-1/2 w-full px-4 mx-4  h-full"
        >
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="job_title" className="mb-1 text-base font-semibold">
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
            />
            {error.job_title && (
              <p className="text-sm text-red-500">{error.title}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="company" className="mb-1 text-base font-semibold">
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
            />
            {error.company_name && (
              <p className="text-sm text-red-500">{error.company_name}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label
              htmlFor="job_description"
              className="mb-1 text-base font-semibold"
            >
              Job description :
            </label>
            <textarea
              onChange={(e) =>
                setFormData({ ...formData, job_description: e.target.value })
              }
              onResize={"none"}
              type="text"
              id="description"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter description of the job"
            />
            {error.job_description && (
              <p className="text-sm text-red-500">{error.job_description}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="salary" className="mb-1 text-base font-semibold">
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
            />
            {error.salary && (
              <p className="text-sm text-red-500">{error.salary}</p>
            )}
          </div>
          <div className="w-full flex flex-col items-start justify-center">
            <label
              htmlFor="jobCategory"
              className="mb-1 text-base font-semibold"
            >
              Job mode :
            </label>
          </div>
          <div className="mb-5">
            <Select
              className="border border-indigo-600 rounded"
              onChange={(e) => setFormData({ ...formData, job_mode: e.value })}
              placeholder="select job mode"
              options={job_mode_options}
            />
            {error.job_mode && (
              <p className="text-sm text-red-500">{error.job_mode}</p>
            )}
          </div>
          <div className="w-full flex flex-col items-start justify-center">
            <label
              htmlFor="jobCategory"
              className="mb-1 text-base font-semibold"
            >
              Job type :
            </label>
          </div>
          <div className="mb-5">
            <Select
              className="border border-indigo-600 rounded"
              onChange={(e) => setFormData({ ...formData, job_type: e.value })}
              placeholder="select job type"
              options={job_type_options}
            />
            {error.job_type && (
              <p className="text-sm text-red-500">{error.job_type}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label
              htmlFor="jobExperience"
              className="mb-1 text-base font-semibold"
            >
              Years of experience required :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_experience: e.target.value })
              }
              type="text"
              id="jobExperience"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter number of years of experience required for the job"
            />
            {error.job_experience && (
              <p className="text-sm text-red-500">{error.job_experience}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="email" className="mb-1 text-base font-semibold">
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
            />
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="jobva" className="mb-1 text-base font-semibold">
              Number of vacancies available :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_vacancy: e.target.value })
              }
              type="number"
              id="jobva"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter number of vacancies available for the job"
            />
            {error.job_vacancy && (
              <p className="text-sm text-red-500">{error.job_vacancy}</p>
            )}
          </div>

          <div className="my-7">
            <fieldset>
              <legend>Published status</legend>

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

            {/* -------------------------- lemonsqueezy -------------------------- */}
            <SelectItemForPayment formData={formData} />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-indigo-600 text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
