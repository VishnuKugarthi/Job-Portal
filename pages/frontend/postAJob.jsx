/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-anonymous-default-export */
import NavBar from '@/components/NavBar';
import Link from 'next/link';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_job } from '@/Services/job';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import PaymentOverlay from './payment/loadLemonJs';
import LoadLemonJs from './payment/loadLemonJs';
import SelectItemForPayment from './payment/home';
import { boolean } from 'joi';
import PaymentPage from './payment/home';
import Accordion from './payment/accordion';
import LoginFirstUIComponent from './loginFirst';

export default function PostAJob() {
  const user = useSelector((state) => state.User.userData);
  // const router = useRouter();
  const [amount, setAmount] = useState(49);

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
    job_title: '',
    salary: 0,
    email: '',
    company_name: '',
    job_location: '',
    job_description: '',
    job_mode: '',
    job_type: '',
    job_experience: '',
    job_vacancy: 0,
    payment_default: 49,
    payment_promote: 0,
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

    console.log('formData');
    console.log(formData);

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
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const job_type_options = [
    { value: 'fulltime', label: 'Full time' },
    { value: 'parttime', label: 'Part time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
  ];

  console.log('formData');
  console.log(formData);

  console.log('user?.name');
  console.log(user?.name);

  if (
    user?.name == null ||
    user?.name == '' ||
    user?.name == undefined ||
    user?.name == 'undefined'
  ) {
    return (
      <>
        <LoginFirstUIComponent />
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
              onResize={'none'}
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
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value > 0) {
                  setFormData({ ...formData, job_vacancy: value });
                }
                // else {
                //   alert("Please enter a number greater than zero.");
                //   e.target.value = "";
                // }
              }}
              type="number"
              id="job_vacancy"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="enter number of vacancies available for the job"
              required
              min="1"
            />
          </div>

          {/* Payment selection starts here */}
          <div className="mt-5">
            <h1 className="text-md mt-4 py-2">
              Select where you want to display your Job post.
            </h1>

            <div className="flex flex-col">
              <div>
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 mr-2 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                  defaultChecked
                  disabled
                  value={49}
                  // onChange={(e) =>
                  //   setFormData({
                  //     ...formData,
                  //     payment_default: 49,
                  //   })
                  // }
                  required
                />
                <label htmlFor="remember">
                  $49 - The Job post will be displayed for 30 days on{' '}
                  <strong>Available Jobs</strong> section.
                </label>
              </div>
            </div>
          </div>

          {/* Actively Recruiting */}
          <div className="my-5">
            <h1 className="text-md mt-4 py-2">
              🔥🔥 Looking to fill this position soon? Then maybe it's time to
              promote it!
            </h1>

            <div className="flex flex-col">
              <div>
                <input
                  type="radio"
                  id="job_promote_7"
                  name="Job promote"
                  value={20}
                  className="w-4 h-4 mr-1 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payment_promote: parseInt(e.target.value, 10),
                    })
                  }
                />
                <label for="html">
                  $20 - Promote the job post for 7 days by adding it to the{' '}
                  <strong>Actively Recruiting</strong> section.
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="job_promote_14"
                  name="Job promote"
                  value={30}
                  className="w-4 h-4 mr-1 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payment_promote: parseInt(e.target.value, 10),
                    })
                  }
                />
                <label for="html">
                  $30 - Promote the job post for 14 days by adding it to the{' '}
                  <strong>Actively Recruiting</strong> section.
                </label>
              </div>
            </div>
          </div>

          {/* <div className="mt-8">
            <Accordion
              title="View the complete breakup"
              content={
                <div>
                  <div className="flex flex-col justify-between">

                  </div>
                </div>
              }
            />
          </div> */}

          {/* Payment selection ends here */}
          {/* <button
            type="submit"
            className="w-full my-5 py-2 rounded bg-indigo-600 text-white"
          >
            Pay ${formData.payment_default + formData.payment_promote} to submit
            the Job
          </button> */}
          {/* <a
            href="https://dassets.lemonsqueezy.com/buy/fc06ef7f-a9af-4519-94b5-aff96138c988?embed=1"
            class="lemonsqueezy-button my-5 py-2 px-20 rounded bg-indigo-600 text-white"
            type="submit"
          >
            Pay ${formData.payment_default + formData.payment_promote} to submit
            the Job
          </a> */}
          <PaymentPage formData={formData} />
        </form>
      </div>

      <ToastContainer />
    </>
  );
}
