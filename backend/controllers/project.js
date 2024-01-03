import { validationResult } from "express-validator";
import Project from "../models/project.js";
import Task from "../models/task.js";
import SubmitProject from "../models/report.js";
import Report from "../models/report.js";
import fs from "fs";
import Employee from "../models/employee.js";
import axios from "axios";
import Notification from "../models/notification.js";
import pdfkit from "pdfkit";
import path from "path";
import QuickChart from "quickchart-js";
import request from "request";
import { fileURLToPath } from "url";
import { dirname } from "path";

import sharp from "sharp";

const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const imagePath = path.join(
  dirname(currentModulePath),
  "..",
  "image",
  "logo.png"
);

// const imagePath = path.join(__dirname, "..", "image", "logo.png");
const hearder = path.join(
  dirname(currentModulePath),
  "..",
  "image",
  "header.jpg"
);
const testingMethodology = path.join(
  dirname(currentModulePath),
  "..",
  "image",
  "testingMethodology.png"
);
const abc = path.join(dirname(currentModulePath), "..", "image", "abc.png");
const table = path.join(dirname(currentModulePath), "..", "image", "table.png");

const chartimagePaths = path.join(
  dirname(currentModulePath),
  "..",
  "Charts",
  "chart.png"
);
const chartimagePaths2 = path.join(
  dirname(currentModulePath),
  "..",
  "Charts",
  "chart2.png"
);
const tool = path.join(dirname(currentModulePath), "..", "image", "tool.png");
const table2 = path.join(
  dirname(currentModulePath),
  "..",
  "image",
  "chartectertable.png"
);
const chartt = (data) => {
  const chart = new QuickChart();
  // Add Dynamic Chart
  chart
    .setConfig({
      type: "bar",
      data: {
        labels: ["Critical", "High", "Medium", "low"],
        datasets: [
          {
            label: "vulnerabilities",
            data: data,
            backgroundColor: ["#660000", "red", "#f4ca16", "#9BBA59"],
          },
        ],
      },
    })
    .setWidth(600)
    .setHeight(400);

  // Generate the chart URL
  const chartUrl = chart.getUrl();
  // Define the folder where you want to save the image
  const folderPath = path.join(
    dirname(currentModulePath),
    "..",

    "Charts"
  ); // Change 'images' to your desired folder name

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const chartimagePaths = path.join(folderPath, "chart.png"); // Full path to the image

  // Download the chart image;
  request.get(chartUrl, { encoding: "binary" }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Save the chart image to the specified folder
      fs.writeFileSync(chartimagePaths, body, "binary");
    }
  });
};
const chart2 = (data) => {
  const chart = new QuickChart();
  // Add Dynamic Chart
  chart
    .setConfig({
      type: "pie",
      data: {
        labels: ["Critical", "High", "Medium", "low"],
        datasets: [
          {
            label: "vulnerabilities",
            data: data,
            backgroundColor: ["#660000", "red", "#f4ca16", "#9BBA59"],
          },
        ],
      },
    })
    .setWidth(600)
    .setHeight(400);

  // Generate the chart URL
  const chartUrl = chart.getUrl();
  // Define the folder where you want to save the image
  const folderPath = path.join(
    dirname(currentModulePath),
    "..",

    "Charts"
  ); // Change 'ihttps://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dan56sZeQHJU&hl=en&ec=65620mages' to your desired folder name

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const chartimagePaths = path.join(folderPath, "chart2.png"); // Full path to the image

  // Download the chart image;
  request.get(chartUrl, { encoding: "binary" }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Save the chart image to the specified folder
      fs.writeFileSync(chartimagePaths, body, "binary");
    }
  });
};

