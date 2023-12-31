import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const Forapi = ({ apiData, setApiData }) => {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const timestamp = Date.now();
    const fileName = `${file.name}_${timestamp}`;
    setSelectedFile(fileName);
  };
  // console.log(selectedFile);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApiData((prevData) => ({
      ...prevData,
      [name]: value,
      apifile: selectedFile,
    }));
  };
  return (
    <div className="col-span-full mt-12">
      <label
        for="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        For APIs
      </label>
      <div className="mt-2 flex flex-col rounded-lg border border-dashed border-gray-900/25 p-4">
        <div className=" flex flex row mb-6 mt-2 ">
          <label
            for=""
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Target APIs -
          </label>
          <label class="flex ml-8 flex-col items-center justify-center">
            {/* <span class="sr-only">Choose profile photo</span> */}
            <input
              accept=".xls, .xlsx, text/plain"
              type="file"
              name="file"
              onChange={handleFileChange}
              class="block cursor-pointer w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "
            />
          </label>
        </div>

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
              id="about"
              name="apiotherRemarks"
              rows="3"
              value={apiData.apiotherRemarks}
              onChange={handleInputChange}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forapi;
