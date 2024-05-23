// import { post_job } from "@/Services/job";
import Script from 'next/script';
import React from 'react';
// import { toast, ToastContainer } from "react-toastify";
// import { useRouter } from "next/router";

export default function LoadLemonJs() {
  // const router = useRouter();

  // function lemonLoaded() {
  //   window.createLemonSqueezy();

  //   // async function PostJobAfterPayment(){
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

  //   // }
  // }
  return (
    <>
      <Script
        src="https://assets.lemonsqueezy.com/lemon.js"
        strategy="lazyOnload"
      ></Script>
    </>
  );
}
