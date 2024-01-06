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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { listClients } from "../../actions/clientAction";

const Createproject = () => {
  const { mid, rid } = useParams();
  console.log(mid, rid);
  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientName, setclientName] = useState("");
  const [clientEmail, setclientEmail] = useState("");
  const [selectedId, setselectedId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [projectPriority, setProjectPriority] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/projectlist";

  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const manager = userData?.id;

  const projectCreated = useSelector((state) => state.projectCreated);
  const { loading, error, project } = projectCreated;

  const clientsList = useSelector((state) => state.clientsList);
  const { clients } = clientsList;
  useEffect(() => {
    dispatch(listClients());
    if (project) {
      if (!project.isError) {
        // Navigate(redirect);
      } else {
        setMessage(project.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    initTE({ Select });
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
  const [projectData, setProjectData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);

        const apiUrl = `http://localhost:5000/project/getcreatprojectforrp/${rid}/${mid}`;

        const userData = JSON.parse(localStorage.getItem("employeeInfo"));
        const token = userData?.token;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setProjectData(result.projects);
        } else {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
      } catch (error) {
        // setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(projectData);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createProject(
        projectName,
        companyName,
        clientName,
        clientEmail, // Use selectedEmail here
        selectedId, // Use selectedId here
        manager,
        submissionDate,
        projectPriority
      )
    );

    setMessage("Successfully Project Created");
    window.history.back();
  };

  useEffect(() => {
    initTE({ Select });
  }, []);

  console.log(clientEmail, selectedId);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1 className="m-6  text-gray-900"> Create Project</h1>
        <form
          onSubmit={submitHandler}
          className=" w-4/4 ml-20 mt-10 create_Project "
        >
          <div className="space-y-18">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="text-base font-semibold leading-7 text-gray-900">
                <div className="flex w-full">
                  {/* 0 */}
                  <div className="sm:col-span-4 w-1/2 mr-10 mb-10">
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
                          name="webcompanyName"
                          autoComplete="username"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter Project name"
                          required="true"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* 1 */}
                  <div className="sm:col-span-4 w-1/2 mr-10 mb-10">
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
                          required="true"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full">
                  {/* 2 */}
                  <div className="sm:col-span-4 w-1/2 mr-10 mb-10">
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
                          required="true"
                          value={clientName}
                          onChange={(e) => setclientName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* 3 */}
                  <div className="sm:col-span-4 w-1/2 mr-10 mb-10">
                    <label
                      for="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Client email
                    </label>
                    <div className="mt-2">
                      <select
                        data-te-select-init
                        data-te-select-filter="true"
                        value={clientEmail}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          const [selectedId, selectedEmail] =
                            selectedValue.split("-");
                          setclientEmail(selectedEmail);

                          setselectedId(selectedId);
                        }}
                      >
                        <option value="" disabled>
                          Select an employee
                        </option>
                        {clients.clients &&
                          clients.clients.map((employee) => (
                            <option
                              key={employee._id}
                              value={`${employee._id}-${employee.email}`}
                            >
                              {employee.email} - {employee.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex w-full">
                  <div className=" sm:col-span-4 w-1/2 mr-10  mt-6  mb-6 flex">
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

                  <div className="  sm:col-span-4 w-1/2 mr-10   mb-4">
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
                        required="true"
                        className=" country block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
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
                </div>
                <input name="createdBy" value={manager} hidden></input>
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

                <div className=" text-green-600 ">{message}</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createproject;
