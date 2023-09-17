/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/employeeAction";
import Spinner from "../../components/spinner/spinner";
import { Select, initTE } from "tw-elements";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedrole, setSelectedrole] = useState("");
  const [profile, setProfile] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const Navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/login";
  const dispatch = useDispatch();

  const employeeregister = useSelector((state) => state.employeeregister);
  const { loading, error, employeeInfo } = employeeregister;
  useEffect(() => {
    if (employeeInfo) {
      if (!employeeInfo.isError) {
        toast.success("Siggned up..");
        Navigate(redirect);
      } else {
        setMessage(employeeInfo.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !selectedDepartment ||
      !selectedrole ||
      !profile
    ) {
      setMessage("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      setMessage("Confirm Password  do not Match");
    } else {
      setMessage(""); // Clear any previous error messages.
      dispatch(
        register(name, email, password, phone, selectedDepartment, selectedrole,profile)
      );
    }
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    setProfile(selectedFiles);
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
                <select
                  required
                  data-te-select-init
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option selected>Choose Department</option>
                  <option value="hr">HR Tram</option>
                  <option value="grc">GRC Team</option>
                  <option value="account">Account Team</option>
                  <option value="technical">Technical Team</option>
                  <option value="marketing">Marketing Team</option>
                  <option value="management">Management Team</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <div className="my-5">
                <select
                  data-te-select-init
                  required
                  value={selectedrole}
                  onChange={(e) => setSelectedrole(e.target.value)}
                >
                  <option selected>Choose role</option>
                  <option value="Employee">Employee</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Client">Client</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-4  ">
              <label
                htmlFor="Vulnerability"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile Picture
              </label>
              <div className="mt-2">
                <input
                  class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  onChange={handleFileInputChange}
                  name="rofile"
                  id="formFile"
                />
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
