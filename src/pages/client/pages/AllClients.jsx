import React, { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
// import { useSelect } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { alluser } from "../../../actions/employeeAction";

const AllClients = () => {
  const dispatch = useDispatch();
  const userlist = useSelector((state) => state.userlist);
  const { loading, error, user } = userlist;
  useEffect(() => {
    dispatch(alluser());
  }, [dispatch]);

  const people = user.employees || [];
  // console.log("maal - ", people);
  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer ">
          <Navbar />
          <div className=" text-2xl text-secondary-700 mt-10 ml-20 ">
            All Clients
          </div>
          <div className="  flex justify-center mt-10 ">
            <ul
              role="list"
              className=" border border-dashed rounded-md -py-20  w-[40rem]"
            >
              {people.map((person) => (
                <li
                  key={person.email}
                  className="flex justify-between gap-x-6 py-5"
                >
                  {person.role === "Client" && (
                    <a
                      className=" w-[100%] "
                      href={`/clientprojects/${person?._id}`}
                    >
                      {" "}
                      <div className=" flex px-4  flex-col border-b border-dotted  justify-around w-[100%] hover:cursor-pointer  hover:bg-slate-100 ">
                        {" "}
                        <div className=" flex w-[100%] justify-between ">
                          {" "}
                          <div className="flex min-w-0 gap-x-4  ">
                            <img
                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                              alt=""
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {person.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.email}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {person.role}
                            </p>
                            {person.lastSeen ? (
                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                Last seen{" "}
                                <time dateTime={person.lastSeenDateTime}>
                                  {person.lastSeen}
                                </time>
                              </p>
                            ) : (
                              <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">
                                  Online
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* list of files  */}
                        {/* <div>
                          <h2 class="mb-2 text-lg mt-4 font-semibold text-gray-900 dark:text-white">
                            Files List:
                          </h2>
                          <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                            {person?.excelFile.map((file) => (
                              <div>
                                <li class=" flex justify-between px-4 ">
                                  <div className="flex items-center">
                                    {" "}
                                    <svg
                                      class={`w-3.5 h-3.5 me-2 ${
                                        file?.status == "unassigned"
                                          ? "text-orange-400"
                                          : "text-green-500"
                                      }  flex-shrink-0`}
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    {file?.filename}
                                  </div>
                                  <div>{file?.status}</div>
                                </li>
                              </div>
                            ))}
                          </ul>
                        </div> */}
                      </div>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClients;
