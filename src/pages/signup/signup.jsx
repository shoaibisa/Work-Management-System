/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
const Signup = () => {
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
          <form className="mt-8 space-y-6">
            <div className="-space-y-1px">
              <div className="my-5">
                <label htmlFor="Name" className="sr-only"></label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  isRequired="true"
                />
              </div>
              <div className="my-5">
                <label htmlFor="Email address" className="sr-only">
                  Email
                </label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  isRequired="true"
                  type="email"
                />
              </div>{" "}
              <div className="my-5">
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Phone No"
                  isRequired="true"
                  type="phone"
                />
              </div>
              <div className="my-5">
                <label htmlFor="Password" className="sr-only"></label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  isRequired="true"
                  type="pasword"
                />
              </div>
              <div className="my-5">
                <label htmlFor="Confirm Password" className="sr-only">
                  Email
                </label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  isRequired="true"
                  type="pasword"
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