const pdfview = (req, res) => {
  chartt();
  chart2();

  const doc = new pdfkit();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="dynamic.pdf"');

  doc.pipe(res);
  // from here

  const delay = 2000; // 1 second
  setTimeout(function () {
    doc.image(imagePath, {
      x: 50, // Adjust the X position as needed
      y: 30, // Adjust the Y position as needed
      width: 500, // Adjust the width as needed
    });
    // Add some content to the body of the PDF
    const topMargin = 200;
    doc.y = topMargin;
    doc.x = 50;
    // Add the "Security Assessment" text
    doc.fontSize(24).text("Security Assessment", 50, doc.y);

    // Reduce the space between lines
    doc.moveDown(0.5); // Adjust the value as needed

    // Add "FOR" text
    doc.fontSize(16).text("REPORT FOR", doc.x, doc.y);

    // Reduce the space between lines
    doc.moveDown(1); // Adjust the value as needed

    // Add "Host company Name" text
    doc.fontSize(16).text("Host company Name", doc.x, doc.y);

    // Reduce the space between lines
    doc.moveDown(0.5); // Adjust the value as needed

    // Add the "December 26th, 2022" text
    doc.fontSize(16).text("December 26th, 2022", doc.x, doc.y);

    doc.moveDown(2); // Adjust the value as needed for spacing

    // Add the left-aligned text
    doc.fontSize(12).text("Report Prepared by:", doc.x, doc.y);
    doc.fontSize(10).text("AUDITOR NAME Auditor Post", doc.x, doc.y);
    doc.fontSize(10).text("auditor.email@gisconsulting.org", doc.x, doc.y);
    doc.fontSize(10).text("(A CERT-IN Empaneled Company)", doc.x, doc.y);
    doc
      .fontSize(10)
      .text("(Empanelment no.: 3(15)/2004-CERT-In)", doc.x, doc.y);
    doc.fontSize(10).text("info@gisconsulting.in", doc.x, doc.y);

    doc.x = 350; // Adjust the X position for the right-aligned text

    // Add the right-aligned text
    doc.fontSize(12).text("Report reviewed by:", 350, 360);
    doc.fontSize(10).text("NAVEEN DHAM Principal Consultant", doc.x, doc.y);
    doc.fontSize(10).text("Principal Consultant", doc.x, doc.y);
    doc
      .fontSize(10)
      .text(
        "CISA certified MSc. Cyber Forensics & Information Security",
        doc.x,
        doc.y
      );
    doc.fontSize(10).text("naveen.dham@gisconsulting.in", doc.x, doc.y);

    doc.moveDown(2);
    const noteText =
      "NOTE: The information contained within this report is considered proprietary and confidential to the {GIS Consulting}. Inappropriate and unauthorized disclosure of this report or portions of it could result in significant damage or loss to the {Host company Name}. This report should be distributed to individuals on a Need-to-Know basis only. Paper copies should be locked up when not in use. Electronic copies should be stored offline and protected appropriately.";

    doc.fontSize(12).text(noteText, 50, 500, { width: 550 });

    doc.moveDown(2); // Adjust the value as needed for spacing

    const corporateOfficeText =
      "CORPORATE OFFICE \n Level 2, Augusta Point, Parsvnath Exotica, Sector 73, Golf Course, Gurgoan-122002\n" +
      "CIN No. U72200DL2017PTC323914\n" +
      "\n" +
      "Toll-free: 1800 212 676767\n" +
      "Web : www.gisconsulting.in\n" +
      "Email:-info@gisconsulting.in";

    doc
      .fontSize(14)
      .text(corporateOfficeText.split("\n")[0], 50, 610, { width: 250 });

    // Set a different font size for the rest of the text
    doc.fontSize(10).text(corporateOfficeText.split("\n").slice(1).join("\n"), {
      width: 250,
    });

    // Add the United States office information to the right
    doc.fontSize(12).text("UNITED STATES OFFICE ", 400, 620, { width: 300 });
    doc.fontSize(10).text("13731 Monarch Vista Dr ", doc.x, doc.y);
    doc.fontSize(10).text("Germantown MD 20874", doc.x, doc.y);
    doc.moveDown(1.6);
    doc.fontSize(10).text("CALL US :- +12407202889", doc.x, doc.y);
    doc.fontSize(10).text("Web : www.gisconsulting.org", doc.x, doc.y);
    doc.fontSize(10).text("Email:-info@gisconsulting.org", doc.x, doc.y);

    // Add a new page
    doc.addPage();

    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });
    // Draw the header text
    // Define your header text
    const headerText = "1. Document Control";

    // Set font size for the header
    const headerFontSize = 16;

    doc.fontSize(headerFontSize).text(headerText, { align: "left" }, 60, 60);

    const tableData = [
      [
        "    Document Type",
        "    Web Application Penetration Testing Report for{ Host Name}",
      ],
      ["    Document Owner", "    G-INFO TECHNOLOGY SOLUTIONS PVT. LTD."],
    ];

    // Set font size and cell sizes
    const fontSize = 12;
    const firstColumnWidth = 150; // Width for the first column
    const secondColumnWidth = 350; // Width for the second column
    const cellHeight = 30;

    // Set initial position and spacing
    let x = 50; // X position
    let y = 70; // Y position

    // Background color for the first column
    const firstColumnFillColor = [204, 236, 255];
    // Loop through the data and draw the table with borders
    // Move to the next line for the table
    y += headerFontSize + 30;
    for (let i = 0; i < tableData.length; i++) {
      for (let j = 0; j < tableData[i].length; j++) {
        const cellWidth = j === 0 ? firstColumnWidth : secondColumnWidth; // Adjust width based on the column

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeight).stroke();
        // Fill background color in the first column
        if (j === 0) {
          doc
            .rect(x, y, firstColumnWidth, cellHeight)
            .fill(firstColumnFillColor);
        }
        // Set text color to black for the first column
        doc.fillColor("black");

        // Draw text in the cell
        doc
          .fontSize(fontSize)
          .text(
            tableData[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            "center"
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeight; // Move to the next row
    }

    const tableData2 = [
      [
        "    Authors & Auditors",
        "                                       Mail ID",
      ],
      ["    Auditor Name", "            Auditor.email@gisconsulting.org "],

      ["    GISC InfoSec Team", "            GISC InfoSec Team"],
    ];

    // Set font size and cell sizes
    // const fontSize = 12;
    const firstColumnWidthtabl2 = 150; // Width for the first column
    const secondColumnWidthtable2 = 350; // Width for the second column
    const cellHeighttable2 = 30;

    // Set initial position and spacing
    x = 50; // X position
    y = y + cellHeight; // Y position

    for (let i = 0; i < tableData2.length; i++) {
      for (let j = 0; j < tableData2[i].length; j++) {
        const cellWidth =
          j === 0 ? firstColumnWidthtabl2 : secondColumnWidthtable2; // Adjust width based on the column

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable2).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc
            .rect(x, y, cellWidth, cellHeighttable2)
            .fill(firstColumnFillColor);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData2[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable2; // Move to the next row
    }

    // Third Table in

    const tableData3 = [
      [
        "    Reviewed and Verified by",
        "                                       Mail ID",
      ],
      ["   Naveen Dham", "            Naveen Dham "],
    ];

    // Set font size and cell sizes
    // const fontSize = 12;
    const firstColumnWidthtabl3 = 160; // Width for the first column
    const secondColumnWidthtable3 = 350; // Width for the second column
    const cellHeighttable3 = 30;

    // Set initial position and spacing
    x = 50; // X position
    y = y + cellHeight; // Y position

    for (let i = 0; i < tableData3.length; i++) {
      for (let j = 0; j < tableData3[i].length; j++) {
        const cellWidth =
          j === 0 ? firstColumnWidthtabl3 : secondColumnWidthtable3; // Adjust width based on the column

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable3).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc
            .rect(x, y, cellWidth, cellHeighttable3)
            .fill(firstColumnFillColor);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData3[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable3; // Move to the next row
    }

    //Table no 4
    const tableData4 = [
      ["Version", "Date", "Description"],
      [
        "1.0",
        " 26-12-2022",
        "Web Application Penetration Testing Report for Host Name",
      ],
    ];

    // Set font size and cell sizes
    const firstColumnWidthtabl4 = 60; // Width for the first column
    const secondColumnWidthtable4 = 100;
    const thirdColumnWidthtable4 = 350; // Width for the second column
    const cellHeighttable4 = 30;
    const color = [204, 236, 255];
    // Set initial position and spacing
    x = 50; // X position
    y = y + cellHeight; // Y position

    for (let i = 0; i < tableData4.length; i++) {
      for (let j = 0; j < tableData4[i].length; j++) {
        // const cellWidth = === 0 ? firstColumnWidthtabl4 : secondColumnWidthtable4 : thirdColumnWidthtable4; // Adjust width based on the column
        let cellWidth;
        let fillColor;
        if (j === 0) {
          cellWidth = firstColumnWidthtabl4;
          fillColor = firstColumnFillColor;
        } else if (j === 1) {
          cellWidth = secondColumnWidthtable4;
          fillColor = color;
        } else {
          cellWidth = thirdColumnWidthtable4;
          fillColor = color;
        }
        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable4).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc
            .rect(x, y, cellWidth, cellHeighttable4)
            .fill(firstColumnFillColor);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData4[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable4; // Move to the next ro
    }

    //Table no 5
    const tableData5 = [
      ["Client", "Name", "Email ID"],
      ["Client Company Name", "client  name", " Email"],
    ];

    // Set font size and cell sizes
    const firstColumnWidthtabl5 = 100; // Width for the first column
    const secondColumnWidthtable5 = 100;
    const thirdColumnWidthtable5 = 300; // Width for the second column
    const cellHeighttable5 = 30;
    // Set initial position and spacing
    x = 50; // X position
    y = y + cellHeight; // Y position

    for (let i = 0; i < tableData5.length; i++) {
      for (let j = 0; j < tableData5[i].length; j++) {
        // const cellWidth = === 0 ? firstColumnWidthtabl4 : secondColumnWidthtable4 : thirdColumnWidthtable4; // Adjust width based on the column
        let cellWidth;
        let fillColor;
        if (j === 0) {
          cellWidth = firstColumnWidthtabl5;
          fillColor = firstColumnFillColor;
        } else if (j === 1) {
          cellWidth = secondColumnWidthtable5;
          fillColor = color;
        } else {
          cellWidth = thirdColumnWidthtable5;
          fillColor = color;
        }
        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable5).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc.rect(x, y, cellWidth, cellHeighttable5).fill(color);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData5[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable5; // Move to the next ro
    }
    y += cellHeighttable5 + 10; // Adjust the value as needed for spacing

    // Define the text for "Notice of Confidentiality"
    const confidentialityText =
      "This document contains proprietary and confidential information of G-Info Technology Solutions PVT LTD. The recipient agrees to maintain this information in confidence and not to reproduce or to disclose this information to any person outside of the group directly responsible for the evaluation of its contents. There is no obligation to maintain the confidentiality of any information which was known to the recipient prior to the receipt of this document from G-Info Technology or which becomes publicly known through no fault of the recipient or is received without obligation of confidentiality from a third party owing to no obligation of confidentiality to G-Info Technology Solutions PVT LTD.";

    // Set the font size for the "Notice of Confidentiality" title
    const titleFontSize = 16;

    // Set the font size for the rest of the text
    const textFontSize = 10;

    // Set the position for the "Notice of Confidentiality" title
    const titleX = 50; // X position
    const titleY = y; // Y position

    // Draw the title with increased font size
    doc
      .fontSize(titleFontSize)
      .text("Notice of Confidentiality:", titleX, titleY, {
        width: 500,
      });

    // Set the position for the rest of the text
    const textX = titleX; // X position
    const textY = titleY + titleFontSize + 10; // Y position

    // Draw the rest of the text with the regular font size
    doc.fontSize(textFontSize).text(confidentialityText, textX, textY, {
      width: 500,
    });

    // Add a new page for the table of contents
    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });
    // Define the table of contents text
    const tableOfContentsText =
      "Table of Contents\n\n" +
      "1. Document Control " +
      ".".repeat(60) +
      " 2\n\n" +
      "2. Introduction " +
      ".".repeat(60) +
      " 4\n\n" +
      "3. Web Application Platform Details" +
      ".".repeat(30) +
      " 4\n\n" +
      "     3.1. Scope of Web Penetration Testing " +
      ".".repeat(30) +
      " 4\n\n" +
      "             3.1.1. Target Website Details " +
      ".".repeat(30) +
      " 4\n\n" +
      "             3.1.2. Websites Platform Details " +
      ".".repeat(30) +
      " 4\n\n" +
      "4. Testing Methodology and Approach " +
      ".".repeat(30) +
      " 5\n\n" +
      "5. Web Apps Audit Test Standard followed " +
      ".".repeat(30) +
      " 7\n\n" +
      "6. Summary Report: " +
      ".".repeat(30) +
      " 9\n\n" +
      "6.1. Overall Summary of Findings " +
      ".".repeat(30) +
      " 9\n\n" +
      "6.2. Vulnerability Rating Definitions " +
      ".".repeat(30) +
      " 9\n\n" +
      "7. Web Application Security Audit Executive Summary Report: " +
      ".".repeat(30) +
      " 10\n\n" +
      "8. Application Security Observations based on OWASP Top 10: " +
      ".".repeat(10) +
      " 11\n\n" +
      "9. Details Reports, POCs & Recommendations: " +
      ".".repeat(30) +
      " 12\n\n" +
      "     9.1. “High Vulnerability Details” " +
      ".".repeat(30) +
      " 12\n\n" +
      "        9.1.2 Insecure Communication " +
      ".".repeat(30) +
      " 12\n\n" +
      "9. Tools Used during Assessment & Testing: " +
      ".".repeat(30) +
      " 13\n\n" +
      "10. Appendix: " +
      ".".repeat(30) +
      " 13\n\n" +
      "     11.1. CVSS 3 Rating definition " +
      ".".repeat(30) +
      " 13\n\n" +
      "     11.2. General guidelines " +
      ".".repeat(30) +
      " 14\n\n" +
      "12. G-Info Technology Solutions Contact: " +
      ".".repeat(30) +
      " 17\n\n";

    // Set the font size for the table of contents
    const tableOfContentsFontSize = 12;

    // Set the position for the table of contents
    const tableOfContentsX = 80; // X position
    const tableOfContentsY = 80; // Y position

    // Draw the table of contents
    doc
      .fontSize(tableOfContentsFontSize)
      .text(tableOfContentsText, tableOfContentsX, tableOfContentsY, {
        width: 500,
      });

    // 4 th page

    const textsize = 12;
    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });
    const color2 = [54, 95, 145];

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("2. Introduction", { align: "left" }, 60, 60);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "G-Info Technology Solutions Inc. has been contracted to conduct a Web Application Security Assessment test against <host_name>, UP Web Applications defined in the scope. The objective of this assessment was to assess the overall security posture of the application from a Black-box perspective. This includes determining the application’s ability to resist common attack patterns and identifying vulnerable areas in the internal or external interfaces that may be exploited by a malicious user.\n\n",
        80,
        90,
        {
          width: 500,
        }
      );

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("3. Web Application Platform Details", 60, 180, { align: "left" });
    // doc.moveDown(1);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "The scope of the assessment was limited to performing a Web Application Testing on the URL mentioned below:",
        80,
        200,
        {
          width: 500,
        }
      );
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("3.1. Scope of Web Penetration Details", 80, 250, {
        align: "left",
      });
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "The Vulnerability Assessment and Penetration Testing performed was focused on <host_name> websites, and its related Web Application",
        80,
        270,
        {
          width: 550,
        }
      );
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("3.1.1 Target Website Details", 80, 310, { align: "left" });

    //Table no 4
    const tableData7 = [
      [" Target Website URL’s ", " URL "],
      [" Test Type ", " Black/Gray Box "],
    ];

    // Set font size and cell sizes
    const firstColumnWidthtabl7 = 150; // Width for the first column
    const secondColumnWidthtable7 = 300;
    const thirdColumnWidthtable7 = 350; // Width for the second column
    const cellHeighttable7 = 30;

    // Set initial position and spacing
    x = 100; // X position
    y = 350; // Y position

    for (let i = 0; i < tableData7.length; i++) {
      for (let j = 0; j < tableData7[i].length; j++) {
        let cellWidth;
        let fillColor;
        if (j === 0) {
          cellWidth = firstColumnWidthtabl7;
          fillColor = firstColumnFillColor;
        } else if (j === 1) {
          cellWidth = secondColumnWidthtable7;
          fillColor = color;
        } else {
          cellWidth = thirdColumnWidthtable7;
          fillColor = color;
        }
        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable7).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc
            .rect(x, y, cellWidth, cellHeighttable7)
            .fill(firstColumnFillColor);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData7[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 100; // Reset the X position for the next row
      y += cellHeighttable7; // Move to the next ro
    }
    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("4. Testing Methodology and Approach", { align: "left" }, 60, 60);

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nG-Info Technology Solutions Security team was engaged to perform a manual security assessment against the target application. This assessment involved a deep automated scan using automated scanning tools to discover common vulnerabilities, as well as manual testing. Manual testing includes validation of all issue types covered under the automated scan as well as checks for problems not typically found by automated scanners such as authentication, authorization, and business logic flaws.\n\n\n",
        80,
        80,
        { width: 500 }
      );
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\n A Vulnerability Assessment is a method of evaluating the security of an application by simulating an attack. The process involves an active analysis of the application for any weaknesses, functional flaws, and vulnerabilities. Any security issues that are identified will be explained with an assessment of their impact, with a solution for their mitigation. The OWASP Web Application Methodology is based on the ‘gray box’ approach. The testing model consists of following phases:\n\n",
        80,
        170,
        { width: 500 }
      );

    doc.image(testingMethodology, {
      x: 70, // Adjust the X position as needed
      y: 270, // Adjust the Y position as needed
      width: 500, // Adjust the width as needed
      height: 200,
    });
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text(" Information Gathering", 60, 530, { align: "left" });
    doc.moveDown(1);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nGathering information is the first step where a hacker tries to get information about the target. Hackers use different sources and tools to get more information about the target.",
        60,
        550,
        { align: "left" }
      );

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text(" Threat Modeling:", 60, 600, { align: "left" });
    doc.moveDown(1);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nThreat modelling is a process by which potential threats, such as structural vulnerabilities or the absence of appropriate safeguards, can be identified, enumerated, and mitigations can be prioritized.",
        60,
        610,
        { align: "left" }
      );
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text(" Vulnerability Analysis", 60, 670, { align: "left" });
    doc.moveDown(1);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nA vulnerability assessment is an in-depth analysis of the building functions, systems, and site characteristics to identify building weaknesses and lack of redundancy, and determine mitigations or corrective actions that can be designed or implemented to reduce the vulnerabilities.",
        60,
        690,
        { align: "left" }
      );

    // Add the new text here
    doc.moveDown(1);
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("Exploitation:", 60, null, { align: "left" });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "In computer security, a vulnerability is a weakness which can be exploited by a threat actor, such as an attacker, to perform unauthorized actions within a computer system. To exploit a vulnerability, an attacker must have at least one applicable tool or technique that can connect to a system weakness.",
        60,
        null,
        { align: "left" }
      );

    doc.moveDown(1);
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("Post Exploitation:", 60, null, { align: "left" });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "As the term suggests, post exploitation basically means the phases of operation once a victim's system has been compromised by the attacker. The value of the compromised system is determined by the value of the actual data stored in it and how an attacker may make use of it for malicious purposes. The concept of post exploitation has risen from this fact only as to how you can use the victim's compromised system's information. This phase actually deals with collecting sensitive information, documenting it, and having an idea of the configuration settings, network interfaces, and other communication channels. These may be used to maintain persistent access to the system as per the attacker's needs.",
        60,
        null,
        { align: "left" }
      );

    doc.moveDown(1);
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("Reporting:", 60, null, { align: "left" });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "Preparation of report as per severity along with remedial recommendation. Evidence against claims and recommendation after successfully exploit all vulnerabilities we prepare detail report including Proof of concept and recommendations.",
        60,
        null,
        { align: "left" }
      );

    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("5.Web Apps Audit Test Standard followed:", 60, null, {
        align: "left",
      });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\n\nScanning tools used in the WAPT Test possess the capability to assess OWASP TOP 10 Risk as under: \n\n",
        60,
        null,
        { align: "left" }
      );
    const color3 = [74, 22, 71];
    doc
      .fontSize(14)
      .fillColor(color3)
      .text("OWASP Top 10 Risks (2021) Scanned in the Report", 60, null, {
        align: "left",
      });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\n\n Attackers can potentially use many different paths through the applications to do harm to your business or organization. Each of these paths represents a risk that may, or may not, be serious enough to warrant attention.",
        60,
        null,
        { align: "left" }
      );
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\n\nThe OWASP Top 10 list consists of the 10 most seen application vulnerabilities:",
        60,
        null,
        {
          align: "left",
          underline: true, // This property underlines the text
        }
      );

    const additionalText = `
      -> Broken Access Control
      -> Cryptographic Failures
      -> Injection
      -> Insecure Design
      -> Security Misconfiguration
      -> Vulnerable and Outdated Components
      -> Identification and Authentication Failures
      -> Software and Data Integrity Failures
      -> Security Logging and Monitoring Failures
      -> Server-Side Request Forgery (SSRF)\n\n\n
  `;

    doc
      .fontSize(textsize) // You can use the same font size as above
      .fillColor("black") // You can use the same text color as above
      .text(additionalText, 60, null, { align: "left" });

    doc.image(abc, {
      x: 70, // Adjust the X position as needed
      y: doc.y, // Adjust the Y position as needed
      width: 500, // Adjust the width as needed
    });

    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("6.Summary Report:\n\n", 60, null, {
        align: "left",
      });

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("6.1.Overall Summary of Findings", 80, null, {
        align: "left",
      });
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nThe table below provides summary of the vulnerabilities that were identified during the assessment. ",
        80,
        null,
        {
          align: "left",
        }
      );

    // Add a table behind the text
    // Define different background colors for each cell in the first row
    const backgroundColors = [
      [31, 73, 125],
      "red",
      "red",
      "yellow",
      [155, 187, 89],
    ];

    const tableData8 = [
      [
        "  Total Findings  ",
        " CRITICAL  ",
        "  HIGH  ",
        "  Medium  ",
        "  Low  ",
      ],
      ["     00  ", "     00 ", "    00 ", "    00 ", "    00 "],
    ];

    // Set font size and cell sizes
    const firstColumnWidthtable8 = 100; // Width for the first column
    const secondColumnWidthtable8 = 100;
    const thirdColumnWidthtable8 = 100; // Width for the second column
    const cellHeighttable8 = 30;
    //const fontSize = 12; // Font size

    // Set initial position and spacing
    x = 50; // X position
    y = 200; // Y position

    for (let i = 0; i < tableData8.length; i++) {
      for (let j = 0; j < tableData8[i].length; j++) {
        let cellWidth;
        if (j === 0) {
          cellWidth = firstColumnWidthtable8;
        } else if (j === 1) {
          cellWidth = secondColumnWidthtable8;
        } else {
          cellWidth = thirdColumnWidthtable8;
        }

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable8).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc.rect(x, y, cellWidth, cellHeighttable8).fill(backgroundColors[j]);
          doc.fillColor("white"); // Set text color to white for the first row
        } else {
          doc.fillColor("black"); // Set text color to black for other rows
        }

        doc
          .fontSize(fontSize)
          .text(
            tableData8[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable8; // Move to the next row
    }
    y += cellHeighttable8 + 10;

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text("Table 1: Category Listing", 80, doc.y + 30, {
        align: "center",
      });
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "The chart below, gives the overall summary of number of vulnerabilities discovered with their Risk Ratings. Zero (00) Critical Risk, Zero (00) High Risk, Zero (00) Medium Risk, Zero (00) Low Risk vulnerabilities were identified during the test.",
        60,
        doc.y + 30,
        {
          align: "left",
        }
      );
    doc
      .fontSize(16)
      .fillColor("black")
      .text("Severity Wise Analysis", 60, 430, {
        align: "left",
      });
    doc.fontSize(16).fillColor("black").text("Overall Analysis %", 370, 430, {
      align: "right",
    });

    // Set up your data for the bar char
    doc.image(chartimagePaths, {
      x: 60,
      y: doc.y + 30,
      width: 250, // Adjust the width as needed
    });

    doc.image(chartimagePaths2, {
      x: 350,
      y: doc.y + 30,
      width: 250, // Adjust the width as needed
    });
    doc.addPage();

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("6.2. Vulnerability Rating Definitions", 80, 50);

    const tableData9 = [
      [
        "  Vulnerability Levels",
        "                                      Description",
      ],
      [
        "    Critical",
        "            Exploitation of the vulnerability may result in complete compromise of the Database server or Application server. It can have a major impact on business. (CVSS Score- 9.0-10.0) ",
      ],
      [
        "    High",
        "            Exploitation of the vulnerability may result in complete compromise of the Application / disclosure of sensitive information. Vulnerability is easily exploitable. (CVSS Score- 7.0-8.9) ",
      ],

      [
        "    Medium",
        "            Exploitation of the vulnerability may result in some control on the Application / disclosure of semi- sensitive information. Exploitation of this vulnerability is possible but difficult. (CVSS Score- 4.0-6.9)",
      ],
      [
        "    Low",
        "            Exploitation of the vulnerability may result in little or no impact on the application/ disclosure of less sensitive information. Exploitation of this vulnerability is extremely difficult. (CVSS Score- 0.0-3.9)",
      ],
    ];

    // Set font size and cell sizes
    // const fontSize = 12;
    const firstColumnWidthtable9 = 150; // Width for the first column
    const secondColumnWidthtable9 = 350; // Width for the second column
    const cellHeighttable9 = 70;

    // Set initial position and spacing
    x = 50; // X position
    y = doc.y + 10;

    for (let i = 0; i < tableData9.length; i++) {
      for (let j = 0; j < tableData9[i].length; j++) {
        const cellWidth =
          j === 0 ? firstColumnWidthtable9 : secondColumnWidthtable9; // Adjust width based on the column

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable9).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc.fillAndStroke([31, 73, 125], [31, 73, 125]);
          doc.rect(x, y, cellWidth, cellHeighttable9).fillAndStroke();
        }

        // Set text color to white for the first row, and black for other rows
        doc.fill(i === 0 ? "white" : "black");

        if (j === 0) {
          // doc.fillColor([31, 73, 125]);
          doc.fillColor(backgroundColors[i]);
          doc.rect(x, y, cellWidth, cellHeighttable9).fill();
          doc.fillColor("white");
        }

        // Center text vertically within the cell
        const textHeight = doc.heightOfString(tableData9[i][j], {
          width: cellWidth - 10,
        });
        const verticalPosition = y + (cellHeighttable9 - textHeight) / 2;

        doc
          .fontSize(fontSize)
          .text(
            tableData9[i][j],
            x + 5,
            verticalPosition,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }

      x = 50; // Reset the X position for the next row
      y += cellHeighttable9; // Move to the next row
    }
    const textBelowTable =
      "7. Application Security Observations based on OWASP Top 10:";
    doc
      .fontSize(14) // Set the font size as needed
      .text(textBelowTable, 50, y + 30); // Adjust the position as needed

    doc.addPage();

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("9.Tools Used during Assessment & Testing:", 50, 50);
    doc.image(tool, {
      x: 50,
      y: doc.y + 30,
      width: 500, // Adjust the width as needed
    });
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("11.1. CVSS 3 Rating definition", 50, 350);
    // Add the new text
    const textCVSS3Definition =
      "In order to help standardize the risk of information technology vulnerabilities, the industry created the Common Vulnerability Scoring System, commonly referred to as CVSS. The scores range from 0 to 10 – with 10 representing the most risk. There are several things that are considered in order to assign the CVSS score including but not limited to: the degree of difficulty to exploit the vulnerability, whether the vulnerability allows for remote execution, whether there is an official fix or patch to address the vulnerability, etc. Standardized methodology to prioritize vulnerability remediation, which leverages the CVSS assigned to the vulnerability.";

    doc
      .fontSize(12) // Set the font size as needed
      .fillColor("black")
      .text(textCVSS3Definition, 50, 380);

    doc.image(table, {
      x: 50,
      y: doc.y + 30,
      width: 500, // Adjust the width as needed
    });
    doc.addPage();

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("11.2.General guidelines", 50, 50);

    const additionalText2 =
      "                   Validate Input and Output\n\n" +
      "The input that the server receives from the user can lead to malicious code entering the server. Similarly, the output shown to the user can transmit malicious code to the client system. All user input and output should be checked to ensure it is both, appropriate and expected.  Input validation should be done on the client-side as well as on the server-side.\n\n" +
      "There are three main models to consider while designing a data validation strategy.\n\n" +
      "                  1. Accept Only Known Valid Data\n\n" +
      "A character set may be defined for each field where input from the user is accepted, e.g., “A-Z, a-z, @,., 0-9, _” is a character set for a field that accepts user email.\n" +
      "Reject Known Bad Data\n" +
      "A character set of bad data may be defined for the site that has to be rejected, e.g., “CREATE, DROP, OR”.\n\n" +
      "                  2. Sanitize Known Bad Data\n\n" +
      "A character set of bad data is defined and any input field that has such a character is modified, e.g., “If there is a single quote (‘) in the data, it is replaced with two single quotes.”\n" +
      "All methods must check:\n" +
      "        • Data Type\n" +
      "        • Syntax\n" +
      "        • Length\n\n" +
      "It is recommended to use the strategy of “Accept only known data”. Further, all the allowed input/output data must be sanitized on the server side by replacing scripts tags, sent as part of user input/output, with appropriate representations.\n" +
      "For example,\n" +
      "        • “<” by &lt;\n" +
      "        • “>” by &gt;\n" +
      "        • “(“ by &#40\n\n" +
      "This would avoid scripts from being executed on the client side.\n\n" +
      "Client-side input must also be checked for URL encoded data. URL encoding, sometimes referred to as percent encoding, is the accepted method of representing characters within a URI that may need special syntax handling to be correctly interpreted. This is achieved by encoding the character to be interpreted with a sequence of three characters. This triplet sequence consists of the percentage character “%”, followed by the two hexadecimal digits representing the octet code of the original character. For example, the US-ASCII character set represents a space with octet code 32, or hexadecimal 20. Thus, its URL-encoded representation is %20.";

    doc
      .fontSize(12) // Set the font size as needed
      .fillColor("black")
      .text(additionalText2, 50, 80);

    doc.addPage();
    doc
      .fontSize(12) // Set the font size as needed
      .fillColor("black")
      .text(
        "Other common characters that can be used for malicious purposes and their URL encoded representations are: -",
        50,
        50
      );

    doc.image(table2, {
      x: 50,
      y: doc.y + 10,
      width: 400,
      height: 130, // Adjust the width as needed
    });

    const additionalText3 =
      "All input validation checks should be completed after the data has been decoded and validated as acceptable content (e.g., maximum and minimum lengths, correct data type, does not contain any encoded data, textual data only contains the characters a-z and A-Z, etc.)\n\n" +
      "A one-time check on the database is to be made for invalid malicious data.  This would enable removal of input that has not been validated in earlier sessions. Otherwise, the invalid data may cause script execution on the user’s browser.\n\n" +
      "SESSION MANAGEMENT / STRONG SESSION TRACKING\n\n" +
      "Session Tokens on Logout\n" +
      "In shared computing environments, session tokens take on a new risk. If the session tokens are not invalidated after logout, they can be reused to gain access to the application. It is imperative for the application to remove the cookies from both the server and the client side after the user has logged out. The user session maintained on the server side must also be invalidated immediately after logout.\n\n" +
      "Session Time-out\n" +
      "All the user Session tokens must be timed-out after a certain interval of user inactivity.  The Session tokens that do not expire on the HTTP server can allow an attacker unlimited time to guess or brute force a valid authenticated session token. If a user's cookie file is captured or brute-forced, then an attacker can use these static-session tokens to gain access to that user's web accounts. Additionally, session tokens can be potentially logged and cached in proxy servers that, if broken into by an attacker, may contain similar sorts of information in logs that can be exploited if the particular session has not been expired on the HTTP server.\n\n" +
      "SESSION TOKEN TRANSMISSION\n" +
      "If a session token is captured in transit through network interception, a web application account is then trivially prone to a replay or hijacking attack. Typical web encryption technologies include Secure Sockets Layer (SSLv2/v3) and Transport Layer Security (TLS v1) protocols in order to safeguard the state mechanism token.\n\n" +
      "Some more key points to remember:";

    doc
      .fontSize(12) // Set the font size as needed
      .text(additionalText3, 50, 240);

    doc.addPage();

    const additionalText4 =
      "Session ID’s that are used should have the following properties:\n" +
      "1. Randomness\n" +
      "a. Session Ids must be randomly generated.\n" +
      "b. Session Ids must be unpredictable.\n" +
      "c. Make use of non-linear algorithms to generate session ID’s\n\n" +
      "2. Session ID Size\n" +
      "a. The size of a session ID should be large enough to ensure that it is not vulnerable to a brute force attack.\n" +
      "b. The character set used should be complex. i.e. Make use of special characters.\n" +
      "c. A length of 70 random characters is advised.\n\n" +
      "SALTED HASHING\n\n" +
      "What is salted hashing?\n\n" +
      "The process starts with 2 elements of data:\n" +
      "1.) A clear text string (this could represent a password for instance).\n" +
      "2.) The salt, a random seed of data. This is the value used to augment a hash in order to ensure that 2 hashes of identical data yield different output.\n\n" +
      "In pseudocode we generate a salted hash as follows:\n" +
      "1.) Get the source string and salt as separate binary objects\n" +
      "2.) Concatenate the 2 binary values\n" +
      "3.) SHA hash the concatenation into SaltedPasswordHash\n" +
      "4.) Base64 Encode(concat(SaltedPasswordHash, Salt))\n\n" +
      "Credentials should be encrypted using salted hashes, so that even if the hashes are sniffed the possibility of a replay attack does not exist.\n\n" +
      "References: http://www.owasp.org/images/3/33/Salted_Hashes_Demystified.doc\n\n" +
      "Cache Control Directives\n\n" +
      "Pages that contain sensitive information should not be stored in the local cache of the browser. To enforce this, HTTP directives need to be specified in the response. These HTTP directives need to be used to prevent enlisting of links on the browser history. The following HTTP directives can be sent by the server along with the response to the client. This would direct the browser to send a new request to the server each time it is generated.\n" +
      "Expires: <a previous date>, for e.g. Expires: Thu, 10 Jan 200419:20:00 GMT\n\n" +
      "Cache-Control: private\n" +
      "• Cache-Control: no-cache\n" +
      "• Cache-Control: no-store\n" +
      "• Cache-Control: must-revalidate\n" +
      "• Pragma: no-cache\n\n" +
      "The directive “Cache-Control: must-revalidate” directs the browser to fetch the pages from the server rather than picking it up from the local “Temporary Internet Folders”. It also directs the browser to remove the file from the temporary folders.";

    doc
      .fontSize(12) // Set the font size as needed
      .text(additionalText4, 50, 50); // Adjust the position as needed
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("12. G-Info Technology Solutions Contact:", 50, 120);
    const officeContactsTableData = [
      [
        "Office Contacts",
        "Phone: 1800 212 676767\nEmail: info@gisconsulting.in",
      ],
      [
        "1st Level",
        "Name: Auditor Name\nemail: auditor.email@gisconsulting.org\nMob: +91 0000000000",
      ],
      [
        "2nd Level",
        "Name: Rishav Kumar\nEmail: rishav.kumar@gisconsulting.in\nMob: +91 70046 52649",
      ],
      [
        "3rd Level",
        "Name: Naveen Dham\nEmail: naveen.dham@gisconsulting.in\nMob: +91-9810976838",
      ],
    ];

    // Set font size and cell sizes
    // const fontSize = 12;
    const columnWidth = 250; // Width for each column
    const cellHeightt = 50;

    // Set initial position and spacing
    x = 50; // X position
    y = 150;
    for (let i = 0; i < officeContactsTableData.length; i++) {
      for (let j = 0; j < officeContactsTableData[i].length; j++) {
        // Draw cell border
        doc.rect(x, y, columnWidth, cellHeightt).stroke();

        doc
          .fontSize(fontSize)
          .fillColor("black")
          .text(
            officeContactsTableData[i][j],
            x + 5,
            y + 5,
            { width: columnWidth - 10 },
            { width: columnWidth, align: "left" }
          );

        x += columnWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeightt; // Move to the next row
    }
    doc.end();
  }, delay);
};

