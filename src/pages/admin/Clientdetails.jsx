/* eslint-disable jsx-a11y/no-redundant-roles */
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
import toast from "react-hot-toast"; // Import react-hot-toast

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Clientdetails = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const userlist = useSelector((state) => state.userlist);
  const { user } = userlist;

  const [clientData, setClientData] = useState(null);
  const [managers, setManagers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(alluser());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchClientById(clientId);
      } catch (error) {
        setError(error.message);
        toast.error("Error fetching client data"); // Use toast for error notification
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  useEffect(() => {
    if (user && user.employees) {
      const people = user.employees;
      let m = people.filter((a) => a.role === "Project Manager");
      setManagers(m);
      let x = people.find((x) => x._id === clientId);
      setClientData(x);
    }
  }, [user, clientId]);

  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  const fetchClientById = async (clientId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/getclientbyid/${clientId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        const clientData = await response.json();
        setClientData(clientData);
        return;
      } else {
        throw new Error(
          `Failed to fetch client data. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching client data:", error.message);
      toast.error("Error fetching client data"); // Use toast for error notification
      throw error;
    }
  };
  const clientRequests = clientData?.data?.clientRequests || [];
  const handleAssignManager = async (managerId, fileId) => {
    // const toastId = toast.loading("Loading...");
    // console.log(clientRequests);
    const alreadyAssigned = clientRequests.find(
      (person) => person._id === fileId && person.assigned === true
    );

    if (alreadyAssigned) {
      toast.error("Project is already assigned to a manager");
      return;
    }
    // Display a confirmation dialog before proceeding
    const confirmAssign = window.confirm(
      "Do you want to assign this project to the selected manager?"
    );

    if (!confirmAssign) {
      // User clicked "Cancel" in the confirmation dialog
      return;
    }

    try {
      // let toastid = toast.loading("Loading..");

      const response = await fetch(
        `http://localhost:5000/project/assignedmanager`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            mid: managerId,
            rid: fileId,
          }),
        }
      );

      if (response.ok) {
        toast.success("Project manager assigned successfully");
        setClientData((prevClientData) => {
          const updatedClients = prevClientData.map((client) => {
            const updatedExcelFile = client.excelFile.map((file) => {
              if (file._id === fileId) {
                return { ...file, assigned: true };
              }
              return file;
            });
            return { ...client, excelFile: updatedExcelFile };
          });
          return updatedClients;
        });
        // Reload the page after a successful assignment
        window.location.reload();
      } else {
        toast.error("Error assigning project manager");
      }
      // toast.dismiss(toastid);
    } catch (error) {
      toast.error("Error assigning project manager");
    }

    window.location.reload();
    // toast.dismiss(toastId);
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
          <div className="flex w-fit px-5 mx-10 my-10 items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            {clientRequests ? (
              <ol
                role="list"
                className="divide-y list-decimal list-inside
             divide-gray-100"
              >
                {clientRequests.map((person) => (
                  <li
                    key={clientData._id}
                    className="flex justify-evenly gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold  w-48 leading-6 text-gray-900">
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
                    <div className=" flex flex-col ">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button
                            // disabled={person.assigned} // Disable the button if already assigned
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
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
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientdetails;
