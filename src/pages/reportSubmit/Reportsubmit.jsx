import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";

const Reportsubmit = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        {/* main code here  */}

        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight m-6">
          Submit Report
        </h2>
        <div className=" flex w-fit  rounded-lg border border-dashed border-gray-900/25 p-6 m-6 mt-6">
          <form action="">
            <div className=" flex  ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vulnerability Name
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 ml-10 ">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Risk
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[300px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="ml-10 sm:col-span-4">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Attributing Factor
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className=" flex  mt-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Affected URL
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 ml-10 ">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Observation
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[300px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 ml-10 ">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  CWE #
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[300px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className=" flex  mt-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Impact
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 ml-10 ">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mitigations
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[300px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 ml-10 w-[300px] ">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  POC
                </label>
                <div className="mt-2">
                  <input
                    class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>
            </div>

            <div className=" flex flex-col  mt-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brief Description
                </label>
                <div className="mt-2">
                  <input
                    id="Vulnerability"
                    name="Vulnerability"
                    type="text"
                    className="block w-[650px] h-[75px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className=" flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reportsubmit;
