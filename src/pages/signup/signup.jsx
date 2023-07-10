/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/employeeAction";
import Spinner from "../../components/spinner/spinner";
import { Select, initTE } from "tw-elements";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const Navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();

  const employeeregister = useSelector((state) => state.employeeregister);
  const { loading, error, employeeInfo } = employeeregister;
  useEffect(() => {
    if (employeeInfo) {
      if (!employeeInfo.isError) {
        Navigate(redirect);
      } else {
        setMessage(employeeInfo.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Confirm Password  do not Match");
      setMessage("Confirm Password  do not Match");
    } else {
      dispatch(register(name, email, password, phone));
      // setMessage("Sucessfully Register");
    }
  };

  // Initialization for ES Users
  useEffect(() => {
    initTE({ Select });
  }, []);

  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="mb-10">
            <div className="flex justify-center">
              <img
                alt=""
                className="h-14 w-14"
                src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Signup to create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Login
              </Link>
            </p>
          </div>
          {error && <div className=" text-red-600">{employeeInfo.message}</div>}
          {message && <div className=" text-red-600">{message} </div>}
          <form
            className="mt-8 space-y-6"
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <div className="-space-y-1px">
              <div className="my-5">
                <label for="Name" className="sr-only"></label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="John Doe"
                  required
                  type="text"
                  isRequired="true"
                  id="name"
                  autoComplete="false"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label for="Email address" className="sr-only">
                  Email
                </label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  required
                  type="email"
                  placeholder="your-email@gmail.com"
                  id="username"
                  autocomplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>{" "}
              <div className="my-5">
                <label for="phone" className="sr-only">
                  Phone
                </label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  required
                  type="phone"
                  placeholder="Mobile No"
                  id="mobileno"
                  autoComplete="false"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label for="Password" className="sr-only"></label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  required
                  type="password"
                  placeholder="Your Password"
                  id="password"
                  autoComplete="false"
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label for="Confirm Password" className="sr-only">
                  Email
                </label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  required
                  type="password"
                  placeholder="Re-type Your Password"
                  id="re-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="my-5">
                <select data-te-select-init>
                  <option disabled selected>
                    Choose Department
                  </option>
                  <option value="1">HR Tram</option>
                  <option value="2">GRC Team</option>
                  <option value="3">Account Team</option>
                  <option value="4">Technical Team</option>
                  <option value="5">Marketing Team</option>
                  <option value="6">Management Team</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-10"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
