import { readFile, write } from "xlsx";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data.xlsx");

function DownloadButton() {
  const downloadExcel = () => {
    console.log("dfgdfg");
    // Load the Excel file
    // const workbook = XLSX.readFile("data1.xlsx");
    const workbook = readFile(filePath);

    // Convert the workbook to a Blob (binary data)
    const blob = XLSX.write(workbook, { bookType: "blob", type: "blob" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a hidden link to trigger the download
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "downloaded.xlsx";

    // Trigger the click event on the link
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={downloadExcel}>Download Excel</button>
    </div>
  );
}

export default DownloadButton;
