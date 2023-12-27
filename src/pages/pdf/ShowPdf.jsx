import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../middleware/connect";
import { useParams } from "react-router-dom";

function ShowPdf() {
  const [pdfData, setPdfData] = useState(null);
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const managerData = JSON.parse(localStorage.getItem("employeeInfo"));
  var token = "";
  if (userData) {
    token = userData.token;
  } else if (managerData) {
    token = managerData.token;
  }

  useEffect(() => {
    // Replace 'yourAuthToken' with your actual authentication token

    axios
      .get(baseUrl + "/project/downloadReportById/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Indicate that the response is binary data
      })
      .then((response) => {
        setPdfData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {pdfData ? (
        <object
          data={URL.createObjectURL(pdfData)}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          PDF viewer not available in this browser.
        </object>
      ) : (
        <div>Loading PDF...</div>
      )}
    </div>
  );
}

export default ShowPdf;
