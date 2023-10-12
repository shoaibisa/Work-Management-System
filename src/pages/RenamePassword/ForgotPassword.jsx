import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../actions/employeeAction";
import toast from "react-hot-toast";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const toatstid = toast.loading("Loading..");
    const res = await fetch("http://localhost:5000/auth/forgetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("result is  - ", data);

    if (data.success === true) {
      toast.dismiss(toatstid);
      toast.success("Check your email..");
    } else {
      toast.dismiss(toatstid);
      toast.error("User not registred..");
      return;
    }
  };

  return (
    <div className="min-h-full  flex-col h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-[20rem] ">
        <h2 className="mt-6 flex justify-start text-center text-3xl font-extrabold text-gray-900">
          Forget password..?
        </h2>
        {/* form start */}
        <form className="mt-8 space-y-6" onSubmit={submitHandler} action="">
          <p className="text-center flex justify-start items-start text-sm text-gray-600 mt-5">
            Enter your registred email
          </p>
          <div className="my-5">
            <label for="Email address" className="sr-only">
              Email
            </label>
            <input
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-10"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