const downloadReportById = async (req, res) => {
  const { pid, tid, type, webtargetUrlsid } = req.params;

  const project = await Project.findById(pid);
  const manager = await Employee.findById(project.manager);
  const task = await Task.findById(tid);
  const reports = [];
  if (type === "web") {
    for (let i = 0; i < task.webData.webtargetUrls.length; i++) {
      if (task.webData.webtargetUrls[i]._id == webtargetUrlsid) {
        for (
          let j = 0;
          j < task.webData.webtargetUrls[i].assignEmployee.length;
          j++
        ) {
          for (
            let k = 0;
            k < task.webData.webtargetUrls[i].assignEmployee[j].report.length;
            k++
          ) {
            reports.push(
              task.webData.webtargetUrls[i].assignEmployee[j].report[k]
            );
          }
        }
      }
    }
  } else if (type === "api") {
    for (let j = 0; j < task.apiData.assignEmployee.length; j++) {
      for (let k = 0; k < task.apiData.assignEmployee[j].report.length; k++) {
        reports.push(task.apiData.assignEmployee[j].report[k]);
      }
    }
  } else if (type === "mobile") {
    if (webtargetUrlsid === "android") {
      for (
        let j = 0;
        j < task.mobileData.forAndroid.assignEmployee.length;
        j++
      ) {
        for (
          let k = 0;
          k < task.mobileData.forAndroid.assignEmployee[j].report.length;
          k++
        ) {
          reports.push(task.mobileData.forAndroid.assignEmployee[j].report[k]);
        }
      }
    } else {
      for (let j = 0; j < task.mobileData.forIos.assignEmployee.length; j++) {
        for (
          let k = 0;
          k < task.mobileData.forIos.assignEmployee[j].report.length;
          k++
        ) {
          reports.push(task.mobileData.forIos.assignEmployee[j].report[k]);
        }
      }
    }
  }

  const reports_data = [];

  for (let i = 0; i < reports.length; i++) {
    const r = await Report.findById(reports[i]).populate("employee");
    if (r.isCompleted) {
      reports_data.push(r);
    }
  }
  if (reports_data.length < 1) {
    return res.status(404).send("Not found reports");
  }
  // return console.log(reports_data[0][0].employee.name);
  const date = new Date(reports_data[0].createdAt);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  const authorsAndAuditorsText = [
    [
      "    Authors & Auditors",
      "                                       Mail ID",
    ],
  ];

  let HIGH = 0,
    CRITICAL = 0,
    MEDIUM = 0,
    LOW = 0;
  for (let i = 0; i < reports_data.length; i++) {
    let temp = [reports_data[i].employee.name, reports_data[i].employee.email];
    authorsAndAuditorsText.push(temp);
    if (reports_data[i].risk === "high") {
      HIGH++;
    } else if (reports_data[i].risk === "low") {
      LOW++;
    } else if (reports_data[i].risk === "critical") {
      CRITICAL++;
    } else {
      MEDIUM++;
    }
  }
  authorsAndAuditorsText.push(["GISC InfoSec Team", "GISC InfoSec Team"]);
  const summary_finds = [
    "    " + reports_data.length,
    "    " + CRITICAL,
    "    " + HIGH,
    "    " + MEDIUM,
    "    " + LOW,
  ];
  chartt([CRITICAL, HIGH, MEDIUM, LOW]);
  chart2([CRITICAL, HIGH, MEDIUM, LOW]);

  const doc = new pdfkit();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="dynamic.pdf"');

  doc.pipe(res);
  // from here

  const delay = 2000; // 1 second
  setTimeout(function () {
    doc.image(imagePath, {
      x: 50, // Adjust the X position as needed
      y: 30, // Adjust the Y position as needed
      width: 500, // Adjust the width as needed
    });
    // Add some content to the body of the PDF
    const topMargin = 200;
    doc.y = topMargin;
    doc.x = 50;
    // Add the "Security Assessment" text
    doc.fontSize(24).text("Security Assessment", 50, doc.y);

    // Reduce the space between lines
    doc.moveDown(0.5); // Adjust the value as needed

    // Add "FOR" text
    doc.fontSize(16).text("REPORT FOR", doc.x, doc.y);

    // Reduce the space between lines
    doc.moveDown(1); // Adjust the value as needed

    // Add "Host company Name" text
    doc.fontSize(16).text(project.companyName, doc.x, doc.y);

    // Reduce the space between lines
    doc.moveDown(0.5); // Adjust the value as needed

    // Add the "December 26th, 2022" text
    doc.fontSize(16).text(formattedDate, doc.x, doc.y);

    doc.moveDown(2); // Adjust the value as needed for spacing

    // Add the left-aligned text
    doc.fontSize(12).text("Report Prepared by: ", doc.x, doc.y);
    doc.fontSize(10).text(reports_data[0].employee.name, doc.x, doc.y);
    doc.fontSize(10).text(reports_data[0].employee.email, doc.x, doc.y);
    doc.fontSize(10).text("(A CERT-IN Empaneled Company)", doc.x, doc.y);
    doc
      .fontSize(10)
      .text("(Empanelment no.: 3(15)/2004-CERT-In)", doc.x, doc.y);
    doc.fontSize(10).text("info@gisconsulting.in", doc.x, doc.y);

    doc.x = 350; // Adjust the X position for the right-aligned text

    // Add the right-aligned text
    doc.fontSize(12).text("Report reviewed by: ", 350, 360);
    doc.fontSize(10).text(manager.name, doc.x, doc.y);
    doc.fontSize(10).text("Principal Consultant", doc.x, doc.y);
    doc
      .fontSize(10)
      .text(
        "CISA certified MSc. Cyber Forensics & Information Security",
        doc.x,
        doc.y
      );
    doc.fontSize(10).text("naveen.dham@gisconsulting.in", doc.x, doc.y);

    doc.moveDown(2);
    const noteText =
      "NOTE: The information contained within this report is considered proprietary and confidential to the {GIS Consulting}. Inappropriate and unauthorized disclosure of this report or portions of it could result in significant damage or loss to the " +
      project.companyName +
      ". This report should be distributed to individuals on a Need-to-Know basis only. Paper copies should be locked up when not in use. Electronic copies should be stored offline and protected appropriately.";

    doc.fontSize(12).text(noteText, 50, 500, { width: 550 });

    doc.moveDown(2); // Adjust the value as needed for spacing

    const corporateOfficeText =
      "CORPORATE OFFICE \n Level 2, Augusta Point, Parsvnath Exotica, Sector 73, Golf Course, Gurgoan-122002\n" +
      "CIN No. U72200DL2017PTC323914\n" +
      "\n" +
      "Toll-free: 1800 212 676767\n" +
      "Web : www.gisconsulting.in\n" +
      "Email:-info@gisconsulting.in";

    doc
      .fontSize(14)
      .text(corporateOfficeText.split("\n")[0], 50, 610, { width: 250 });

    // Set a different font size for the rest of the text
    doc.fontSize(10).text(corporateOfficeText.split("\n").slice(1).join("\n"), {
      width: 250,
    });

    // Add the United States office information to the right
    doc.fontSize(12).text("UNITED STATES OFFICE ", 400, 620, { width: 300 });
    doc.fontSize(10).text("13731 Monarch Vista Dr ", doc.x, doc.y);
    doc.fontSize(10).text("Germantown MD 20874", doc.x, doc.y);
    doc.moveDown(1.6);
    doc.fontSize(10).text("CALL US :- +12407202889", doc.x, doc.y);
    doc.fontSize(10).text("Web : www.gisconsulting.org", doc.x, doc.y);
    doc.fontSize(10).text("Email:-info@gisconsulting.org", doc.x, doc.y);

    // Add a new page
    doc.addPage();

    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });
    // Draw the header text
    // Define your header text
    const headerText = "1. Document Control";

    // Set font size for the header
    const headerFontSize = 16;

    doc.fontSize(headerFontSize).text(headerText, { align: "left" }, 60, 60);

    const tableData = [
      [
        "    Document Type",
        "    Web Application Penetration Testing Report for{ Host Name}",
      ],
      ["    Document Owner", "    G-INFO TECHNOLOGY SOLUTIONS PVT. LTD."],
    ];

    // Set font size and cell sizes
    const fontSize = 12;
    const firstColumnWidth = 150; // Width for the first column
    const secondColumnWidth = 350; // Width for the second column
    const cellHeight = 30;

    // Set initial position and spacing
    let x = 50; // X position
    let y = 70; // Y position

    // Background color for the first column
    const firstColumnFillColor = [204, 236, 255];
    // Loop through the data and draw the table with borders
    // Move to the next line for the table
    y += headerFontSize + 30;
    for (let i = 0; i < tableData.length; i++) {
      for (let j = 0; j < tableData[i].length; j++) {
        const cellWidth = j === 0 ? firstColumnWidth : secondColumnWidth; // Adjust width based on the column

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeight).stroke();
        // Fill background color in the first column
        if (j === 0) {
          doc
            .rect(x, y, firstColumnWidth, cellHeight)
            .fill(firstColumnFillColor);
        }
        // Set text color to black for the first column
        doc.fillColor("black");

        // Draw text in the cell
        doc
          .fontSize(fontSize)
          .text(
            tableData[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            "center"
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeight; // Move to the next row
    }

    const tableData2 = authorsAndAuditorsText;

    // Set font size and cell sizes
    // const fontSize = 12;
    const firstColumnWidthtabl2 = 150; // Width for the first column
    const secondColumnWidthtable2 = 350; // Width for the second column
    const cellHeighttable2 = 30;

    // Set initial position and spacing
    x = 50; // X position
    y = y + cellHeight; // Y position

    for (let i = 0; i < tableData2.length; i++) {
      for (let j = 0; j < tableData2[i].length; j++) {
        const cellWidth =
          j === 0 ? firstColumnWidthtabl2 : secondColumnWidthtable2; // Adjust width based on the column

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable2).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc
            .rect(x, y, cellWidth, cellHeighttable2)
            .fill(firstColumnFillColor);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData2[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable2; // Move to the next row
    }

    // Third Table in

    const tableData3 = [
      [
        "    Reviewed and Verified by",
        "                                       Mail ID",
      ],
      ["   " + manager.name, "            " + manager.email],
    ];

    // Set font size and cell sizes
    // const fontSize = 12;
    const firstColumnWidthtabl3 = 160; // Width for the first column
    const secondColumnWidthtable3 = 350; // Width for the second column
    const cellHeighttable3 = 30;

    // Set initial position and spacing
    x = 50; // X position
    y = y + cellHeight; // Y position

    for (let i = 0; i < tableData3.length; i++) {
      for (let j = 0; j < tableData3[i].length; j++) {
        const cellWidth =
          j === 0 ? firstColumnWidthtabl3 : secondColumnWidthtable3; // Adjust width based on the column

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable3).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc
            .rect(x, y, cellWidth, cellHeighttable3)
            .fill(firstColumnFillColor);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData3[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable3; // Move to the next row
    }

    //Table no 4
    const tableData4 = [
      ["Version", "Date", "Description"],
      [
        "1.0",
        " " + formattedDate,
        "Web Application Penetration Testing Report for Host Name",
      ],
    ];

    // Set font size and cell sizes
    const firstColumnWidthtabl4 = 60; // Width for the first column
    const secondColumnWidthtable4 = 100;
    const thirdColumnWidthtable4 = 350; // Width for the second column
    const cellHeighttable4 = 30;
    const color = [204, 236, 255];
    // Set initial position and spacing
    x = 50; // X position
    y = y + cellHeight; // Y position

    for (let i = 0; i < tableData4.length; i++) {
      for (let j = 0; j < tableData4[i].length; j++) {
        // const cellWidth = === 0 ? firstColumnWidthtabl4 : secondColumnWidthtable4 : thirdColumnWidthtable4; // Adjust width based on the column
        let cellWidth;
        let fillColor;
        if (j === 0) {
          cellWidth = firstColumnWidthtabl4;
          fillColor = firstColumnFillColor;
        } else if (j === 1) {
          cellWidth = secondColumnWidthtable4;
          fillColor = color;
        } else {
          cellWidth = thirdColumnWidthtable4;
          fillColor = color;
        }
        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable4).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc
            .rect(x, y, cellWidth, cellHeighttable4)
            .fill(firstColumnFillColor);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData4[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable4; // Move to the next ro
    }

    //Table no 5
    const tableData5 = [
      ["Client", "Name", "Email ID"],
      [
        project.companyName,
        project.clientName,
        " " + reports_data[0].employee.email,
      ],
    ];

    // Set font size and cell sizes
    const firstColumnWidthtabl5 = 100; // Width for the first column
    const secondColumnWidthtable5 = 100;
    const thirdColumnWidthtable5 = 300; // Width for the second column
    const cellHeighttable5 = 30;
    // Set initial position and spacing
    x = 50; // X position
    y = y + cellHeight; // Y position

    for (let i = 0; i < tableData5.length; i++) {
      for (let j = 0; j < tableData5[i].length; j++) {
        // const cellWidth = === 0 ? firstColumnWidthtabl4 : secondColumnWidthtable4 : thirdColumnWidthtable4; // Adjust width based on the column
        let cellWidth;
        let fillColor;
        if (j === 0) {
          cellWidth = firstColumnWidthtabl5;
          fillColor = firstColumnFillColor;
        } else if (j === 1) {
          cellWidth = secondColumnWidthtable5;
          fillColor = color;
        } else {
          cellWidth = thirdColumnWidthtable5;
          fillColor = color;
        }
        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable5).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc.rect(x, y, cellWidth, cellHeighttable5).fill(color);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData5[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable5; // Move to the next ro
    }
    y += cellHeighttable5 + 10; // Adjust the value as needed for spacing

    // Define the text for "Notice of Confidentiality"
    const confidentialityText =
      "This document contains proprietary and confidential information of G-Info Technology Solutions PVT LTD. The recipient agrees to maintain this information in confidence and not to reproduce or to disclose this information to any person outside of the group directly responsible for the evaluation of its contents. There is no obligation to maintain the confidentiality of any information which was known to the recipient prior to the receipt of this document from G-Info Technology or which becomes publicly known through no fault of the recipient or is received without obligation of confidentiality from a third party owing to no obligation of confidentiality to G-Info Technology Solutions PVT LTD.";

    // Set the font size for the "Notice of Confidentiality" title
    const titleFontSize = 16;

    // Set the font size for the rest of the text
    const textFontSize = 10;

    // Set the position for the "Notice of Confidentiality" title
    const titleX = 50; // X position
    const titleY = y; // Y position

    // Draw the title with increased font size
    doc
      .fontSize(titleFontSize)
      .text("Notice of Confidentiality:", titleX, titleY, {
        width: 500,
      });

    // Set the position for the rest of the text
    const textX = titleX; // X position
    const textY = titleY + titleFontSize + 10; // Y position

    // Draw the rest of the text with the regular font size
    doc.fontSize(textFontSize).text(confidentialityText, textX, textY, {
      width: 500,
    });

    // Add a new page for the table of contents
    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });
    // Define the table of contents text
    const tableOfContentsText =
      "Table of Contents\n\n" +
      "1. Document Control " +
      ".".repeat(60) +
      " 2\n\n" +
      "2. Introduction " +
      ".".repeat(60) +
      " 4\n\n" +
      "3. Web Application Platform Details" +
      ".".repeat(30) +
      " 4\n\n" +
      "     3.1. Scope of Web Penetration Testing " +
      ".".repeat(30) +
      " 4\n\n" +
      "             3.1.1. Target Website Details " +
      ".".repeat(30) +
      " 4\n\n" +
      "             3.1.2. Websites Platform Details " +
      ".".repeat(30) +
      " 4\n\n" +
      "4. Testing Methodology and Approach " +
      ".".repeat(30) +
      " 5\n\n" +
      "5. Web Apps Audit Test Standard followed " +
      ".".repeat(30) +
      " 7\n\n" +
      "6. Summary Report: " +
      ".".repeat(30) +
      " 9\n\n" +
      "6.1. Overall Summary of Findings " +
      ".".repeat(30) +
      " 9\n\n" +
      "6.2. Vulnerability Rating Definitions " +
      ".".repeat(30) +
      " 9\n\n" +
      "7. Web Application Security Audit Executive Summary Report: " +
      ".".repeat(30) +
      " 10\n\n" +
      "8. Application Security Observations based on OWASP Top 10: " +
      ".".repeat(10) +
      " 11\n\n" +
      "9. Details Reports, POCs & Recommendations: " +
      ".".repeat(30) +
      " 12\n\n" +
      "     9.1. “High Vulnerability Details” " +
      ".".repeat(30) +
      " 12\n\n" +
      "        9.1.2 Insecure Communication " +
      ".".repeat(30) +
      " 12\n\n" +
      "9. Tools Used during Assessment & Testing: " +
      ".".repeat(30) +
      " 13\n\n" +
      "10. Appendix: " +
      ".".repeat(30) +
      " 13\n\n" +
      "     11.1. CVSS 3 Rating definition " +
      ".".repeat(30) +
      " 13\n\n" +
      "     11.2. General guidelines " +
      ".".repeat(30) +
      " 14\n\n" +
      "12. G-Info Technology Solutions Contact: " +
      ".".repeat(30) +
      " 17\n\n";

    // Set the font size for the table of contents
    const tableOfContentsFontSize = 12;

    // Set the position for the table of contents
    const tableOfContentsX = 80; // X position
    const tableOfContentsY = 80; // Y position

    // Draw the table of contents
    doc
      .fontSize(tableOfContentsFontSize)
      .text(tableOfContentsText, tableOfContentsX, tableOfContentsY, {
        width: 500,
      });

    // 4 th page

    const textsize = 12;
    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });
    const color2 = [54, 95, 145];

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("2. Introduction", { align: "left" }, 60, 60);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "G-Info Technology Solutions Inc. has been contracted to conduct a Web Application Security Assessment test against <host_name>, UP Web Applications defined in the scope. The objective of this assessment was to assess the overall security posture of the application from a Black-box perspective. This includes determining the application’s ability to resist common attack patterns and identifying vulnerable areas in the internal or external interfaces that may be exploited by a malicious user.\n\n",
        80,
        90,
        {
          width: 500,
        }
      );

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("3. Web Application Platform Details", 60, 180, { align: "left" });
    // doc.moveDown(1);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "The scope of the assessment was limited to performing a Web Application Testing on the URL mentioned below:",
        80,
        200,
        {
          width: 500,
        }
      );
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("3.1. Scope of Web Penetration Details", 80, 250, {
        align: "left",
      });
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "The Vulnerability Assessment and Penetration Testing performed was focused on <host_name> websites, and its related Web Application",
        80,
        270,
        {
          width: 550,
        }
      );
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("3.1.1 Target Website Details", 80, 310, { align: "left" });

    //Table no 4
    const tableData7 = [
      [" Target Website URL’s ", " URL "],
      [" Test Type ", " Black/Gray Box "],
    ];

    // Set font size and cell sizes
    const firstColumnWidthtabl7 = 150; // Width for the first column
    const secondColumnWidthtable7 = 300;
    const thirdColumnWidthtable7 = 350; // Width for the second column
    const cellHeighttable7 = 30;

    // Set initial position and spacing
    x = 100; // X position
    y = 350; // Y position

    for (let i = 0; i < tableData7.length; i++) {
      for (let j = 0; j < tableData7[i].length; j++) {
        let cellWidth;
        let fillColor;
        if (j === 0) {
          cellWidth = firstColumnWidthtabl7;
          fillColor = firstColumnFillColor;
        } else if (j === 1) {
          cellWidth = secondColumnWidthtable7;
          fillColor = color;
        } else {
          cellWidth = thirdColumnWidthtable7;
          fillColor = color;
        }
        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable7).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc
            .rect(x, y, cellWidth, cellHeighttable7)
            .fill(firstColumnFillColor);
        }

        // Set text color to white for the first row, and black for other rows
        doc.fillColor(i === 0 ? "black" : "black");
        doc
          .fontSize(fontSize)
          .text(
            tableData7[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 100; // Reset the X position for the next row
      y += cellHeighttable7; // Move to the next ro
    }
    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("4. Testing Methodology and Approach", { align: "left" }, 60, 60);

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nG-Info Technology Solutions Security team was engaged to perform a manual security assessment against the target application. This assessment involved a deep automated scan using automated scanning tools to discover common vulnerabilities, as well as manual testing. Manual testing includes validation of all issue types covered under the automated scan as well as checks for problems not typically found by automated scanners such as authentication, authorization, and business logic flaws.\n\n\n",
        80,
        80,
        { width: 500 }
      );
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\n A Vulnerability Assessment is a method of evaluating the security of an application by simulating an attack. The process involves an active analysis of the application for any weaknesses, functional flaws, and vulnerabilities. Any security issues that are identified will be explained with an assessment of their impact, with a solution for their mitigation. The OWASP Web Application Methodology is based on the ‘gray box’ approach. The testing model consists of following phases:\n\n",
        80,
        170,
        { width: 500 }
      );

    doc.image(testingMethodology, {
      x: 70, // Adjust the X position as needed
      y: 270, // Adjust the Y position as needed
      width: 500, // Adjust the width as needed
      height: 200,
    });
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text(" Information Gathering", 60, 530, { align: "left" });
    doc.moveDown(1);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nGathering information is the first step where a hacker tries to get information about the target. Hackers use different sources and tools to get more information about the target.",
        60,
        550,
        { align: "left" }
      );

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text(" Threat Modeling:", 60, 600, { align: "left" });
    doc.moveDown(1);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nThreat modelling is a process by which potential threats, such as structural vulnerabilities or the absence of appropriate safeguards, can be identified, enumerated, and mitigations can be prioritized.",
        60,
        610,
        { align: "left" }
      );
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text(" Vulnerability Analysis", 60, 670, { align: "left" });
    doc.moveDown(1);
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nA vulnerability assessment is an in-depth analysis of the building functions, systems, and site characteristics to identify building weaknesses and lack of redundancy, and determine mitigations or corrective actions that can be designed or implemented to reduce the vulnerabilities.",
        60,
        690,
        { align: "left" }
      );

    // Add the new text here
    doc.moveDown(1);
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("Exploitation:", 60, null, { align: "left" });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "In computer security, a vulnerability is a weakness which can be exploited by a threat actor, such as an attacker, to perform unauthorized actions within a computer system. To exploit a vulnerability, an attacker must have at least one applicable tool or technique that can connect to a system weakness.",
        60,
        null,
        { align: "left" }
      );

    doc.moveDown(1);
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("Post Exploitation:", 60, null, { align: "left" });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "As the term suggests, post exploitation basically means the phases of operation once a victim's system has been compromised by the attacker. The value of the compromised system is determined by the value of the actual data stored in it and how an attacker may make use of it for malicious purposes. The concept of post exploitation has risen from this fact only as to how you can use the victim's compromised system's information. This phase actually deals with collecting sensitive information, documenting it, and having an idea of the configuration settings, network interfaces, and other communication channels. These may be used to maintain persistent access to the system as per the attacker's needs.",
        60,
        null,
        { align: "left" }
      );

    doc.moveDown(1);
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("Reporting:", 60, null, { align: "left" });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "Preparation of report as per severity along with remedial recommendation. Evidence against claims and recommendation after successfully exploit all vulnerabilities we prepare detail report including Proof of concept and recommendations.",
        60,
        null,
        { align: "left" }
      );

    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("5.Web Apps Audit Test Standard followed:", 60, null, {
        align: "left",
      });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\n\nScanning tools used in the WAPT Test possess the capability to assess OWASP TOP 10 Risk as under: \n\n",
        60,
        null,
        { align: "left" }
      );
    const color3 = [74, 22, 71];
    doc
      .fontSize(14)
      .fillColor(color3)
      .text("OWASP Top 10 Risks (2021) Scanned in the Report", 60, null, {
        align: "left",
      });

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\n\n Attackers can potentially use many different paths through the applications to do harm to your business or organization. Each of these paths represents a risk that may, or may not, be serious enough to warrant attention.",
        60,
        null,
        { align: "left" }
      );
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\n\nThe OWASP Top 10 list consists of the 10 most seen application vulnerabilities:",
        60,
        null,
        {
          align: "left",
          underline: true, // This property underlines the text
        }
      );

    const additionalText = `
      -> Broken Access Control
      -> Cryptographic Failures
      -> Injection
      -> Insecure Design
      -> Security Misconfiguration
      -> Vulnerable and Outdated Components
      -> Identification and Authentication Failures
      -> Software and Data Integrity Failures
      -> Security Logging and Monitoring Failures
      -> Server-Side Request Forgery (SSRF)\n\n\n
  `;

    doc
      .fontSize(textsize) // You can use the same font size as above
      .fillColor("black") // You can use the same text color as above
      .text(additionalText, 60, null, { align: "left" });

    doc.image(abc, {
      x: 70, // Adjust the X position as needed
      y: doc.y, // Adjust the Y position as needed
      width: 500, // Adjust the width as needed
    });

    doc.addPage();
    doc.image(hearder, {
      x: 50, // Adjust the X position as needed
      y: 20, // Adjust the Y position as needed
      width: 100, // Adjust the width as needed
    });

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("6.Summary Report:\n\n", 60, null, {
        align: "left",
      });

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("6.1.Overall Summary of Findings", 80, null, {
        align: "left",
      });
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "\nThe table below provides summary of the vulnerabilities that were identified during the assessment. ",
        80,
        null,
        {
          align: "left",
        }
      );

    // Add a table behind the text
    // Define different background colors for each cell in the first row
    const backgroundColors = [
      [31, 73, 125],
      "red",
      "red",
      "yellow",
      [155, 187, 89],
    ];

    const tableData8 = [
      [
        "  Total Findings  ",
        " CRITICAL  ",
        "  HIGH  ",
        "  Medium  ",
        "  Low  ",
      ],
      summary_finds,
    ];

    // Set font size and cell sizes
    const firstColumnWidthtable8 = 100; // Width for the first column
    const secondColumnWidthtable8 = 100;
    const thirdColumnWidthtable8 = 100; // Width for the second column
    const cellHeighttable8 = 30;
    //const fontSize = 12; // Font size

    // Set initial position and spacing
    x = 50; // X position
    y = 200; // Y position

    for (let i = 0; i < tableData8.length; i++) {
      for (let j = 0; j < tableData8[i].length; j++) {
        let cellWidth;
        if (j === 0) {
          cellWidth = firstColumnWidthtable8;
        } else if (j === 1) {
          cellWidth = secondColumnWidthtable8;
        } else {
          cellWidth = thirdColumnWidthtable8;
        }

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable8).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc.rect(x, y, cellWidth, cellHeighttable8).fill(backgroundColors[j]);
          doc.fillColor("white"); // Set text color to white for the first row
        } else {
          doc.fillColor("black"); // Set text color to black for other rows
        }

        doc
          .fontSize(fontSize)
          .text(
            tableData8[i][j],
            x + 5,
            y + 5,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeighttable8; // Move to the next row
    }
    y += cellHeighttable8 + 10;

    doc
      .fontSize(textsize)
      .fillColor("black")
      .text("Table 1: Category Listing", 80, doc.y + 30, {
        align: "center",
      });
    doc
      .fontSize(textsize)
      .fillColor("black")
      .text(
        "The chart below, gives the overall summary of number of vulnerabilities discovered with their Risk Ratings. Zero (00) Critical Risk, Zero (00) High Risk, Zero (00) Medium Risk, Zero (00) Low Risk vulnerabilities were identified during the test.",
        60,
        doc.y + 30,
        {
          align: "left",
        }
      );
    doc
      .fontSize(16)
      .fillColor("black")
      .text("Severity Wise Analysis", 60, 430, {
        align: "left",
      });
    doc.fontSize(16).fillColor("black").text("Overall Analysis %", 370, 430, {
      align: "right",
    });

    // Set up your data for the bar char
    doc.image(chartimagePaths, {
      x: 60,
      y: doc.y + 30,
      width: 250, // Adjust the width as needed
    });

    doc.image(chartimagePaths2, {
      x: 350,
      y: doc.y + 30,
      width: 250, // Adjust the width as needed
    });
    doc.addPage();

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("6.2. Vulnerability Rating Definitions", 80, 50);

    const tableData9 = [
      [
        "  Vulnerability Levels",
        "                                      Description",
      ],
      [
        "    Critical",
        "            Exploitation of the vulnerability may result in complete compromise of the Database server or Application server. It can have a major impact on business. (CVSS Score- 9.0-10.0) ",
      ],
      [
        "    High",
        "            Exploitation of the vulnerability may result in complete compromise of the Application / disclosure of sensitive information. Vulnerability is easily exploitable. (CVSS Score- 7.0-8.9) ",
      ],

      [
        "    Medium",
        "            Exploitation of the vulnerability may result in some control on the Application / disclosure of semi- sensitive information. Exploitation of this vulnerability is possible but difficult. (CVSS Score- 4.0-6.9)",
      ],
      [
        "    Low",
        "            Exploitation of the vulnerability may result in little or no impact on the application/ disclosure of less sensitive information. Exploitation of this vulnerability is extremely difficult. (CVSS Score- 0.0-3.9)",
      ],
    ];
    // Set font size and cell sizes
    // const fontSize = 12;
    const firstColumnWidthtable9 = 150; // Width for the first column
    const secondColumnWidthtable9 = 350; // Width for the second column
    const cellHeighttable9 = 70;

    // Set initial position and spacing
    x = 50; // X position
    y = doc.y + 10;

    for (let i = 0; i < tableData9.length; i++) {
      for (let j = 0; j < tableData9[i].length; j++) {
        const cellWidth =
          j === 0 ? firstColumnWidthtable9 : secondColumnWidthtable9; // Adjust width based on the column

        // Draw cell border
        doc.rect(x, y, cellWidth, cellHeighttable9).stroke();

        // Fill background color for the first row
        if (i === 0) {
          doc.fillAndStroke([31, 73, 125], [31, 73, 125]);
          doc.rect(x, y, cellWidth, cellHeighttable9).fillAndStroke();
        }

        // Set text color to white for the first row, and black for other rows
        doc.fill(i === 0 ? "white" : "black");

        if (j === 0) {
          // doc.fillColor([31, 73, 125]);
          doc.fillColor(backgroundColors[i]);
          doc.rect(x, y, cellWidth, cellHeighttable9).fill();
          doc.fillColor("white");
        }

        // Center text vertically within the cell
        const textHeight = doc.heightOfString(tableData9[i][j], {
          width: cellWidth - 10,
        });
        const verticalPosition = y + (cellHeighttable9 - textHeight) / 2;

        doc
          .fontSize(fontSize)
          .text(
            tableData9[i][j],
            x + 5,
            verticalPosition,
            { width: cellWidth - 10 },
            { width: cellWidth, align: "center" }
          );

        x += cellWidth; // Move to the next column
      }

      x = 50; // Reset the X position for the next row
      y += cellHeighttable9; // Move to the next row
    }
    const textBelowTable =
      "7. Application Security Observations based on OWASP Top 10:";
    doc
      .fontSize(14) // Set the font size as needed
      .text(textBelowTable, 50, y + 30); // Adjust the position as needed

    doc.addPage();

    // Add the text to the document with proper Y-coordinates
    doc
      .fontSize(headerFontSize)
      .fillColor("black")
      .text("8 Detail Reports POCs & Recommendations", 50, 50);

    // Add a gap between lines
    doc.moveDown();

    doc
      .fontSize(headerFontSize)
      .fillColor("red")
      .text("     8.1. “High Vulnerability Details”", 50, 70);

    // Add a gap between lines
    doc.moveDown();

    doc
      .fontSize(headerFontSize)
      .fillColor("black")
      .text("     9.1.2 Insecure Communication", 50, 90);

    // Add a gap between lines
    doc.moveDown();
    for (let i = 0; i < reports_data.length; i++) {
      const pageHeight = doc.page.height;
      const tableData10 = [
        ["DATE OF DISCOVERY", reports_data[i].createdAt],
        ["CVSS 3 SCORE", "8.6"],
        ["CATEGORY", "Cryptographic Failures"],
        ["STATUS", "OPEN"],
        ["CVSS Vector", "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:L "],
        ["Threat", "Insecure Communication"],
        ["CVE, OWASP, CWE, REFERENCE", "A2"],
      ];

      // Set styling variables
      const firstColumnWidthTable10 = 150;
      const secondColumnWidthTable10 = 350;
      const cellHeightTable10 = 50; // Adjusted cell height for better spacing

      // Set initial position and spacing
      x = 50;
      y = 120; // Adjusted starting Y-coordinate

      // Function to create a dynamically resizable table
      function createResizableTable(data) {
        for (let i = 0; i < data.length; i++) {
          // Check if there is enough space on the current page
          if (
            y +
              doc.heightOfString(data[i][0], {
                width: firstColumnWidthTable10 - 10,
              }) >
            pageHeight
          ) {
            // Add a new page if there is not enough space
            doc.addPage();
            // Reset Y-coordinate
            y = 50;
          }

          let maxCellHeight = 0;

          for (let j = 0; j < data[i].length; j++) {
            const cellWidth =
              j === 0 ? firstColumnWidthTable10 : secondColumnWidthTable10;

            // Calculate the height of the current cell based on content
            const textHeight = doc.heightOfString(data[i][j], {
              width: cellWidth - 10,
            });
            const cellHeight = Math.max(cellHeightTable10, textHeight + 10);

            // Update the maximum cell height in the current row
            maxCellHeight = Math.max(maxCellHeight, cellHeight);

            doc.rect(x, y, cellWidth, cellHeight).stroke();

            if (i === 0) {
              doc.fillAndStroke("white", "black");
              doc.rect(x, y, cellWidth, cellHeight).fillAndStroke();
            }

            doc.fill(i === 0 ? "black" : "black");

            // Center text vertically within the cell
            const verticalPosition = y + (cellHeight - textHeight) / 2;

            doc.fontSize(fontSize).text(data[i][j], x + 5, verticalPosition, {
              width: cellWidth - 10,
              align: "left",
            });

            x += cellWidth;
          }

          // Adjust the Y-coordinate based on the maximum cell height in the current row
          y += maxCellHeight;
          x = 50;
        }
      }

      // Call the function to create the resizable table
      createResizableTable(tableData10);

      // Set spacing for the new table
      const singleColumnWidth = 500;
      const singleCellHeight = 50;

      // Set initial position for the new table
      x = 50;

      // Data for the new table with 3 rows and 1 column
      const newTableData = [
        [
          "VULNERABILITY SUMMARY",
          "This code assumes that the original y and x variables are still in scope and represent the starting coordinates for both tables. If you have any issues or if the context is different, please make sure to adapt the code accordingly.This code assumes that the original y and x variables are still in scope and represent the starting coordinates for both tables. If you have any issues or if the context is different, please make sure to adapt the code accordingly.This code assumes that the.",
        ],
        [
          "IMPACT",
          "This code assumes that the original y and x variables are still in scope and represent the starting coordinates for both tables. If you have any issues or if the context is different, please make sure to adapt the code accordingly.This code assumes that the original y and x variables are still in scope and represent the starting coordinates for both tables. If you have any issues or if the context is different, please make sure to adapt the code accordingly.",
        ],
        [
          "RECOMMENDED SOLUTION",
          "This code assumes that the original y and x variables are still in scope and represent the starting coordinates for both tables. If you have any issues or if the context is different, please make sure to adapt the code accordingly.This code assumes that the original y and x variables are still in scope and represent the starting coordinates for both tables. If you have any issues or if the context is different, please make sure to adapt the code accordingly.",
        ],
      ];
      // Function to create a single-column table with headlines
      function createSingleColumnTableWithHeadlines(data) {
        for (let i = 0; i < data.length; i++) {
          const headline = data[i][0];
          const content = data[i][1];

          // Calculate the height of the current cell based on content
          const textHeightHeadline = doc.heightOfString(headline, {
            width: singleColumnWidth - 10,
          });
          const textHeightContent = doc.heightOfString(content, {
            width: singleColumnWidth - 10,
          });

          const cellHeight = Math.max(
            singleCellHeight,
            textHeightHeadline + textHeightContent + 20
          );

          // Check if there is enough space on the current page
          if (y + cellHeight > pageHeight) {
            // Add a new page if there is not enough space
            doc.addPage();
            // Reset Y-coordinate
            y = 50; // Adjust as needed
          }

          doc.rect(x, y, singleColumnWidth, cellHeight).stroke();

          doc.fill("black");

          // Center text vertically within the cell for headline
          const verticalPositionHeadline =
            y + (cellHeight - textHeightHeadline - textHeightContent) / 2;
          doc
            .fontSize(fontSize)
            .text(headline, x + 5, verticalPositionHeadline, {
              width: singleColumnWidth - 10,
              align: "left",
            });

          // Center text vertically within the cell for content
          const verticalPositionContent =
            verticalPositionHeadline + textHeightHeadline + 10;
          doc.fontSize(fontSize).text(content, x + 5, verticalPositionContent, {
            width: singleColumnWidth - 10,
            align: "left",
          });

          // Adjust Y-coordinate for the next row
          y += cellHeight;
        }
      }

      // Call the function to create the new single-column table with headlines
      createSingleColumnTableWithHeadlines(newTableData);

      // Add the heading "PROOF OF CONCEPT" just below the table
      const headingText = "PROOF OF CONCEPT";
      const headingHeight = 30; // Adjust as needed

      if (y + headingHeight > pageHeight) {
        // Add a new page if there is not enough space
        doc.addPage();
        // Reset Y-coordinate
        y = 50; // Adjust as needed
      }

      doc.fontSize(fontSize).text(headingText, x + 5, y + 10, {
        width: singleColumnWidth - 10,
        align: "left",
      });

      // Adjust Y-coordinate for the heading
      y += headingHeight;
      doc.moveDown();

      // // Array of dummy image URLs

      // const imagePaths = [
      //   "https://via.placeholder.com/400x200",
      //   "https://via.placeholder.com/400x200",
      // ];

      function addImagesToDocument(imagePaths, doc) {
        let y = 50; // Initial Y-coordinate
        const pageHeight = 600; // Set the page height as needed

        for (let i = 0; i < imagePaths.length; i++) {
          const imagePath = imagePaths[i];

          // Check if there is enough space on the current page for the image
          const imageHeight = 200; // Set the height of the image as needed
          if (y + imageHeight > pageHeight) {
            // Add a new page if there is not enough space
            doc.addPage();
            // Reset Y-coordinate
            y = 50; // Adjust as needed
          }

          // Convert image to a supported format (PNG or JPEG)
          const outputImagePath = `uploads/${imagePath.replace(
            /\.[^/.]+$/,
            ".png"
          )}`;
          sharp(`uploads/${imagePath}`)
            .toFormat("png")
            .toFile(outputImagePath, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              // Load the converted image from the file system
              const imageData = fs.readFileSync(outputImagePath);
              // Add the image to the document
              doc.image(imageData, x, y, { width: 400 }); // Adjust width as needed

              // Adjust Y-coordinate for the next element
              y += imageHeight + 20; // Add some spacing between images
            });
        }
      }
      const imagePaths = reports_data[i].files;

      // Call the function to add images to the document
      addImagesToDocument(imagePaths, doc);

      doc.addPage();
    }

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("9.Tools Used during Assessment & Testing:", 50, 50);
    doc.image(tool, {
      x: 50,
      y: doc.y + 30,
      width: 500, // Adjust the width as needed
    });
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("11.1. CVSS 3 Rating definition", 50, 350);
    // Add the new text
    const textCVSS3Definition =
      "In order to help standardize the risk of information technology vulnerabilities, the industry created the Common Vulnerability Scoring System, commonly referred to as CVSS. The scores range from 0 to 10 – with 10 representing the most risk. There are several things that are considered in order to assign the CVSS score including but not limited to: the degree of difficulty to exploit the vulnerability, whether the vulnerability allows for remote execution, whether there is an official fix or patch to address the vulnerability, etc. Standardized methodology to prioritize vulnerability remediation, which leverages the CVSS assigned to the vulnerability.";

    doc
      .fontSize(12) // Set the font size as needed
      .fillColor("black")
      .text(textCVSS3Definition, 50, 380);

    doc.image(table, {
      x: 50,
      y: doc.y + 30,
      width: 500, // Adjust the width as needed
    });
    doc.addPage();

    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("11.2.General guidelines", 50, 50);

    const additionalText2 =
      "                   Validate Input and Output\n\n" +
      "The input that the server receives from the user can lead to malicious code entering the server. Similarly, the output shown to the user can transmit malicious code to the client system. All user input and output should be checked to ensure it is both, appropriate and expected.  Input validation should be done on the client-side as well as on the server-side.\n\n" +
      "There are three main models to consider while designing a data validation strategy.\n\n" +
      "                  1. Accept Only Known Valid Data\n\n" +
      "A character set may be defined for each field where input from the user is accepted, e.g., “A-Z, a-z, @,., 0-9, _” is a character set for a field that accepts user email.\n" +
      "Reject Known Bad Data\n" +
      "A character set of bad data may be defined for the site that has to be rejected, e.g., “CREATE, DROP, OR”.\n\n" +
      "                  2. Sanitize Known Bad Data\n\n" +
      "A character set of bad data is defined and any input field that has such a character is modified, e.g., “If there is a single quote (‘) in the data, it is replaced with two single quotes.”\n" +
      "All methods must check:\n" +
      "        • Data Type\n" +
      "        • Syntax\n" +
      "        • Length\n\n" +
      "It is recommended to use the strategy of “Accept only known data”. Further, all the allowed input/output data must be sanitized on the server side by replacing scripts tags, sent as part of user input/output, with appropriate representations.\n" +
      "For example,\n" +
      "        • “<” by &lt;\n" +
      "        • “>” by &gt;\n" +
      "        • “(“ by &#40\n\n" +
      "This would avoid scripts from being executed on the client side.\n\n" +
      "Client-side input must also be checked for URL encoded data. URL encoding, sometimes referred to as percent encoding, is the accepted method of representing characters within a URI that may need special syntax handling to be correctly interpreted. This is achieved by encoding the character to be interpreted with a sequence of three characters. This triplet sequence consists of the percentage character “%”, followed by the two hexadecimal digits representing the octet code of the original character. For example, the US-ASCII character set represents a space with octet code 32, or hexadecimal 20. Thus, its URL-encoded representation is %20.";

    doc
      .fontSize(12) // Set the font size as needed
      .fillColor("black")
      .text(additionalText2, 50, 80);

    doc.addPage();
    doc
      .fontSize(12) // Set the font size as needed
      .fillColor("black")
      .text(
        "Other common characters that can be used for malicious purposes and their URL encoded representations are: -",
        50,
        50
      );

    doc.image(table2, {
      x: 50,
      y: doc.y + 10,
      width: 400,
      height: 130, // Adjust the width as needed
    });

    const additionalText3 =
      "All input validation checks should be completed after the data has been decoded and validated as acceptable content (e.g., maximum and minimum lengths, correct data type, does not contain any encoded data, textual data only contains the characters a-z and A-Z, etc.)\n\n" +
      "A one-time check on the database is to be made for invalid malicious data.  This would enable removal of input that has not been validated in earlier sessions. Otherwise, the invalid data may cause script execution on the user’s browser.\n\n" +
      "SESSION MANAGEMENT / STRONG SESSION TRACKING\n\n" +
      "Session Tokens on Logout\n" +
      "In shared computing environments, session tokens take on a new risk. If the session tokens are not invalidated after logout, they can be reused to gain access to the application. It is imperative for the application to remove the cookies from both the server and the client side after the user has logged out. The user session maintained on the server side must also be invalidated immediately after logout.\n\n" +
      "Session Time-out\n" +
      "All the user Session tokens must be timed-out after a certain interval of user inactivity.  The Session tokens that do not expire on the HTTP server can allow an attacker unlimited time to guess or brute force a valid authenticated session token. If a user's cookie file is captured or brute-forced, then an attacker can use these static-session tokens to gain access to that user's web accounts. Additionally, session tokens can be potentially logged and cached in proxy servers that, if broken into by an attacker, may contain similar sorts of information in logs that can be exploited if the particular session has not been expired on the HTTP server.\n\n" +
      "SESSION TOKEN TRANSMISSION\n" +
      "If a session token is captured in transit through network interception, a web application account is then trivially prone to a replay or hijacking attack. Typical web encryption technologies include Secure Sockets Layer (SSLv2/v3) and Transport Layer Security (TLS v1) protocols in order to safeguard the state mechanism token.\n\n" +
      "Some more key points to remember:";

    doc
      .fontSize(12) // Set the font size as needed
      .text(additionalText3, 50, 240);

    doc.addPage();

    const additionalText4 =
      "Session ID’s that are used should have the following properties:\n" +
      "1. Randomness\n" +
      "a. Session Ids must be randomly generated.\n" +
      "b. Session Ids must be unpredictable.\n" +
      "c. Make use of non-linear algorithms to generate session ID’s\n\n" +
      "2. Session ID Size\n" +
      "a. The size of a session ID should be large enough to ensure that it is not vulnerable to a brute force attack.\n" +
      "b. The character set used should be complex. i.e. Make use of special characters.\n" +
      "c. A length of 70 random characters is advised.\n\n" +
      "SALTED HASHING\n\n" +
      "What is salted hashing?\n\n" +
      "The process starts with 2 elements of data:\n" +
      "1.) A clear text string (this could represent a password for instance).\n" +
      "2.) The salt, a random seed of data. This is the value used to augment a hash in order to ensure that 2 hashes of identical data yield different output.\n\n" +
      "In pseudocode we generate a salted hash as follows:\n" +
      "1.) Get the source string and salt as separate binary objects\n" +
      "2.) Concatenate the 2 binary values\n" +
      "3.) SHA hash the concatenation into SaltedPasswordHash\n" +
      "4.) Base64 Encode(concat(SaltedPasswordHash, Salt))\n\n" +
      "Credentials should be encrypted using salted hashes, so that even if the hashes are sniffed the possibility of a replay attack does not exist.\n\n" +
      "References: http://www.owasp.org/images/3/33/Salted_Hashes_Demystified.doc\n\n" +
      "Cache Control Directives\n\n" +
      "Pages that contain sensitive information should not be stored in the local cache of the browser. To enforce this, HTTP directives need to be specified in the response. These HTTP directives need to be used to prevent enlisting of links on the browser history. The following HTTP directives can be sent by the server along with the response to the client. This would direct the browser to send a new request to the server each time it is generated.\n" +
      "Expires: <a previous date>, for e.g. Expires: Thu, 10 Jan 200419:20:00 GMT\n\n" +
      "Cache-Control: private\n" +
      "• Cache-Control: no-cache\n" +
      "• Cache-Control: no-store\n" +
      "• Cache-Control: must-revalidate\n" +
      "• Pragma: no-cache\n\n" +
      "The directive “Cache-Control: must-revalidate” directs the browser to fetch the pages from the server rather than picking it up from the local “Temporary Internet Folders”. It also directs the browser to remove the file from the temporary folders.";

    doc
      .fontSize(12) // Set the font size as needed
      .text(additionalText4, 50, 50); // Adjust the position as needed
    doc
      .fontSize(headerFontSize)
      .fillColor(color2)
      .text("12. G-Info Technology Solutions Contact:", 50, 120);
    const officeContactsTableData = [
      [
        "Office Contacts",
        "Phone: 1800 212 676767\nEmail: info@gisconsulting.in",
      ],
      [
        "1st Level",
        "Name: " +
          reports_data[0].employee.name +
          "\nemail: " +
          reports_data[0].employee.email +
          "\nMob: " +
          reports_data[0].employee.phone +
          "",
      ],
      [
        "2nd Level",
        "Name: Rishav Kumar\nEmail: rishav.kumar@gisconsulting.in\nMob: +91 70046 52649",
      ],
      [
        "3rd Level",
        "Name: Naveen Dham\nEmail: naveen.dham@gisconsulting.in\nMob: +91-9810976838",
      ],
    ];

    // Set font size and cell sizes
    // const fontSize = 12;
    const columnWidth = 250; // Width for each column
    const cellHeightt = 50;

    // Set initial position and spacing
    x = 50; // X position
    y = 150;
    for (let i = 0; i < officeContactsTableData.length; i++) {
      for (let j = 0; j < officeContactsTableData[i].length; j++) {
        // Draw cell border
        doc.rect(x, y, columnWidth, cellHeightt).stroke();

        doc
          .fontSize(fontSize)
          .fillColor("black")
          .text(
            officeContactsTableData[i][j],
            x + 5,
            y + 5,
            { width: columnWidth - 10 },
            { width: columnWidth, align: "left" }
          );

        x += columnWidth; // Move to the next column
      }
      x = 50; // Reset the X position for the next row
      y += cellHeightt; // Move to the next row
    }
    doc.end();
  }, delay);
};

