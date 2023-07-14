import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const Formobile = ({ mobileData, setMobileData }) => {
  const [targetURL, setTargetURL] = useState([{ lable: "", link: "" }]);

  const [showandroid, setandroid] = useState(false);
  const [showios, setios] = useState(false);
  // handle input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    const list = [...targetURL];
    console.log(list);
    list[name] = value;
    setTargetURL(list);
    setMobileData((prevData) => ({
      ...prevData,
      [name]: value,
      //mobilwtargetUrls: list,
    }));
  };
  console.log(showios);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMobileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const knot = () => {
    setandroid(!showandroid);
  };

  const knotios = () => {
    setios(!showios);
  };

  return (
    <div className="col-span-full mt-12">
      <label
        for="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        For Mobile
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
                  name="mobilecompanyName"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Company Name"
                  value={mobileData.mobilecompanyName}
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
                  name="mobileclientName"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Client Name"
                  value={mobileData.mobileclientName}
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
              Client email
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="mail"
                  name="mobileclientEmail"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Client email"
                  value={mobileData.mobileclientEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div> */}
        {/* os url input field wala section  */}
        <div>
          <label
            for="username"
            className="block pb-6 text-sm font-medium leading-6 text-gray-900"
          >
            Paste Application Url
          </label>
          {/* 1 */}
          <div className="relative mb-4 flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="comments"
                name="comments"
                onChange={knot}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="text-sm leading-6">
              <label for="comments" className="font-medium text-gray-900">
                Android
              </label>

              {showandroid && (
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="url"
                    name="mobile_anoride_link"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter url"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2 */}

          <div className="relative mb-4 flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                onChange={knotios}
                name="lable"
                value="ios"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="text-sm leading-6">
              <label for="comments" className="font-medium text-gray-900">
                Ios
              </label>

              <div>
                {showios && (
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="url"
                      name="link"
                      value={targetURL.link}
                      onChange={(e) => handleInputChanges(e)}
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter url"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
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
              name="mobileotherRemarks"
              rows="3"
              value={mobileData.mobileotherRemarks}
              onChange={handleInputChange}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formobile;
