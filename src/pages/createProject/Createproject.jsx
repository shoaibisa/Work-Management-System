import "./createProject.scss";
import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Forweb from "../../components/forweb/Forweb";
import Forapi from "../../components/forapi/Forapi";
import Fornetwork from "../../components/fornetwork/Fornetwork";
import Formobile from "../../components/formobile/Formobile";
import Forgrc from "../../components/forgrc/Forgrc";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Select, initTE } from "tw-elements";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../actions/projectlistAction";
import { useLocation, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const Createproject = () => {
  const [projectName, setProjectName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [webData, setWebData] = useState({
    webcompanyName: "",
    webclientName: "",
    webclientEmail: "",
    webtargetUrls: [{ lable: "", link: "" }],
    webotherRemarks: "",
  });

  const [apiData, setApiData] = useState({
    apicompanyName: "",
    apiclientName: "",
    apiclientEmail: "",
    apifile: "",
    apiotherRemarks: "",
  });
  console.log(apiData);
  const [networkData, setNetworkData] = useState({
    networkcompanyName: "",
    networkclientName: "",
    networkclientEmail: "",
    networkfile: "",
    networkotherRemarks: "",
  });
  const [mobileData, setMobileData] = useState({
    mobilecompanyName: "",
    mobileclientName: "",
    mobileclientEmail: "",
    mobiletargetUrls: [{ lable: "", link: "" }],
    mobileotherRemarks: "",
  });
  const [grcData, setGRCData] = useState({
    grccompanyName: "",
    grcclientName: "",
    grcclientEmail: "",
    grcotherRemarks: "",
  });
  const [submissionDate, setSubmissionDate] = useState(null);
  const [projectPriority, setProjectPriority] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const projectCreated = useSelector((state) => state.projectCreated);
  const { loading, error, project } = projectCreated;
  useEffect(() => {
    if (project) {
      if (!project.isError) {
        //Navigate(redirect);
      } else {
        setMessage(project.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, redirect]);

  const handleOptionSelect = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  const handleDateChange = (d) => {
    if (d instanceof Date && !isNaN(d)) {
      let datestring =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      setSubmissionDate(datestring);
    } else {
      setSubmissionDate(null);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProject(
        projectName,
        selectedOptions,
        webData,
        apiData,
        networkData,
        mobileData,
        grcData,
        submissionDate,
        projectPriority
      )
    );
    setMessage("Sucessfully Register");
  };
  useEffect(() => {
    initTE({ Select });
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <form
          onSubmit={submitHandler}
          className=" w-3/4 ml-20 mt-10 create_Project "
        >
          <div className="space-y-18">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="text-base font-semibold leading-7 text-gray-900">
                <div className="sm:col-span-4 mb-10">
                  <label
                    for="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Project Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="Ptojectname"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4 text-black-700">
                  <label
                    for="username"
                    className="block mb-6 text-sm font-medium leading-6 text-gray-900"
                  >
                    Project Type :
                  </label>

                  <select
                    data-te-select-init
                    multiple
                    onChange={(e) => handleOptionSelect(e)}
                  >
                    <option value="web">For web</option>
                    <option value="api">For API</option>
                    <option value="network">For Network</option>
                    <option value="mobile">For Mobile</option>
                    <option value="grc">For Grc</option>
                  </select>
                  <label data-te-select-label-ref>Choose Type</label>
                </div>

                {selectedOptions.includes("web") && (
                  <Forweb webData={webData} setWebData={setWebData} />
                )}
                {selectedOptions.includes("api") && (
                  <Forapi apiData={apiData} setApiData={setApiData} />
                )}
                {selectedOptions.includes("network") && (
                  <Fornetwork
                    networkData={networkData}
                    setNetworkData={setNetworkData}
                  />
                )}
                {selectedOptions.includes("mobile") && (
                  <Formobile
                    mobileData={mobileData}
                    setMobileData={setMobileData}
                  />
                )}
                {selectedOptions.includes("grc") && (
                  <Forgrc grcData={grcData} setGRCData={setGRCData} />
                )}

                <div className="mt-16 flex mb-6 flex-row">
                  <p className="block text-lg font-medium leading-6 text-gray-900">
                    Project submission date -
                  </p>
                  <div className="ml-10">
                    <DatePicker
                      onChange={handleDateChange}
                      value={submissionDate}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 mt-6 mb-4">
                  <label
                    for="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Project priority
                  </label>
                  <div className="mt-2">
                    <select
                      value={projectPriority}
                      onChange={(e) => setProjectPriority(e.target.value)}
                      name="Project_priority"
                      autoComplete="country-name"
                      className=" country block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option className="country" value="">
                        Choose Type
                      </option>

                      <option className="country" value="Normal">
                        Normal
                      </option>
                      <option className="country" value="Urgent">
                        Urgent
                      </option>
                    </select>
                  </div>
                </div>

                <div className=" mt-4 flex items-center justify-end gap-x-6">
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
                    Save
                  </button>
                </div>
                <div className="col-span-full"></div>
              </div>
            </div>
          </div>
        </form>
        <div className=" text-green-600 ">{message}</div>
      </div>
    </div>
  );
};

export default Createproject;
