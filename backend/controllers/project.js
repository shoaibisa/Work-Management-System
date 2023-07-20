import { validationResult } from "express-validator";
import Project from "../models/project.js";
import Task from "../models/task.js";
import SubmitProject from "../models/report.js";
import Report from "../models/report.js";
import fs from "fs";

const createProject = async (req, res) => {
  const projectData = req.body;
  // console.log(req.body.apiData.apifile);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({
      title: "Error",
      message: errors.array(),
      isError: true,
    });
  }
  const project = new Project(projectData);
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

// Function to filter out empty data
const filterEmptyData = (data) => {
  const filteredData = { ...data };

  // Recursive function to filter nested objects and arrays
  const filterEmpty = (obj) => {
    for (const key in obj) {
      const value = obj[key];

      // Check for empty strings and arrays
      if (value === "" || (Array.isArray(value) && value.length === 0)) {
        delete obj[key];
      }

      // Recursively filter nested objects and arrays
      if (typeof value === "object" && value !== null) {
        filterEmpty(value);
      }
    }
  };

  filterEmpty(filteredData);
  return filteredData;
};

// Function to check if an object is empty
const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
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
  // return console.log(req.user);
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
    console.log("no");
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
  // based on the role of the employee, we will get the project
  //console.log(req.user._id);
  try {
    const project = await Project.find({ manager: req.user._id }).exec();
    //   console.log(project);
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
  const taskLoady = {
    project: req.body.project,
    selectedOption: req.body.selectedOptions,
    mobileData: req.body.mobileData,
    grcData: req.body.grcData,
  };
  // return console.log(req.body);
  for (var t = 0; t < req.body.selectedOptions.length; t++) {
    if (req.body.selectedOptions[t] === "web") {
      taskLoady.webData = {
        webfileUpload: req.body["webData.webfileUpload"],
        webotherRemarks: req.body["webData.webotherRemarks"],
      };
    }
    if (req.body.selectedOptions[t] === "network") {
      taskLoady.networkData = {
        networkfileUpload: req.body["networkData.networkfileUpload"],
        networkotherRemarks: req.body["networkData.networkotherRemarks"],
      };
    }
    if (req.body.selectedOptions[t] === "api") {
      var file_fields = {};
      if (req.files) {
        file_fields = {
          filename: req.file.filename,
          contentType: req.file.mimetype,
          data: fs.readFileSync(req.file.path),
        };
      }
      taskLoady["apiData"] = {
        apifile: file_fields,
        apiotherRemarks: req.body["apiData.apiotherRemarks"],
      };
    }
  }

  const task = new Task(taskLoady);
  await Project.findByIdAndUpdate(
    req.body.project,
    { $push: { task: task._id } },
    { new: true }
  );

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
    if (task.apiData.apifile) {
      res.header("Content-Type", task.apiData.apifile.contentType);
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
const creatReport = async (req, res) => {
  const payload = req.body;
  //  images
  const images = req.files.map((f) => f.filename);
  payload.files = images;
  const report = new Report(payload);
  const task = await Task.findById(payload.task).exec();
  task.assignEmployee.push({
    employee: payload.employee,
    report: report._id,
  });
  await task.save();

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
    report.remarks.push(remark);
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
  } catch (error) {
    return res.status(500);
  }
};

const editReport = async (req, res) => {
  const { id } = req.body;
  const payload = req.body;
  //  images
  const images = req.files.map((f) => f.filename);
  payload.files = images;
  const report = await Report.findById(id).exec();
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
  report.files = payload.files;
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
    report.isCompleted = true;
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
  } catch (error) {
    return res.status(500);
  }
};

export {
  createProject,
  actionProject,
  submitProject,
  createTask,
  getProject,
  getAllProject,
  getTask,
  creatReport,
  addRemark,
  editReport,
  getReport,
  complteReport,
};
