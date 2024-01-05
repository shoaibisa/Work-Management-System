/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { alluser } from "../../actions/employeeAction";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Clientdetails = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const userlist = useSelector((state) => state.userlist);
  const { loading, error, user } = userlist;
  const [clientData, setClientData] = useState(null);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    dispatch(alluser());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.employees) {
      const people = user.employees;
      let m = people.filter((a) => a.role === "Project Manager");
      setManagers(m);
      let x = people.find((x) => x._id === clientId);
      setClientData(x);
    }
  }, [user, clientId]);

  const handleAssignManager = async (managerId, fileId) => {
    try {
      const formData = new FormData();
      formData.append("managerId", managerId);
      formData.append("fileId", fileId);
      const userData = JSON.parse(localStorage.getItem("employeeInfo"));
      const token = userData?.token;

      for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
      }
      const response = await fetch(
        `http://localhost:5000/project/getcreatprojectforrp/${fileId}/${managerId}`,
        {
          method: "GET",
          //  body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response);

      if (response.ok) {
        toast.success("Project man ager assigned successfully");
        // Update status from "unassigned" to "assigned"
        setClientData((prevClientData) => {
          const updatedExcelFile = prevClientData.excelFile.map((person) => {
            if (person._id === fileId) {
              return { ...person, status: "assigned" };
            }
            return person;
          });
          return { ...prevClientData, excelFile: updatedExcelFile };
        });
      } else {
        toast.error("Error assigning project manager1");
      }
    } catch (error) {
      toast.error("Error assigning project manager");
    }
  };

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer ">
          <Navbar />
          <div className="font-bold text-2xl ml-10 mt-6">
            {clientData?.name} Projects
          </div>
          <div className="flex w-fit px-5 mx-10 mt-10 items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            <ol
              role="list"
              className="divide-y list-decimal list-inside
             divide-gray-100"
            >
              {clientData?.excelFile.map((person) => (
                <li
                  key={clientData._id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {person.filename}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            person.status === "unassigned"
                              ? "bg-orange-500"
                              : "bg-emerald-500"
                          } `}
                        />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">
                        {person.status}
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
                  <div className=" flex flex-col ">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Assign to manager
                          <ChevronDownIcon
                            className="-mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {managers.map((m) => (
                              <Menu.Item key={m._id}>
                                {({ active }) => (
                                  <a
                                    onClick={() =>
                                      handleAssignManager(m._id, person._id)
                                    }
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {m?.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientdetails;
