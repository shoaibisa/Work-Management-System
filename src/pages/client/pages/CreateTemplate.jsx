import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import toast from "react-hot-toast";

const CreateTemplate = () => {
  const [file, setFile] = useState(null);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setFile(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!file) {
      // Handle the case where no file is selected
      toast.error("Plese select a file..");
      return;
    }

    const toastId = toast.loading("Loading..");

    try {
      const formData = new FormData();
      formData.append("projectFile", file);
      console.log("File in FormData:", formData.get("uploadExcelTemplate"));

      const res = await fetch(
        "http://localhost:5000/project/uploadexceltemplate",
        {
          method: "POST",
          body: formData,
        }
      );

      // Assuming the server responds with JSON
      const data = await res.json();

      // console.log(res);
      if (!res.ok) {
        toast.error("Something went erong..");
      }

      // Handle the response, update UI, etc.

      // Close the loading toast
      // toast.success("File uploaded successfully", { id: toastId });
    } catch (error) {
      // Handle errors
      toast.error("Error uploading file", { id: toastId });
      console.error("Error uploading file", error);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          <div className="font-bold text-2xl ml-10 mt-6">Excel Template</div>
          <div className="m-10 flex items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            <div className="m-10 flex items-center justify-center flex-col flex-wrap rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
              <form onSubmit={submitHandler} action="">
                <p className="font-bold text-xl">Download template</p>{" "}
                <input
                  class="relative mt-4 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  accept=".xlsx, .xls, .xlsm, .xlsb, .xltx, .xltm"
                  onChange={handleFileInputChange}
                  name="excelfile"
                  id="excelfile"
                />
                <button
                  type="submit"
                  className="flex justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
                >
                  Upload
                </button>
              </form>
            </div>{" "}
            <div className="m-10 flex items-center justify-center flex-col flex-wrap rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
              <p className="font-bold text-xl">Download template</p>{" "}
              <button
                type="submit"
                className="flex justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
