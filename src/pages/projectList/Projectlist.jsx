import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { Ripple, initTE } from "tw-elements";
function Projectlist() {
  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          {/* main code  */}
          <div className=" font-bold text-2xl ml-10 mt-6 ">List of prjects</div>
          <div className="m-10  flex items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            <div class="block max-w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className=" flex my-2 ">
                <p className=" font-semibold ">Project Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Email - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Company Name - </p>
                <p>sample name</p>
              </div>

              <button
              type="submit"
              className="  flex justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
            >
              Signup
            </button>
            </div>

            <div class="block max-w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className=" flex my-2 ">
                <p className=" font-semibold ">Project Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Email - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Company Name - </p>
                <p>sample name</p>
              </div>

              <button
                type="button"
                class="inline-block rounded bg-[#6439ff] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7e5ef3] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                View
              </button>
            </div>
            <div class="block max-w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className=" flex my-2 ">
                <p className=" font-semibold ">Project Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Email - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Company Name - </p>
                <p>sample name</p>
              </div>

              <button
                type="button"
                class="inline-block rounded bg-[#6439ff] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7e5ef3] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                View
              </button>
            </div>
            <div class="block max-w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className=" flex my-2 ">
                <p className=" font-semibold ">Project Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Email - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Company Name - </p>
                <p>sample name</p>
              </div>

              <button
                type="button"
                class="inline-block rounded bg-[#6439ff] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7e5ef3] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                View
              </button>
            </div>
            <div class="block max-w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className=" flex my-2 ">
                <p className=" font-semibold ">Project Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Email - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Company Name - </p>
                <p>sample name</p>
              </div>

              <button
                type="button"
                class="inline-block rounded bg-[#6439ff] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7e5ef3] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                View
              </button>
            </div>
            <div class="block max-w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className=" flex my-2 ">
                <p className=" font-semibold ">Project Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Name - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Clint Email - </p>
                <p>sample name</p>
              </div>
              <div className="flex my-2">
                <p className=" font-semibold ">Company Name - </p>
                <p>sample name</p>
              </div>

              <button
                type="button"
                class="inline-block rounded bg-[#6439ff] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7e5ef3] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projectlist;
