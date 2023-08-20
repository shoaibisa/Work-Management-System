import { validationResult } from "express-validator";
import Project from "../models/project.js";
import Task from "../models/task.js";
import SubmitProject from "../models/report.js";
import Report from "../models/report.js";
import fs from "fs";
import Employee from "../models/employee.js";

const createProject = async (req, res) => {
  const projectData = req.body;
  console.log(projectData);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({
      title: "Error",
      message: errors.array(),
      isError: true,
    });
  }
  const project = new Project({
    projectName: req.body.projectName,
    companyName: req.body.companyName,
    clientName: req.body.clientName,
    clientEmail: req.body.client,
    projectPriority: req.body.projectPriority,
    manager: req.body.manager,
    submissionDate: req.body.submissionDate,
  });
  const client = await Employee.findById(req.body.client).exec();
  client.clientProjects.push(project._id);
  await client.save();
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
    const r = {
      user: req.user._id,
      remark: remark,
      date: Date.now(),
    };
    report.remarks.push(r);
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
  // if not files images

  const report = await Report.findById(id).exec();
  var images;
  if (!req.files) {
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
    //console.log(report);
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

const getReportsByUser = async (req, res) => {
  const taskId = req.body.taskId;
  const type = req.body.type;
  // const url = req.body.webtargetUrls;
  // console.log(taskId, type, url);
  var reports = [];
  if (type === "web") {
    const task = await Task.findById(taskId)
      .populate("webData.webtargetUrls.assignEmployee.employee")
      .populate("webData.webtargetUrls.assignEmployee.report");

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
        ki++
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
  const task = await Task.findById(taskId);
  if (type === "web") {
    task.webData.isCompleted = true;
  } else if (type === "network") {
    task.networkData.isCompleted = true;
  } else if (type === "api") {
    task.apiData.isCompleted = true;
  } else if (type === "android") {
    task.mobileData.forAndroid.isCompleted = true;
  } else if (type === "ios") {
    task.mobileData.forIos.isCompleted = true;
  } else if (type === "grc") {
    task.grcData.isCompleted = true;
  }

  await task.save();
  res.send({
    title: "Success",
    message: "task completed sucessfully",
    data: task,
  });
};
const getReportDataByProject = async (req, res) => {
  const taskId = req.body.taskId;
  const task = await Project.findById(taskId);
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
    if (reports[i].risk === "low") {
      low++;
    } else if (reports[i].risk === "medium") {
      medium++;
    } else if (reports[i].risk === "high") {
      high++;
    } else if (reports[i].risk === "critical") {
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
  getReportsByUser,
  getReportsByUserId,
  getAllReportOfManager,
  getReportsByTaskId,
  taskComplete,
  getReportDataByProject,
};