const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({
      title: "Error",
      message: errors.array(),
      isError: true,
    });
  }
  // console.log(req.body);
  const project = new Project({
    projectName: req.body.projectName,
    companyName: req.body.companyName,
    clientName: req.body.clientName,
    clientEmail: req.body.clientEmail,
    projectPriority: req.body.projectPriority,
    manager: req.body.manager,
    client: req.body.client,
    submissionDate: req.body.submissionDate,
  });

  const notification = new Notification({
    notification: `New project ${req.body.projectName} is created`,
    employee: req.body.client,
    link: `/clienttasks/${project._id}`,
  });
  await notification.save();

  const client = await Employee.findById(req.body.client).exec();
  // return console.log(req.body.client, client);
  client.clientProjects.push(project._id);
  client.notifications.push(notification._id);
  await client.save();
  const manager = await Employee.findById(req.body.manager).exec();
  manager.managerProjects.push(project._id);
  await manager.save();
  project
    .save()
    .then(() => {
      console.log("Project  save to db!");
      return res.status(200).send({
        title: "Success",
        message: "project created sucessfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
};

const actionProject = async (req, res) => {
  const { id, action } = req.body;
  try {
    const project = await Project.findById(id).exec();
    if (!project) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This project is not registered ",
      });
    }
    if (action === "approve") {
      project.isApproved = true;
    } else {
      project.isApproved = false;
    }
    project
      .save()
      .then(() => {
        console.log("Project  save to db!");
        return res.status(200).send({
          title: "Success",
          message: "project created sucessfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          isError: true,
          title: "Error",
          message: err,
        });
      });
  } catch (error) {
    return res.status(500);
  }
};

