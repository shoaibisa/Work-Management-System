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
      console.log("File in FormData:", formData.get("projectFile"));
      const userData = JSON.parse(localStorage.getItem("employeeInfo"));
      const token = userData?.token;
      const resp = await fetch(
        "http://localhost:5000/project/uploadexceltemplate",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // Assuming the server responds with JSON
      const data = await resp.json();

      console.log(data);
      if (!resp.ok) {
        toast.error("Something went erong..");
      }
      toast.success("File uploaded successfully");
    } catch (error) {
      // Handle errors
      toast.error("Error uploading file", { id: toastId });
      console.error("Error uploading file", error);
    }
    toast.dismiss(toastId);
  };

  // const downloadHandler = async () => {
  //   const toastId = toast.loading("Loading..");

  //   try {
  //     const userData = JSON.parse(localStorage.getItem("employeeInfo"));

  //     if (!userData || !userData.token) {
  //       toast.error("Invalid user data or token");
  //       return;
  //     }

  //     const resp = await fetch(
  //       "http://localhost:5000/project/downloadexceltemplate",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + userData.token,
  //         },
  //       }
  //     );

  //     if (!resp.ok) {
  //       toast.error("Something went wrong..");
  //       return;
  //     }

  //     // Assuming the response contains the file data
  //     const blob = await resp.blob();

  //     // Create a Blob URL and trigger the download
  //     const blobUrl = window.URL.createObjectURL(blob);
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = blobUrl;
  //     downloadLink.download = "downloaded-file.xlsx";
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();

  //     // Clean up
  //     document.body.removeChild(downloadLink);
  //     window.URL.revokeObjectURL(blobUrl);

  //     toast.success("File downloaded successfully");
  //   } catch (error) {
  //     // Handle errors
  //     toast.error("Error downloading file", { id: toastId });
  //     console.error("Error downloading file", error);
  //   } finally {
  //     toast.dismiss(toastId);
  //   }
  // };
  const downloadHandler = async () => {
    const toastId = toast.loading("Loading..");
  
    try {
      const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  
      if (!userData || !userData.token) {
        toast.error("Invalid user data or token");
        return;
      }
  
      const resp = await fetch("http://localhost:5000/project/downloadexceltemplate", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      });
  
      if (!resp.ok) {
        toast.error("Something went wrong..");
        return;
      }
  
      // Assuming the response contains the file data
      const blob = await resp.blob();
  
      // Create a Blob URL and trigger the download
      const blobUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = "downloaded-file.xlsx";
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl);
  
      toast.success("File downloaded successfully");
    } catch (error) {
      // Handle errors
      toast.error("Error downloading file", { id: toastId });
      console.error("Error downloading file", error);
    } finally {
      toast.dismiss(toastId);
    };
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
                <p className="font-bold text-xl">Upload template</p>{" "}
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
              <form onSubmit={downloadHandler} action="">
                <p className="font-bold text-xl">Download template</p>{" "}
                <button
                  type="submit"
                  className="flex justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
                >
                  Download
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
