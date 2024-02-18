import "./createProject.scss";
import {
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiFillMinusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Select, initTE, Input, Datepicker } from "tw-elements";
import { useState } from "react";
import { viewProject, viewTask } from "../../actions/projectlistAction";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CreateTask = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [targetURL, setTargetURL] = useState([{ lable: "", link: "" }]);
  const [isHoveredplus, setIsHoveredplus] = useState(false);
  const [isHoveredminus, setIsHoveredminus] = useState(false);
  const [webotherRemarks, setwebotherRemarks] = useState("");

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
  const handleInputChanges = (e, index) => {
    const { name, value } = e.target;
    const updatedTargetURL = targetURL.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setTargetURL(updatedTargetURL);
  };

  // For Api
  const [apiselectedFile, setApiselectedFile] = useState(null);
  const [apiotherRemarks, setapiotherRemarks] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setApiselectedFile(file);
  };
  // for network
  const [networkselectedFile, setNetworkselectedFile] = useState(null);
  const [networkotherRemarks, setNetworkotherRemarks] = useState("");

  const handleFileChange_network = (e) => {
    // Access the selected file from the input field
    const file = e.target.files[0];
    setNetworkselectedFile(file);
  };
  //console.log(networkselectedFile);
  // For Mobile
  const [mobileotherRemarks, setMobileotherRemarks] = useState("");
  const [androidUrl, setAndroidUrl] = useState("");
  const [iosUrl, setIosUrl] = useState("");

  // For Grc
  const [grcotherRemarks, setGrcotherRemarks] = useState("");
  //console.log(mobileData);
  const [message, setMessage] = useState("");

  const [taskName, setTaskName] = useState("");

  const location = useLocation();
  const Navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const createdBY = userData?.id;
  const { projectId } = useParams();

  useEffect(() => {
    // Initialize the first multi-select
    initTE({ Select }, "#select1");
    // Initialize the second multi-select
    initTE({ Select }, "#select2");
    initTE({ Select }, "#select3");
    initTE({ Datepicker, Input });
  }, [selectedOptions, targetURL]);

  const handleOptionSelect = (event) => {
    event.preventDefault();
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };
  const [testingType, setTestingType] = useState([]);
  const handletypeTesting = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTestingType(selectedValues);
  };
  //console.log(testingType);

  const token = userData?.token;

  const submitHandler = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData();

    // Add selectedOptions to formData as an array
    formData.append("selectedOptions", JSON.stringify(selectedOptions));
    formData.append("project", projectId);
    formData.append("taskname", taskName);

    // Check if "web" is selected
    if (selectedOptions.includes("web")) {
      // Add web-related data to formData
      formData.append("webtargetUrls", JSON.stringify(targetURL));
      formData.append("webotherRemarks", webotherRemarks);
    }

    // Check if "api" is selected
    if (selectedOptions.includes("api")) {
      // Add api-related data to formData
      formData.append("apiselectedFile", apiselectedFile);
      formData.append("apiotherRemarks", apiotherRemarks);
    }

    // Check if "network" is selected
    if (selectedOptions.includes("network")) {
      // Add network-related data to formData
      formData.append("networkselectedFile", networkselectedFile);
      formData.append("networkotherRemarks", networkotherRemarks);
    }

    // Check if "mobile" is selected
    if (selectedOptions.includes("mobile")) {
      // Add mobile-related data to formData
      // formData.append("mobile_anoride_link", targetURL[0]?.link || ""); // Assuming only one link is needed for mobile
      // formData.append("ios_link", targetURL[1]?.link || ""); // Assuming the second link is for iOS
      formData.append("mobileotherRemarks", mobileotherRemarks);
      formData.append("mobile_anoride_link", androidUrl);
      formData.append("ios_link", iosUrl);
    }

    if (selectedOptions.includes("grc")) {
      // Add grc-related data to formData
      formData.append("grcotherRemarks", grcotherRemarks);
    }

    // Add createdBy
    formData.append("createdBy", createdBY);

    try {
      const response = await fetch("http://localhost:5000/project/createTask", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the "Authorization" header
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Task created..");
        setMessage("Successfully Task Created");
      } else {
        setMessage("Failed to create task");
      }
    } catch (error) {
      toast.error("Error while creating task..");
      console.error("Error submitting form:", error);
      setMessage("An error occurred while creating zthe task");
    }
    setMessage("Sucessfully Task Created");
    Navigate("/projectlist");
  };

  const dispatch = useDispatch();
  const projectView = useSelector((state) => state.projectView);
  const { loading, error, project } = projectView;
  const { data } = project;

  useEffect(() => {
    dispatch(viewProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, projectId]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1 className="m-6  text-gray-900"> Create Task</h1>
        <form
          onSubmit={submitHandler}
          className=" w-4/4 ml-20 mt-10 create_Project "
          method="post"
          enctype="multipart/form-data"
        >
          <div className="space-y-18">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="text-base font-semibold leading-7 text-gray-900">
                <div className="sm:col-span-4 w-1/1 mr-10  mt-6  mb-6">
                  <div className="sm:col-span-4 w-1/1 mr-10 mb-10">
                    <label
                      for="username"
                      className="block text-sm leading-6 text-gray-900  font-bold"
                    >
                      Project Name : {data && data.projectName} (Id:{projectId})
                    </label>
                  </div>
                  <div className="sm:col-span-4 w-1/2 mr-10 mb-10">
                    <label
                      for="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Task Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="taskname"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter Task Name"
                          required="true"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" sm:col-span-4 mt-6 text-black-700">
                    <label
                      for="projectType"
                      className="block mb-6 text-sm font-medium leading-6 text-gray-900"
                    >
                      Task Type :
                    </label>

                    <select
                      data-te-select-init
                      multiple
                      id="select1"
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
                    <>
                      {/* <Forweb webData={webData} setWebData={setWebData} /> */}
                      <div className="col-span-full mt-6">
                        <label
                          for="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          For Web
                        </label>
                        <div className="mt-2 flex flex-col rounded-lg border border-dashed border-gray-900/25 p-4">
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
                                    <div className=" mt-2 w-full flex flex-row">
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
                                              onChange={(e) =>
                                                handleInputChanges(e, i)
                                              }
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
                                              onChange={(e) =>
                                                handleInputChanges(e, i)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>{" "}
                                      <div className="sm:col-span-4 ml-5 mb-10 w-[240px]">
                                        <label
                                          for="username"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Type
                                        </label>
                                        <div className="mt-2">
                                          <select
                                            className=" pt-2  "
                                            data-te-select-init
                                            multiple
                                            id="select3"
                                            // onChange={(e) =>
                                            //   handleOptionSelect(e)
                                            // }
                                          >
                                            <option value="black">Black</option>
                                            <option value="red">Red</option>
                                            <option value="grey">Grey</option>
                                          </select>
                                        </div>
                                      </div>
                                      {/* datepicker  */}
                                      <div
                                        class="relative ml-5 h-[35px] mt-8 "
                                        data-te-datepicker-init
                                        data-te-input-wrapper-init
                                      >
                                        <input
                                          type="text"
                                          class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                          placeholder="Select a date"
                                        />
                                        <label
                                          for="floatingInput"
                                          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                        >
                                          Select a date
                                        </label>
                                      </div>
                                      {targetURL.length !== 1 && (
                                        <div
                                          className="flex items-center text-2xl cursor-pointer ml-6"
                                          onMouseEnter={() =>
                                            setIsHoveredminus(true)
                                          }
                                          onMouseLeave={() =>
                                            setIsHoveredminus(false)
                                          }
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
                                          onMouseEnter={() =>
                                            setIsHoveredplus(true)
                                          }
                                          onMouseLeave={() =>
                                            setIsHoveredplus(false)
                                          }
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
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              for="about"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Other Remarks
                            </label>
                            <div className="mt-2">
                              <textarea
                                value={webotherRemarks} // Add this line
                                onChange={(e) =>
                                  setwebotherRemarks(e.target.value)
                                }
                                name="webotherRemarks"
                                rows="3"
                                required
                                className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {/* PasteHere */}
                  {selectedOptions.includes("api") && (
                    <>
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
                                type="file"
                                name="apiselectedFile"
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
                            <div className="sm:col-span-4 ml-5 mb-10 w-[240px]">
                              <label
                                for="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Type
                              </label>
                              <div className="mt-2">
                                <select
                                  className=" pt-2  "
                                  data-te-select-init
                                  multiple
                                  id="select3"
                                  // onChange={(e) =>
                                  //   handleOptionSelect(e)
                                  // }
                                >
                                  <option value="black">Black</option>
                                  <option value="red">Red</option>
                                  <option value="grey">Grey</option>
                                </select>
                              </div>
                            </div>
                            {/* datepicker  */}
                            <div
                              class="relative ml-5 h-[35px] mt-8 "
                              data-te-datepicker-init
                              data-te-input-wrapper-init
                            >
                              <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                placeholder="Select a date"
                              />
                              <label
                                for="floatingInput"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                              >
                                Select a date
                              </label>
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
                                id="about"
                                name="apiotherRemarks"
                                rows="3"
                                required
                                value={apiotherRemarks}
                                onChange={(e) =>
                                  setapiotherRemarks(e.target.value)
                                }
                                class=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedOptions.includes("network") && (
                    <>
                      <div className="col-span-full mt-12">
                        <label
                          for="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          For Network
                        </label>
                        <div className="mt-2 flex flex-col rounded-lg border border-dashed border-gray-900/25 p-4">
                          {/* target url vala section  */}
                          <div className=" flex  row mb-6 mt-2 ">
                            <label
                              for=""
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Target Ip List -
                            </label>
                            <label class="flex ml-8 flex-col items-center justify-center">
                              {/* <span class="sr-only">Choose profile photo</span> */}
                              <input
                                type="file"
                                onChange={handleFileChange_network}
                                name="networkselectedFile"
                                class="block cursor-pointer w-full text-sm text-slate-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-violet-50 file:text-violet-700
                                  hover:file:bg-violet-100
                                "
                              />
                            </label>
                            <div className="sm:col-span-4 ml-5 mb-10 w-[240px]">
                              <label
                                for="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Type
                              </label>
                              <div className="mt-2">
                                <select
                                  className=" pt-2  "
                                  data-te-select-init
                                  multiple
                                  id="select3"
                                  // onChange={(e) =>
                                  //   handleOptionSelect(e)
                                  // }
                                >
                                  <option value="black">Black</option>
                                  <option value="red">Red</option>
                                  <option value="grey">Grey</option>
                                </select>
                              </div>
                            </div>
                            {/* datepicker  */}
                            <div
                              class="relative ml-5 h-[35px] mt-8 "
                              data-te-datepicker-init
                              data-te-input-wrapper-init
                            >
                              <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                placeholder="Select a date"
                              />
                              <label
                                for="floatingInput"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                              >
                                Select a date
                              </label>
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
                                name="networkotherRemarks"
                                rows="3"
                                required
                                value={networkotherRemarks}
                                onChange={(e) =>
                                  setNetworkotherRemarks(e.target.value)
                                }
                                class=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedOptions.includes("mobile") && (
                    <>
                      <div className="col-span-full mt-12">
                        <label
                          for="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          For Mobile
                        </label>
                        <div className="mt-2 flex rounded-lg border border-dashed border-gray-900/25 p-4">
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
                              <div className="flex h-6 items-center"></div>
                              <div className="text-sm leading-6">
                                <label
                                  for="comments"
                                  className="font-medium text-gray-900"
                                >
                                  Android
                                </label>

                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="url"
                                    name="mobile_anoride_link"
                                    value={androidUrl}
                                    onChange={(e) =>
                                      setAndroidUrl(e.target.value)
                                    }
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter url"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* 2 */}

                            <div className="relative mb-4 flex gap-x-3">
                              <div className="flex h-6 items-center"></div>
                              <div className="text-sm leading-6">
                                <label
                                  for="comments"
                                  className="font-medium text-gray-900"
                                >
                                  Ios
                                </label>

                                <div>
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="url"
                                      name="ios_link"
                                      value={iosUrl}
                                      onChange={(e) =>
                                        setIosUrl(e.target.value)
                                      }
                                      autoComplete="username"
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Enter url"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-4 ml-5 mt-10 mb-10 w-[240px]">
                            <label
                              for="username"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Type
                            </label>
                            <div className="mt-2">
                              <select
                                className=" pt-2  "
                                data-te-select-init
                                multiple
                                id="select3"
                                // onChange={(e) =>
                                //   handleOptionSelect(e)
                                // }
                              >
                                <option value="black">Black</option>
                                <option value="red">Red</option>
                                <option value="grey">Grey</option>
                              </select>
                            </div>
                          </div>

                          {/* remarks section  */}
                          <div class="col-span-full mt-10 ml-5">
                            <label
                              for="about"
                              class="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Other Remarks
                            </label>
                            <div class="mt-2">
                              <textarea
                                name="mobileotherRemarks"
                                rows="5"
                                required
                                value={mobileotherRemarks}
                                onChange={(e) =>
                                  setMobileotherRemarks(e.target.value)
                                }
                                class=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              ></textarea>
                            </div>
                          </div>
                          {/* datepicker  */}
                          <div
                            class="relative ml-5 h-[35px] mt-20 "
                            data-te-datepicker-init
                            data-te-input-wrapper-init
                          >
                            <input
                              type="text"
                              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                              placeholder="Select a date"
                            />
                            <label
                              for="floatingInput"
                              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >
                              Select a date
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedOptions.includes("grc") && (
                    <>
                      <div className="col-span-full mt-12">
                        <label
                          for="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          For Grc
                        </label>
                        <div className="mt-2 flex flex-col rounded-lg border border-dashed border-gray-900/25 p-4">
                          <div className="sm:col-span-4 mb-10 w-[240px]">
                            <label
                              for="username"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Type
                            </label>
                            <div className="mt-2">
                              <select
                                className=" pt-2  "
                                data-te-select-init
                                multiple
                                id="select3"
                                // onChange={(e) =>
                                //   handleOptionSelect(e)
                                // }
                              >
                                <option value="black">Black</option>
                                <option value="red">Red</option>
                                <option value="grey">Grey</option>
                              </select>
                            </div>
                          </div>
                          {/* datepicker  */}
                          <div
                            class="relative w-[240px]  h-[35px]  "
                            data-te-datepicker-init
                            data-te-input-wrapper-init
                          >
                            <input
                              type="text"
                              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                              placeholder="Select a date"
                            />
                            <label
                              for="floatingInput"
                              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >
                              Select a date
                            </label>
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
                                required
                                name="grcotherRemarks"
                                rows="3"
                                value={grcotherRemarks}
                                onChange={(e) =>
                                  setGrcotherRemarks(e.target.value)
                                }
                                class=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <input name="createdBy" value={createdBY} hidden></input>
                  <div className="flex w-full">
                    <div className="w-11/12  mt-4 flex items-center justify-end gap-x-6">
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
                  </div>
                </div>
                <div className=" text-green-600 ">{message}</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
