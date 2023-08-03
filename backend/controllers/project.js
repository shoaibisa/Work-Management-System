import { validationResult } from "express-validator";
import Project from "../models/project.js";
import Task from "../models/task.js";
import SubmitProject from "../models/report.js";
import Report from "../models/report.js";
import fs from "fs";
import Employee from "../models/employee.js";

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
  const selectedOptions = JSON.parse(req.body.selectedOptions);

  var taskLoady = {
    project: req.body.project,
    selectedOptions: selectedOptions,
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
      console.log(err);
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
};

const getTask = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
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
const getTaskByProject = async (req, res) => {
  const { project } = req.body;
  try {
    const task = await Task.find({ project: project }).exec();
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
  //  images
  return console.log(req.body);

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
        task.webData.webtargetUrls[i].assignEmployee.push(...assignEmployee);
      }
    }
  }
  if (selectedOption === "api") {
    task.apiData.assignEmployee.push(...assignEmployee);
  }
  if (selectedOption === "network") {
    task.networkData.assignEmployee.push(...assignEmployee);
  }

  if (req.body.selectedOption === "android") {
    task.mobileData.forAndroid.assignEmployee.push(...assignEmployee);
  }
  if (req.body.selectedOption === "ios") {
    task.mobileData.forIos.assignEmployee.push(...assignEmployee);
  }

  if (selectedOption === "grc") {
    task.grcData.assignEmployee.push(...assignEmployee);
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
    };
    if (selectedOption === "web") {
      ttask.selectedOption.webtargetUrls = req.body.webtargetUrls;
    }
    employeeData.tasks.push(ttask);
    await employeeData.save();
  }

  return res.status(200).send({
    title: "Success",
    message: "project get sucessfully",
    data: task,
  });
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
  assignEmployee,
  getTaskByProject,
};
