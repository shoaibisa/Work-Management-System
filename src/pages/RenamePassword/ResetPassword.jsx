import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [p1, setp1] = useState("");
  const [p2, setp2] = useState("");
  const uid = useParams();
  const userid = uid.userid;
  const token = uid.token;
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");

    // password unmatch
    if (p1 !== p2) {
      toast.error("password do not match..");
      toast.dismiss(toastId);
      return;
    }
    console.log("inside frontend function");

    try {
      const res = await fetch("http://localhost:5000/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, p1, token }),
      });
      const responce = await res.json();
      console.log(responce);
      if (!responce.success) {
        // Handle response errors, if any
        toast.dismiss(toastId);
        toast.error("error");
        console.log("Error");
      }
      toast.success("password changed");
      navigate("/login");
      toast.dismiss(toastId);
    } catch (error) {
      // Handle network or fetch-related errors
      console.log("Network error: " + error);
      toast.dismiss(toastId);
    }
  };

  return (
    <div>
      <div className="min-h-full  flex-col h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className=" w-[20rem] ">
          <h2 className="mt-6 flex justify-start text-center text-3xl font-extrabold text-gray-900">
            Change password
          </h2>
          {/* form start */}
          <form className="mt-8 space-y-6" onSubmit={submitHandler} action="">
            {/* add pass  */}
            {/* <p className="text-center flex justify-start items-start text-sm text-gray-600 mt-5">
              Enter new password
            </p> */}
            <div className="">
              <label for="Email address" className="sr-only">
                Email
              </label>
              <input
                className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Enter new password"
                required
                type="text"
                value={p1}
                onChange={(e) => setp1(e.target.value)}
              />
            </div>

            {/* confirm pass  */}
            {/* <p className="text-center flex justify-start items-start text-sm text-gray-600 mt-5">
              Confirm new password
            </p> */}
            <div className="my-5">
              <label for="Email address" className="sr-only">
                Email
              </label>
              <input
                className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
                required
                type="text"
                value={p2}
                onChange={(e) => setp2(e.target.value)}
              />
            </div>

            {/* btn  */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-10"
            >
              Update new password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
