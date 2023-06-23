/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
const Login = () => {
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
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
              Don't have an account yet?
              <Link
                to="/signup"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Signup
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div className="-space-y-1px">
              <div className="my-5">
                <label htmlFor="Email address" className="sr-only"></label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  isRequired="true"
                />
              </div>
              <div className="my-5">
                <label htmlFor="Email address" className="sr-only">
                  Email
                </label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  isRequired="true"
                />
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-10"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
