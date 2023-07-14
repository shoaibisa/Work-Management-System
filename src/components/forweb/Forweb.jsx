import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiFillMinusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import "./spinner.css";
const Forweb = ({ webData, setWebData }) => {
  const [targetURL, setTargetURL] = useState([{ lable: "", link: "" }]);
  const [isHoveredplus, setIsHoveredplus] = useState(false);
  const [isHoveredminus, setIsHoveredminus] = useState(false);
  // handle input change
  const handleInputChanges = (e, index) => {
    const { name, value } = e.target;
    const list = [...targetURL];
    list[index][name] = value;
    setTargetURL(list);
    setWebData((prevData) => ({
      ...prevData,
      [name]: value,
      webtargetUrls: list,
    }));
  };

  // console.log(targetURL);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWebData((prevData) => ({
      ...prevData,
      [name]: value,
      webtargetUrls: targetURL,
    }));
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...targetURL];
    list.splice(index, 1);
    setTargetURL(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setTargetURL([...targetURL, { lable: "", link: "" }]);
  };
  return (
    <div className="col-span-full mt-6">
      <label
        for="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        For Web
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
                  name="webcompanyName"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Company Name"
                  value={webData.webcompanyName}
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
                  name="webclientName"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Client Name"
                  value={webData.webclientName} // Add this line
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
                  name="webclientEmail"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter Client email"
                  value={webData.webclientEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div> */}
        {/* Target URL */}
        <div className="mb-6">
          <div className="flex flex-row">
            <p className="block text-md font-medium leading-6 text-gray-900">
              Target Url
            </p>
          </div>

          <div>
            {targetURL.map((x, i) => {
              return (
                <>
                  <div className=" mt-2 flex flex-row">
                    <div className=" sm:col-span-4 mb-10 w-[240px] mr-6">
                      <label
                        for="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Lable
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            id="lable"
                            name="lable"
                            autoComplete="username"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Enter Lable"
                            value={x.lable}
                            onChange={(e) => handleInputChanges(e, i)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-4 mb-10 w-[240px]">
                      <label
                        for="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Link
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            id="link"
                            name="link"
                            autoComplete="username"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Enter Link"
                            value={x.link}
                            onChange={(e) => handleInputChanges(e, i)}
                          />
                        </div>
                      </div>
                    </div>
                    {targetURL.length !== 1 && (
                      <div
                        className="flex items-center text-2xl cursor-pointer ml-6"
                        onMouseEnter={() => setIsHoveredminus(true)}
                        onMouseLeave={() => setIsHoveredminus(false)}
                        onClick={() => handleRemoveClick(i)} // Call handleClickminus without passing any parameters
                      >
                        {isHoveredminus ? (
                          <AiFillMinusCircle />
                        ) : (
                          <AiOutlineMinusCircle />
                        )}
                      </div>
                    )}

                    {targetURL.length - 1 === i && (
                      <div
                        onClick={handleAddClick}
                        className="flex items-center text-2xl cursor-pointer ml-6"
                        onMouseEnter={() => setIsHoveredplus(true)}
                        onMouseLeave={() => setIsHoveredplus(false)}
                      >
                        {isHoveredplus ? (
                          <AiFillPlusCircle />
                        ) : (
                          <AiOutlinePlusCircle />
                        )}
                      </div>
                    )}
                  </div>
                </>
              );
            })}

            {/* {h1Tags.map((tag) => tag)} */}
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="about"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Other Remarks
          </label>
          <div class="mt-2">
            <textarea
              value={webData.webotherRemarks} // Add this line
              onChange={handleInputChange}
              name="webotherRemarks"
              rows="3"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forweb;
