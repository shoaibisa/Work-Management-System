/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { alluser } from "../../actions/employeeAction";
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast"; // Import react-hot-toast

const RequestedProject = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [employeeData, setEmployeeData] = useState({});
  const [managerAssignedProject, setManagerAssignedProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Replace the URL with your API endpoint
        const apiUrl = "http://localhost:5000/user/getManagerById";

        const response = await fetch(apiUrl, {
          method: "POST", // or "GET", "PUT", etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            id: userData.id,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setEmployeeData(result.employee);
          setManagerAssignedProject(
            result.employee.managerAssignedProject || []
          );
        } else {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(employeeData);
  console.log(managerAssignedProject);
  const clientRequests = data.employee || [];
  const clientData = [];

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer ">
          <Navbar />
          <div className="font-bold text-2xl ml-10 mt-6">
            {employeeData?.name} Projects
          </div>
          <div className="flex w-fit px-5 m-10 items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            {clientRequests ? (
              <ol
                role="list"
                className="divide-y list-decimal list-inside
             divide-gray-100"
              >
                {managerAssignedProject.map((person) => (
                  <li
                    key={person._id}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold w-48 leading-6 text-gray-900">
                          {person.name}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${
                              person.assigned === false
                                ? "bg-orange-500"
                                : "bg-emerald-500"
                            } `}
                          />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          {person.assigned === false
                            ? `Unassigned`
                            : "Assigned"}
                        </p>
                      </div>
                    </div>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-2 rounded inline-flex items-center">
                      <svg
                        className="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      <span>Download</span>
                    </button>
                    <Link
                      to={`/createproject/${employeeData._id}/${person?._id}`}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-2 rounded inline-flex items-center"
                    >
                      Create Project
                    </Link>
                  </li>
                ))}
              </ol>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedProject;