const submitProject = async (req, res) => {
  const { pid } = req.body;

  const file_fields = {
    filename: req.file.filename,
    contentType: req.file.mimetype,
    data: fs.readFileSync(req.file.path),
  };
  const files = [];
  files.push(file_fields);

  const submitProject = new SubmitProject({
    project: pid,
    files: files,
    employee: req.user._id,
  });
  await submitProject.save();
  await Project.findByIdAndUpdate(
    pid,
    { $push: { submitProject: submitProject._id } },
    { new: true }
  );

  fs.unlinkSync(req.file.path);
  res.status(200).send({
    title: "Success",
    message: "project created sucessfully",
  });
};

const getProject = async (req, res) => {
  const { id } = req.body;
  try {
    const project = await Project.findById(id).exec();
    if (!project) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This project is not registered ",
      });
    }
    return res.status(200).send({
      title: "Success",
      message: "project get sucessfully",
      data: project,
    });
  } catch (error) {
    return res.status(500);
  }
};

const getAllProject = async (req, res) => {
  try {
    // based on lates
    const project = await Project.find({ manager: req.user._id }).sort({
      createdAt: -1,
    });
    //console.log(project);
    if (!project) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This project is not registered ",
      });
    }
    return res.status(200).send({
      title: "Success",
      message: "project get sucessfully",
      data: project,
    });
  } catch (error) {
    return res.status(500);
  }
};

