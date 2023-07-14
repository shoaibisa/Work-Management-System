import React from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const Forgrc = ({ grcData, setGRCData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGRCData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="col-span-full mt-12">
      <label
        for="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        For Grc
      </label>
      <div className="mt-2 flex flex-col rounded-lg border border-dashed border-gray-900/25 p-4">
        {/* 3 input fields  */}
        {/* <div className="flex w-full">
         
          <div className="sm:col-span-4 w-1/3 mr-10 mb-10">
            <label
              for="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="grccompanyName"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Company Name"
                  value={grcData.grccompanyName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
       
          <div className="sm:col-span-4 w-1/3 mr-10 mb-10">
            <label
              for="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Client Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="grcclientName"
                  autoComplete="=ClientName"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Client Name"
                  value={grcData.grcclientName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
     
          <div className="sm:col-span-4 w-1/3 mr-10 mb-10">
            <label
              for="Clientemail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Client email
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="mail"
                  name="grcclientEmail"
                  autoComplete="Clientemail"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Client email"
                  value={grcData.grcclientEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div> */}

        {/* remarks section  */}
        <div class="col-span-full">
          <label
            for="about"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Other Remarks
          </label>
          <div class="mt-2">
            <textarea
              name="grcotherRemarks"
              rows="3"
              value={grcData.grcotherRemarks}
              onChange={handleInputChange}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgrc;
