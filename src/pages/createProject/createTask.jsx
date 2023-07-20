import "./createProject.scss";
import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Forweb from "../../components/forweb/Forweb";
import Forapi from "../../components/forapi/Forapi";
import Fornetwork from "../../components/fornetwork/Fornetwork";
import Formobile from "../../components/formobile/Formobile";
import Forgrc from "../../components/forgrc/Forgrc";
import { Select, initTE } from "tw-elements";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createTask } from "../../actions/projectlistAction";
const CreateTask = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [webData, setWebData] = useState({
    webtargetUrls: [{ lable: "", link: "" }],
    webotherRemarks: "",
  });

  const [apiData, setApiData] = useState({
    apifile: "",
    apiotherRemarks: "",
  });

  const [networkData, setNetworkData] = useState({
    networkfile: "",
    networkotherRemarks: "",
  });
  const [mobileData, setMobileData] = useState({
    mobiletargetUrls: [{ lable: "", link: "" }],
    mobileotherRemarks: "",
  });
  const [grcData, setGRCData] = useState({
    grcotherRemarks: "",
  });

  console.log(apiData);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const createdBY = userData?.id;

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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTask(
        selectedOptions,
        //createdBY
        webData,
        apiData,
        networkData,
        mobileData,
        grcData
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
        <h1 className="m-6  text-gray-900"> Create Task</h1>
        <form
          onSubmit={submitHandler}
          className=" w-4/4 ml-20 mt-10 create_Project "
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
                      Project Name : Birla (Id:68585)
                    </label>
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