const getAllProjectbypM = async (req, res) => {
  const id = req.body.id;
  try {
    // based on lates
    const project = await Project.find({ manager: id }).sort({
      createdAt: -1,
    });
    // console.log(project);
    if (!project) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This project is not registered ",
      });
    }
    return res.status(200).send({
      title: "Success",
      message: "project get sucessfully",
      data: project,
    });
  } catch (error) {
    return res.status(500);
  }
};

const createTask = async (req, res) => {
  const selectedOptions = JSON.parse(req.body.selectedOptions);

  var taskLoady = {
    project: req.body.project,
    selectedOptions: selectedOptions,
    taskName: req.body.taskname,
  };

  var file1;
  if (req.files["apiselectedFile"]) {
    file1 = req.files["apiselectedFile"][0];
  }

  var file2;
  if (req.files["networkselectedFile"]) {
    file2 = req.files["networkselectedFile"][0];
  }
  if (Array.isArray(selectedOptions)) {
    for (var t = 0; t < selectedOptions.length; t++) {
      if (selectedOptions[t] === "web") {
        taskLoady.webData = {
          webtargetUrls: JSON.parse(req.body.webtargetUrls),
          webotherRemarks: req.body["webotherRemarks"],
        };
      }
      if (selectedOptions[t] === "api") {
        taskLoady.apiData = {
          apifile: file1.filename,
          apiotherRemarks: req.body["apiotherRemarks"],
        };
      }
      if (selectedOptions[t] === "network") {
        taskLoady["networkData"] = {
          networkfileUpload: file2.filename,
          networkotherRemarks: req.body["networkotherRemarks"],
        };
      }
      if (selectedOptions[t] === "mobile") {
        taskLoady.mobileData = {
          android: req.body["mobile_anoride_link"],
          ios: req.body["ios_link"],
          mobileotherRemarks: req.body["mobileotherRemarks"],
        };
      }
      if (selectedOptions[t] === "grc") {
        taskLoady.grcData = {
          grcotherRemarks: req.body["grcotherRemarks"],
        };
      }
    }
  }

  // return console.log(taskLoady);
  const task = new Task(taskLoady);
  //console.log(task);

  await Project.findByIdAndUpdate(
    req.body.project,
    { $push: { task: task._id } },
    { new: true }
  );

  //console.log(task);
  task
    .save()
    .then(() => {
      console.log("Task  save to db!");
      return res.status(200).send({
        title: "Success",
        message: "task created sucessfully",
      });
    })
    .catch((err) => {
      // console.log(err);
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
};

const getTask = async (req, res) => {
  const { id } = req.body;

  try {
    const task = await Task.findById(id).exec();

    if (!task) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This project is not registered ",
      });
    }

    return res.status(200).send({
      title: "Success",
      message: "project get sucessfully",
      data: task,
    });
  } catch (error) {
    return res.status(500);
  }
};

