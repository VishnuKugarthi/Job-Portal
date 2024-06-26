/* eslint-disable no-undef */
import Script from 'next/script';
import { post_job } from '@/Services/job';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function PaymentComponent({ formData }) {
  console.log('formData from post a job page', formData);
  console.log(formData);

  const router = useRouter();
  function lemonLoaded() {
    // useEffect(() => {
    window.createLemonSqueezy();

    LemonSqueezy.Setup({
      eventHandler: async (event) => {
        // Do whatever you want with this event data

        console.log('LemonSqueezy event');
        console.log(event);

        if (event.event === 'Checkout.Success') {
          router.push('/frontend/displayJobs');
          // const res = await post_job(formData);
          // if (res.success) {
          //   toast.success(res.message);
          //   setTimeout(() => {
          //     router.push("/frontend/displayJobs");
          //   }, 1000);
          // } else {
          //   toast.error(res.message);
          // }
        }
      },
    });
    // }, []);
  }
  return (
    <>
      {/* <Script src="https://assets.lemonsqueezy.com/lemon.js" defer></Script> */}
      <Script
        src="https://assets.lemonsqueezy.com/lemon.js"
        onLoad={lemonLoaded}
      ></Script>
      {/* <a
        href="https://dassets.lemonsqueezy.com/buy/fc06ef7f-a9af-4519-94b5-aff96138c988?embed=1"
        class="lemonsqueezy-button"
      >
        Buy Single Job Posting - test
      </a> */}

      <div className="mt-10 w-full">
        <a
          href={process.env.NEXT_PUBLIC_PROMOTE_PAYMENT_14_URL}
          class="lemonsqueezy-button w-full my-5 py-3 px-8 rounded bg-indigo-600 text-white"
          type="submit"
        >
          Pay ${formData.payment_default + formData.payment_promote} to submit
          the Job
        </a>
      </div>
    </>
  );
}
