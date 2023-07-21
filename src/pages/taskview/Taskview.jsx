import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";

function Taskview() {
  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          {/* main code  */}
          <div className=" flex mt-6 mx-10 justify-between ">
            <div className="font-bold text-2xl">Task Name</div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Report
            </button>
          </div>

          <div className="m-10 flex gap-4  flex-col   rounded-lg border border-dashed border-gray-900/25 p-4">
            <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
              <dt className="text-sm font-semibold leading-6 text-gray-900">
                Edited :
              </dt>
              <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                10/12/2023
              </div>
            </div>

            <div className="px-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
              <dt className="text-sm font-semibold leading-6 text-gray-900">
                Name :
              </dt>
              <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Dummy name
              </div>
            </div>

            <div className="px-6  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
              <dt className="text-sm font-semibold leading-6 text-gray-900">
                Pdf :
              </dt>
              <div className=" flex-shrink-0">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Download
                </a>
              </div>
            </div>

            <div className="px-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
              <dt className="text-sm font-semibold leading-6 text-gray-900">
                Comments :
              </dt>

              <div className=" flex flex-col   rounded-lg border border-dashed border-gray-900/25 w-[550px]">
                <div className="container">
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    {/* Chat area */}
                    <div className="mb-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0"></div>
                        <div className="ml-3">
                          <div className="bg-blue-100 text-blue-900 p-2 rounded-lg">
                            Jaldi kam kar bhai .
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Just now</p>
                        </div>
                      </div>

                      <div className="flex items-end">
                        <div className="flex-shrink-0"></div>
                        <div className="ml-3">
                          <div className="bg-green-100 text-blue-600 p-2 rounded-lg">
                            Ok sir .
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Just now</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center border-t mt-4 pt-4">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-400"
                        placeholder="Type your message..."
                      />
                      <div className=" mr-3 ">
                        <PaperClipIcon
                          className="h-5 cursor-pointer w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <button className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="inline-block rounded-full w-24 ml-4 bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
            >
              completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Taskview;