const updateTask = async (req, res) => {
  const { id, status } = req.body;

  try {
    const task = await Task.findById(id).exec();

    if (!task) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This project is not registered ",
      });
    }

    task.isCompleted = status; // Update the isCompleted field
    await task.save();
    return res.status(200).send({
      title: "Success",
      message: "Update  sucessfully",
    });
  } catch (error) {
    return res.status(500);
  }
};

const getTaskByProject = async (req, res) => {
  const { project } = req.body;
  //console.log(project);
  try {
    const task = await Task.find({ project: project });
    console.log(task);
    if (!task) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This project is not registered ",
      });
    }

    return res.status(200).send({
      title: "Success",
      message: "project get sucessfully",
      task: task,
    });
  } catch (error) {
    return res.status(500);
  }
};

const creatReport = async (req, res) => {
  const payload = req.body;
  // console.log(payload);

  const images = req.files.map((f) => f.filename);

  const task = await Task.findById(payload.taskID).exec();
  const report = new Report({
    project: task.project,
    employee: payload.employee,
    task: payload.taskID,
    reportFiles: images,
  });
  if (req.body.type === "web") {
    // find in webData webtargetUrls._id in task
    for (var i = 0; i < task.webData.webtargetUrls.length; i++) {
      if (
        req.body.webtargetUrlsId ===
        task.webData.webtargetUrls[i]._id.toString()
      ) {
        // find employee in it
        for (
          var j = 0;
          j < task.webData.webtargetUrls[i].assignEmployee.length;
          j++
        ) {
          if (
            req.body.employee ===
            task.webData.webtargetUrls[i].assignEmployee[j].employee.toString()
          ) {
            task.webData.webtargetUrls[i].assignEmployee[j].report.push(
              report._id
            );
          }
        }
      }
    }
  } else if (req.body.type === "network") {
    for (var i = 0; i < task.networkData.assignEmployee.length; i++) {
      if (
        req.body.employee ===
        task.networkData.assignEmployee[i].employee.toString()
      ) {
        task.networkData.assignEmployee[i].report.push(report._id);
      }
    }
  } else if (req.body.type === "api") {
    for (var i = 0; i < task.apiData.assignEmployee.length; i++) {
      if (
        req.body.employee === task.apiData.assignEmployee[i].employee.toString()
      ) {
        task.apiData.assignEmployee[i].report.push(report._id);
      }
    }
  } else if (req.body.type === "android") {
    for (var i = 0; i < task.mobileData.forAndroid.assignEmployee.length; i++) {
      if (
        req.body.employee ===
        task.mobileData.forAndroid.assignEmployee[i].employee.toString()
      ) {
        task.mobileData.forAndroid.assignEmployee[i].report.push(report._id);
      }
    }
  } else if (req.body.type === "ios") {
    for (var i = 0; i < task.mobileData.forIos.assignEmployee.length; i++) {
      if (
        req.body.employee ===
        task.mobileData.forIos.assignEmployee[i].employee.toString()
      ) {
        task.mobileData.forIos.assignEmployee[i].report.push(report._id);
      }
    }
  } else if (req.body.type === "grc") {
    for (var i = 0; i < task.grcData.assignEmployee.length; i++) {
      if (
        req.body.employee === task.grcData.assignEmployee[i].employee.toString()
      ) {
        task.grcData.assignEmployee[i].report.push(report._id);
      }
    }
  }
  const project = await Project.findOne({ _id: task.project }).exec();

  const notification = new Notification({
    notification: `New Report Created for ${task.project}`,
    employee: project.manager,
    link: "pdf/" + report._id,
  });
  await notification.save();
  const manager = await Employee.findOne({ _id: project.manager }).exec();
  manager.notifications.push(notification._id);
  await manager.save();
  await task.save();

  report
    .save()
    .then(() => {
      console.log("Report  save to db!");
      return res.status(200).send({
        title: "Success",
        reportId: report._id,
        message: "Report created sucessfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
};

const createReportWeb = async (req, res) => {
  console.log(req.body);
  // return;
  const payload = req.body;
  const images = req.files.map((f) => f.filename);

  const task = await Task.findById(payload.taskID).exec();

  const report = new Report({
    project: task.project,
    employee: payload.employee,
    task: payload.taskID,
    reportFiles: images,
    vulnerability: payload.vulnerability,
    risk: payload.risk,
    affectedUrl: payload.affectedUrl,
    observation: payload.observation,
    attributingFactor: payload.attributingFactor,
    cwe: payload.cwe,
    impact: payload.impact,
    mitigation: payload.mitigation,
    brief: payload.brief,
    files: images,
  });
  for (var i = 0; i < task.webData.webtargetUrls.length; i++) {
    if (
      req.body.webtargetUrlsId === task.webData.webtargetUrls[i]._id.toString()
    ) {
      // find employee in it
      for (
        var j = 0;
        j < task.webData.webtargetUrls[i].assignEmployee.length;
        j++
      ) {
        if (
          req.body.employee ===
          task.webData.webtargetUrls[i].assignEmployee[j].employee.toString()
        ) {
          task.webData.webtargetUrls[i].assignEmployee[j].report.push(
            report._id
          );
        }
      }
    }
  }

  const project = await Project.findOne({ _id: task.project }).exec();

  const notification = new Notification({
    notification: `New Report Created for ${task.project}`,
    employee: project.manager,
    link: "pdf/" + report._id,
  });
  await notification.save();
  const manager = await Employee.findOne({ _id: project.manager }).exec();
  manager.notifications.push(notification._id);
  await manager.save();
  await task.save();

  report
    .save()
    .then(() => {
      console.log("Report  save to db!");
      return res.status(200).send({
        title: "Success",
        reportId: report._id,
        message: "Report created sucessfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
};
const addRemark = async (req, res) => {
  const { id, remark } = req.body;
  try {
    const report = await Report.findById(id).exec();
    if (!report) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This report is not registered ",
      });
    }
    const user = await Employee.findById(req.user._id).exec();
    // console.log(user.role === "Employee");
    if (user.role === "Employee") {
      const project = await Project.findById(report.project).exec();
      const manager = await Employee.findById(project.manager).exec();
      const notification = new Notification({
        notification: `${user.name} has added remark to ${report._id}`,
        employee: manager._id,
        link: "pdf/" + report._id,
      });
      await notification.save();
      manager.notifications.push(notification._id);
      await manager.save();
    } else {
      const user1 = await Employee.findById(report.employee);
      const notification = new Notification({
        notification: "Manager has added remark to " + report._id,
        employee: user1._id,
        link: "viewproject" + report.task,
      });

      await notification.save();
      user1.notifications.push(notification._id);
      await user1.save();
    }

    const r = {
      user: req.user._id,
      remark: remark,
      date: Date.now(),
    };
    report.remarks.push(r);
    report
      .save()
      .then(() => {
        return res.status(200).send({
          title: "Success",
          message: "Report created sucessfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          isError: true,
          title: "Error",
          message: err,
        });
      });
  } catch (error) {
    return res.status(500);
  }
};

const editReport = async (req, res) => {
  const { id } = req.body;
  const payload = req.body;
  // if not files images

  const report = await Report.findById(id).exec();
  var images;
  if (req.files.length < 1) {
    images = report.files;
  } else {
    images = req.files.map((f) => f.filename);
  }
  payload.files = images;
  if (!report) {
    return res.status(208).send({
      isError: true,
      title: "Error",

      message: "This report is not registered ",
    });
  }

  report.vulnerability = payload.vulnerability;
  report.risk = payload.risk;
  report.affectedUrl = payload.affectedUrl;
  report.observation = payload.observation;
  report.attributingFactor = payload.attributingFactor;

  report.cwe = payload.cwe;
  report.impact = payload.impact;
  report.mitigation = payload.mitigation;
  report.brief = payload.brief;
  report.files = images;
  report
    .save()
    .then(() => {
      console.log("Report  save to db!");
      return res.status(200).send({
        title: "Success",
        message: "Report created sucessfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
};

const getReport = async (req, res) => {
  const { id } = req.body;
  try {
    const report = await Report.findById(id).exec();
    if (!report) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This report is not registered ",
      });
    }
    return res.status(200).send({
      title: "Success",
      message: "project get sucessfully",
      data: report,
    });
  } catch (error) {
    return res.status(500);
  }
};
const complteReport = async (req, res) => {
  const { id } = req.body;

  try {
    const report = await Report.findById(id).exec();
    const notification = new Notification({
      notification: "Report is completed by manager",
      employee: report.employee,
      link: "/pdf/" + report._id,
    });
    notification.save();
    const employee = await Employee.findById(report.employee).exec();
    employee.notifications.push(notification._id);
    employee.save();

    report.isCompleted = true;
    report
      .save()
      .then(() => {
        console.log("Report  save to db!");
        return res
          .status(200)
          .send({ title: "Success", message: "Report created sucessfully" });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ isError: true, title: "Error", message: err });
      });
  } catch (error) {
    return res.status(500);
  }
};

const assignEmployee = async (req, res) => {
  const { taskid, employee, selectedOption } = req.body;
  const assignEmployee = employee.map((e) => {
    return {
      employee: e,
      report: [],
    };
  });
  const task = await Task.findById(taskid).exec();
  if (selectedOption === "web") {
    // find in webData webtargetUrls._id in task
    for (var i = 0; i < task.webData.webtargetUrls.length; i++) {
      if (
        task.webData.webtargetUrls[i]._id.toString() === req.body.webtargetUrls
      ) {
        // if employee already exist then not push

        if (
          task.webData.webtargetUrls[i].assignEmployee.indexOf(
            assignEmployee
          ) === -1
        ) {
          // if employee already exist then not push

          task.webData.webtargetUrls[i].assignEmployee.push(...assignEmployee);
        }
      }
    }
  }
  if (selectedOption === "api") {
    if (task.apiData.assignEmployee.indexOf(assignEmployee) === -1) {
      task.apiData.assignEmployee.push(...assignEmployee);
    }
  }
  if (selectedOption === "network") {
    if (task.networkData.assignEmployee.indexOf(assignEmployee) === -1) {
      task.networkData.assignEmployee.push(...assignEmployee);
    }
  }

  if (req.body.selectedOption === "android") {
    if (
      task.mobileData.forAndroid.assignEmployee.indexOf(assignEmployee) === -1
    ) {
      task.mobileData.forAndroid.assignEmployee.push(...assignEmployee);
    }
  }
  if (req.body.selectedOption === "ios") {
    if (task.mobileData.forIos.assignEmployee.indexOf(assignEmployee) === -1) {
      task.mobileData.forIos.assignEmployee.push(...assignEmployee);
    }
  }

  if (selectedOption === "grc") {
    if (task.grcData.assignEmployee.indexOf(assignEmployee)) {
      task.grcData.assignEmployee.push(...assignEmployee);
    }
  }
  await task.save();
  // push tasks in employee in employeeProjects in tasks is array

  for (var i = 0; i < employee.length; i++) {
    const employeeData = await Employee.findById(employee[i]).exec();

    //  findin employeeProjects
    var ttask = {
      taskid: taskid,
      selectedOption: {
        name: selectedOption,
      },
      assignedDate: new Date().toISOString(),
    };
    var link;
    if (selectedOption === "web") {
      ttask.selectedOption.webtargetUrls = req.body.webtargetUrls;
      link = `/taskview/${taskid}/${selectedOption}/${req.body.webtargetUrls}`;
    } else {
      link = `/taskview/${taskid}/${selectedOption}/undefined`;
    }
    const notification = new Notification({
      notification: `New task ${req.body.projectName} is assigned to you`,
      employee: employee[i],
      link: link,
    });
    await notification.save();
    employeeData.tasks.push(ttask);
    employeeData.notifications.push(notification._id);
    await employeeData.save();
  }

  return res.status(200).send({
    title: "Success",
    message: "project get sucessfully",
    data: task,
  });
};

const getReportsByUser = async (req, res) => {
  const taskId = req.body.taskId;
  const type = req.body.type;
  //  const url = req.body.webtargetUrls;
  // return console.log(taskId, type, url);
  var reports = [];
  if (type === "web") {
    //console.log("ssg");
    const task = await Task.findById(taskId)
      .populate("webData.webtargetUrls.assignEmployee.employee")
      .populate("webData.webtargetUrls.assignEmployee.report");
    // return console.log(task);
    for (var i = 0; i < task.webData.webtargetUrls.length; i++) {
      if (
        task.webData.webtargetUrls[i]._id.toString() === req.body.webtargetUrls
      ) {
        for (
          var j = 0;
          j < task.webData.webtargetUrls[i].assignEmployee.length;
          j++
        ) {
          if (
            task.webData.webtargetUrls[i].assignEmployee[
              j
            ].employee._id.toString() === req.user._id.toString()
          ) {
            reports = task.webData.webtargetUrls[i].assignEmployee[j].report;
          }
        }
      }
    }
  } else if (req.body.type === "network") {
    const task = await Task.findById(taskId)
      .populate("networkData.assignEmployee.employee")
      .populate("networkData.assignEmployee.report");
    for (var i = 0; i < task.networkData.assignEmployee.length; i++) {
      if (
        task.networkData.assignEmployee[i].employee.id.toString() ===
        req.user._id.toString()
      ) {
        reports = task.networkData.assignEmployee[i].report;
      }
    }
  } else if (req.body.type === "api") {
    const task = await Task.findById(taskId)
      .populate("apiData.assignEmployee.employee")
      .populate("apiData.assignEmployee.report");
    for (var i = 0; i < task.apiData.assignEmployee.length; i++) {
      if (
        task.apiData.assignEmployee[i].employee._id.toString() ===
        req.user._id.toString()
      ) {
        reports = task.apiData.assignEmployee[i].report;
      }
    }
  } else if (req.body.type === "android") {
    const task = await Task.findById(taskId)
      .populate("mobileData.forAndroid.assignEmployee.employee")
      .populate("mobileData.forAndroid.assignEmployee.report");
    // console.log(task);
    for (var i = 0; i < task.mobileData.forAndroid.assignEmployee.length; i++) {
      if (
        task.mobileData.forAndroid.assignEmployee[i].employee._id.toString() ===
        req.user._id.toString()
      ) {
        reports = task.mobileData.forAndroid.assignEmployee[i].report;
      }
    }
  } else if (req.body.type === "ios") {
    const task = await Task.findById(taskId)
      .populate("mobileData.forIos.assignEmployee.employee")
      .populate("mobileData.forIos.assignEmployee.report");

    for (var i = 0; i < task.mobileData.forIos.assignEmployee.length; i++) {
      if (
        task.mobileData.forIos.assignEmployee[i].employee._id.toString() ===
        req.user._id.toString()
      ) {
        reports = task.mobileData.forIos.assignEmployee[i].report;
      }
    }
  } else if (req.body.type === "grc") {
    const task = await Task.findById(taskId)
      .populate("grcData.assignEmployee.employee")
      .populate("grcData.assignEmployee.report");
    for (var i = 0; i < task.grcData.assignEmployee.length; i++) {
      if (
        task.grcData.assignEmployee[i].id.toString() === req.user._id.toString()
      ) {
        reports = task.grcData.assignEmployee[i].report;
      }
    }
  }
  // console.log(reports);
  return res.status(200).send({
    title: "Success",
    message: "project get sucessfully",
    data: reports,
  });
};

const getReportsByUserId = async (req, res) => {
  const taskId = req.body.taskId;
  const type = req.body.type;
  const userId = req.body.userId;

  //console.log(req.body);
  var reports = [];
  if (type === "web") {
    const task = await Task.findById(taskId)
      .populate("webData.webtargetUrls.assignEmployee.employee")
      .populate("webData.webtargetUrls.assignEmployee.report");

    // console.log(task);

    for (var i = 0; i < task.webData.webtargetUrls.length; i++) {
      if (
        task.webData.webtargetUrls[i]._id.toString() === req.body.webtargetUrls
      ) {
        for (
          var j = 0;
          j < task.webData.webtargetUrls[i].assignEmployee.length;
          j++
        ) {
          if (
            task.webData.webtargetUrls[i].assignEmployee[
              j
            ].employee._id.toString() === userId.toString()
          ) {
            reports = task.webData.webtargetUrls[i].assignEmployee[j].report;
          }
        }
      }
    }
  } else if (req.body.type === "network") {
    const task = await Task.findById(taskId)
      .populate("networkData.assignEmployee.employee")
      .populate("networkData.assignEmployee.report");
    for (var i = 0; i < task.networkData.assignEmployee.length; i++) {
      if (
        task.networkData.assignEmployee[i].employee.id.toString() ===
        userId.toString()
      ) {
        reports = task.networkData.assignEmployee[i].report;
      }
    }
  } else if (req.body.type === "api") {
    const task = await Task.findById(taskId)
      .populate("apiData.assignEmployee.employee")
      .populate("apiData.assignEmployee.report");
    for (var i = 0; i < task.apiData.assignEmployee.length; i++) {
      if (
        task.apiData.assignEmployee[i].employee._id.toString() ===
        userId.toString()
      ) {
        reports = task.apiData.assignEmployee[i].report;
      }
    }
  } else if (req.body.type === "android") {
    const task = await Task.findById(taskId)
      .populate("mobileData.forAndroid.assignEmployee.employee")
      .populate("mobileData.forAndroid.assignEmployee.report");
    for (var i = 0; i < task.mobileData.forAndroid.assignEmployee.length; i++) {
      if (
        task.mobileData.forAndroid.assignEmployee[i].employee._id.toString() ===
        userId.toString()
      ) {
        reports = task.mobileData.forAndroid.assignEmployee[i].report;
      }
    }
  } else if (req.body.type === "ios") {
    const task = await Task.findById(taskId)
      .populate("mobileData.forIos.assignEmployee.employee")
      .populate("mobileData.forIos.assignEmployee.report");

    for (var i = 0; i < task.mobileData.forIos.assignEmployee.length; i++) {
      if (
        task.mobileData.forIos.assignEmployee[i].employee._id.toString() ===
        userId.toString()
      ) {
        reports = task.mobileData.forIos.assignEmployee[i].report;
      }
    }
  } else if (req.body.type === "grc") {
    const task = await Task.findById(taskId)
      .populate("grcData.assignEmployee.employee")
      .populate("grcData.assignEmployee.report");
    for (var i = 0; i < task.grcData.assignEmployee.length; i++) {
      if (task.grcData.assignEmployee[i].id.toString() === userId.toString()) {
        reports = task.grcData.assignEmployee[i].report;
      }
    }
  }
  return res.status(200).send({
    title: "Success",
    message: "project get sucessfully",
    data: reports,
  });
};

const getAllReportsByUserId = async (req, res) => {
  const userId = req.body.userId;
  const numberOfReports = await Report.find({ employee: userId }).count();

  res.status(200).send({
    title: "Success",
    message: "project get sucessfully",
    data: numberOfReports,
  });
};

const getAllReportOfManager = async (req, res) => {
  const id = req.user._id;
  const projects = await Project.find({ manager: id });

  var reports = [];

  for (var i = 0; i < projects.length; i++) {
    var r = await Report.find({ project: projects[i] });
    reports.push(r);
  }

  return res.status(200).send({
    title: "Success",
    message: "project get sucessfully",
    data: reports,
  });
};

const getReportsByTaskId = async (req, res) => {
  const taskId = req.body.taskId;
  const type = req.body.type;

  var reports = [];
  if (type === "web") {
    const task = await Task.findById(taskId)
      .populate("webData.webtargetUrls.assignEmployee.employee")
      .populate("webData.webtargetUrls.assignEmployee.report");

    // console.log(task);

    for (var i = 0; i < task.webData.webtargetUrls.length; i++) {
      if (
        task.webData.webtargetUrls[i]._id.toString() === req.body.webtargetUrls
      ) {
        for (
          var j = 0;
          j < task.webData.webtargetUrls[i].assignEmployee.length;
          j++
        ) {
          for (
            var k = 0;
            k < task.webData.webtargetUrls[i].assignEmployee[j].report.length;
            k++
          ) {
            if (
              task.webData.webtargetUrls[i].assignEmployee[j].report[k]
                .isCompleted
            ) {
              reports.push(
                task.webData.webtargetUrls[i].assignEmployee[j].report[k]
              );
            }
          }
        }
      }
    }
  } else if (req.body.type === "network") {
    const task = await Task.findById(taskId)
      .populate("networkData.assignEmployee.employee")
      .populate("networkData.assignEmployee.report");
    for (var i = 0; i < task.networkData.assignEmployee.length; i++) {
      for (
        var k = 0;
        k < task.networkData.assignEmployee[i].report.length;
        k++
      ) {
        if (task.networkData.assignEmployee[i].report[k].isCompleted) {
          reports.push(task.networkData.assignEmployee[i].report[k]);
        }
      }
    }
  } else if (req.body.type === "api") {
    const task = await Task.findById(taskId)
      .populate("apiData.assignEmployee.employee")
      .populate("apiData.assignEmployee.report");
    for (var i = 0; i < task.apiData.assignEmployee.length; i++) {
      for (var k = 0; k < task.apiData.assignEmployee[i].report.length; k++) {
        if (task.apiData.assignEmployee[i].report[k].isCompleted) {
          reports.push(task.apiData.assignEmployee[i].report[k]);
        }
      }
    }
  } else if (req.body.type === "android") {
    const task = await Task.findById(taskId)
      .populate("mobileData.forAndroid.assignEmployee.employee")
      .populate("mobileData.forAndroid.assignEmployee.report");
    for (var i = 0; i < task.mobileData.forAndroid.assignEmployee.length; i++) {
      for (
        var k = 0;
        k < task.mobileData.forAndroid.assignEmployee[i].report.length;
        k++
      ) {
        if (
          task.mobileData.forAndroid.assignEmployee[i].report[k].isCompleted
        ) {
          reports.push(task.mobileData.forAndroid.assignEmployee[i].report[k]);
        }
      }
    }
  } else if (req.body.type === "ios") {
    const task = await Task.findById(taskId)
      .populate("mobileData.forIos.assignEmployee.employee")
      .populate("mobileData.forIos.assignEmployee.report");

    for (var i = 0; i < task.mobileData.forIos.assignEmployee.length; i++) {
      for (
        var k = 0;
        k < task.mobileData.forIos.assignEmployee[i].report.length;
        k++
      ) {
        if (task.mobileData.forIos.assignEmployee[i].report[k].isCompleted) {
          reports.push(task.mobileData.forIos.assignEmployee[i].report[k]);
        }
      }
    }
  } else if (req.body.type === "grc") {
    const task = await Task.findById(taskId)
      .populate("grcData.assignEmployee.employee")
      .populate("grcData.assignEmployee.report");
    for (var i = 0; i < task.grcData.assignEmployee.length; i++) {
      for (var k = 0; k < task.grcData.assignEmployee[i].report.length; k++) {
        if (task.grcData.assignEmployee[i].report[k].isCompleted) {
          reports.push(task.grcData.assignEmployee[i].report[k]);
        }
      }
    }
  }
  return res.status(200).send({
    title: "Success",
    message: "project get sucessfully",
    data: reports,
  });
};

const taskComplete = async (req, res) => {
  const taskId = req.body.taskId;
  const type = req.body.type;
  // console.log(taskId, type);
  const task = await Task.findById(taskId);
  if (type === "web") {
    task.webData.isCompleted = true;
  } else if (type === "network") {
    task.networkData.isCompleted = true;
  } else if (type === "api") {
    task.apiData.isCompleted = true;
  } else if (type === "mobile") {
    task.mobileData.isCompleted = true;
  }
  // else if (type === "ios") {
  //   task.mobileData.forIos.isCompleted = true;
  // }
  else if (type === "grc") {
    task.grcData.isCompleted = true;
  }
  const project = await Project.findById(task.project);
  const notification = new Notification({
    notification: "Task Completed",
    employee: project.client,
    link: "/allreportforclient/" + task._id + "/" + type,
  });
  await notification.save();

  const client = await Employee.findById(project.client);
  client.notifications.push(notification._id);
  await client.save();

  await task.save();
  res.send({
    title: "Success",
    message: "task completed sucessfully",
    data: task,
  });
};
const getReportDataByProject = async (req, res) => {
  const taskId = req.body.taskId;
  const task = await Task.findById(taskId);
  const reports = [];
  for (var i = 0; i < task.webData.webtargetUrls.length; i++) {
    for (
      var k = 0;
      k < task.webData.webtargetUrls[i].assignEmployee.length;
      k++
    ) {
      for (
        var j = 0;
        j < task.webData.webtargetUrls[i].assignEmployee[k].report.length;
        j++
      ) {
        reports.push(task.webData.webtargetUrls[i].assignEmployee[k].report[j]);
      }
    }
  }
  for (var i = 0; i < task.networkData.assignEmployee.length; i++) {
    for (var k = 0; k < task.networkData.assignEmployee[i].report.length; k++) {
      reports.push(task.networkData.assignEmployee[i].report[k]);
    }
  }
  for (var i = 0; i < task.apiData.assignEmployee.length; i++) {
    for (var k = 0; k < task.apiData.assignEmployee[i].report.length; k++) {
      reports.push(task.apiData.assignEmployee[i].report[k]);
    }
  }

  for (var i = 0; i < task.mobileData.forAndroid.assignEmployee.length; i++) {
    for (
      var k = 0;
      k < task.mobileData.forAndroid.assignEmployee[i].report.length;
      k++
    ) {
      reports.push(task.mobileData.forAndroid.assignEmployee[i].report[k]);
    }
  }

  for (var i = 0; i < task.mobileData.forIos.assignEmployee.length; i++) {
    for (
      var k = 0;
      k < task.mobileData.forIos.assignEmployee[i].report.length;
      k++
    ) {
      reports.push(task.mobileData.forIos.assignEmployee[i].report[k]);
    }
  }

  for (var i = 0; i < task.grcData.assignEmployee.length; i++) {
    for (var k = 0; k < task.grcData.assignEmployee[i].report.length; k++) {
      reports.push(task.grcData.assignEmployee[i].report[k]);
    }
  }
  var low = 0,
    medium = 0,
    high = 0,
    critical = 0;
  for (var i = 0; i < reports.length; i++) {
    const r = await Report.findById(reports[i]._id);
    if (r.risk === "low") {
      low++;
    } else if (r.risk === "medium") {
      medium++;
    } else if (r.risk === "high") {
      high++;
    } else if (r.risk === "critical") {
      critical++;
    }
  }

  return res.status(200).send({
    title: "Success",
    critical: critical,
    low: low,
    medium: medium,
    high: high,
    message: "project get sucessfully",
  });
};

const projectComplete = async (req, res) => {
  const projectId = req.body.projectId;
  const project = await Project.findById(projectId);
  const status = req.body.status;
  //return console.log(projectId, status);
  project.isCompleted = status;

  await project.save();
  res.send({
    title: "Success",
    message: "project completed sucessfully",
    data: project,
  });
};

const getNotifications = async (req, res) => {
  const employeeId = req.body.employeeId;
  const employee = await Employee.findById(employeeId).populate(
    "notifications"
  );
  var notification = [];
  if (employee.notifications) {
    notification = employee.notifications;
  }
  res.send({
    title: "Success",
    message: "notifications get sucessfully",
    data: notification,
  });
};

const actionNotification = async (req, res) => {
  const notificationId = req.body.notificationId;
  const notification = await Notification.findById(notificationId);
  notification.isRead = true;
  await notification.save();
  res.send({
    title: "Success",
    message: "notifications get sucessfully",
    data: notification,
  });
};

const someMoreDetails = async (req, res) => {
  // get count of project and complete number of projects
  const numberOfProjects = await Project.find({}).count();
  const numberOfReport = await Report.find({}).count();
  const numberOfCompletedProjects = await Project.find({
    isCompleted: true,
  }).count();

  res.send({
    title: "Success",
    message: "notifications get sucessfully",
    numberOfProjects: numberOfProjects,
    numberOfCompletedProjects: numberOfCompletedProjects,
    numberOfReport: numberOfReport,
  });
};

const uploadExcelTemplate = async (req, res) => {
  try {
    console.log("i am backend");
    // Assuming the file is sent in the request with the key 'file'
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Handle the file as needed (save to disk, process, etc.)
    // For now, just log it to the console
    console.log("File is - ", uploadedFile);
    // save in database

    const user = await Employee.findById(req.user._id).exec();

    if (user && user.role === "Client") {
      user.excelFile = {
        filename: uploadedFile.filename,
        path: uploadedFile.path,
      };
    }
    await user.save();

    // Do further processing or save the file to disk/database

    // Respond to the client
    res.status(200).json({ message: "File uploaded successfully" });
    // toast.success("File uploaded..")
  } catch (error) {
    console.error("Error uploading file", error);
    res.status(500).json({ error: "Error uploading file" });
  }
};

// const downloadExcelTemplate = async (req, res) => {
//   try {
//     console.log("backend download called");

//     console.log("id is - ", req.user._id);
//     // return
//     const employee = await Employee.findById(req.user._id).exec();

//     if (!employee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }

//     // Assuming the file path is stored in employee.excelFile.path
//     const filePath = employee.excelFile.path;

//     // Set the appropriate headers for download
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=downloaded-file.xlsx"
//     );

//     // Send the file to the client
//     res.download(filePath, "downloaded-file.xlsx", (err) => {
//       if (err) {
//         console.error("Error downloading file:", err);
//         res.status(500).json({ error: "Error downloading file" });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling download request:", error);
//     res.status(500).json({ error: "Error handling download request" });
//   }
// };

const downloadExcelTemplate = async (req, res) => {
  try {
    console.log("backend download called");

    // Ensure req.user is defined and has the _id property
    if (!req.user || !req.user._id) {
      console.error("Unauthorized: User or user ID not found");
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log(req.user._id);

    // Fetch the employee data using the logged-in user's ID
    const employeeId = req.user._id; // Assuming the user's ID is available in req.user
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      console.error("Employee not found");
      return res.status(404).json({ error: "Employee not found" });
    }
    console.log("here I am");

    // Assuming the file path is stored in employee.excelFile.path
    const filePath = employee.excelFile.path;

    console.log("path is  - ", filePath);

    // Set the appropriate headers for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=downloaded-file.xlsx"
    );

    // Create a readable stream from the file
    const fileStream = fs.createReadStream(filePath);

    // Pipe the file stream to the response stream
    fileStream.pipe(res);

    // Log when the download is complete
    fileStream.on("end", () => {
      console.log("File download completed");
    });

    // Handle any errors during streaming
    fileStream.on("error", (error) => {
      console.error("Error streaming file:", error);
      res.status(500).json({ error: "Error streaming file" });
    });
  } catch (error) {
    console.error("Error handling download request:", error);
    // Check if the response is still writable before sending an error response
    if (!res.writableEnded) {
      res.status(500).json({ error: "Error handling download request" });
    }
  }
};

export {
  createProject,
  actionProject,
  downloadReportById,
  pdfview,
  submitProject,
  createTask,
  getProject,
  getAllProject,
  getTask,
  creatReport,
  addRemark,
  editReport,
  getReport,
  getAllReportsByUserId,
  complteReport,
  assignEmployee,
  getTaskByProject,
  getReportsByUser,
  getReportsByUserId,
  getAllReportOfManager,
  getReportsByTaskId,
  taskComplete,
  getReportDataByProject,
  projectComplete,
  getNotifications,
  actionNotification,
  updateTask,
  someMoreDetails,
  getAllProjectbypM,
  createReportWeb,
  uploadExcelTemplate,
  downloadExcelTemplate,
};
