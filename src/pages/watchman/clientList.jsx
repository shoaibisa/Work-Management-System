import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listClients } from "../../actions/clientAction";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

function ViewClientList() {
  const dispatch = useDispatch();
  const clientsList = useSelector((state) => state.clientsList);
  const { loading, error, clients } = clientsList;
  console.log(clients);
  useEffect(() => {
    dispatch(listClients());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          <div className="m-10 flex gap-4  flex-col   rounded-lg border border-dashed border-gray-900/25 p-6">
            <>
              <div className="container my-15 mx-auto md:px-6">
                <section className="mb-20 text-center">
                  <h2 className="mb-12 text-3xl font-bold">
                    <u className="text-primary dark:text-primary-400">Client</u>
                  </h2>
                  <div className="lg:gap-xl-12 grid gap-x-6 md:grid-cols-3 xl:grid-cols-4">
                    {loading ? (
                      // Show loading indicator or message
                      <p>Loading...</p>
                    ) : error ? (
                      // Handle error
                      <p>Error: {error.message}</p>
                    ) : clients.clients && clients.clients.length > 0 ? (
                      // Map and render clients if the array is not empty
                      clients &&
                      clients.clients.map((client, index) => (
                        <Link to={`/wmclient/${client._id}`}>
                          <div className="mb-12" key={index}>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.jpg"
                              className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20"
                              alt=""
                              style={{ maxWidth: 100 }}
                            />
                            <p className="mb-2 font-bold">{client.name}</p>
                            <p className="text-neutral-500 dark:text-neutral-300">
                              {client.email}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      // Handle the case where clients is empty
                      <p>No clients available.</p>
                    )}
                  </div>
                </section>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewClientList;
