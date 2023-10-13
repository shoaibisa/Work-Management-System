import { validationResult } from "express-validator";
import Project from "../models/project.js";
import Task from "../models/task.js";
import SubmitProject from "../models/report.js";
import Report from "../models/report.js";
import fs from "fs";
import Employee from "../models/employee.js";
import Notification from "../models/notification.js";
import pdfkit from "pdfkit";
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
    //console.log(report);
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

const pdfview = (req, res) => {
  const doc = new pdfkit();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="dynamic.pdf"');
  doc.pipe(res);
  // from here
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
  doc.fontSize(10).text("(Empanelment no.: 3(15)/2004-CERT-In)", doc.x, doc.y);
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
  doc
    .fontSize(10)
    .text(corporateOfficeText.split("\n").slice(1).join("\n"), { width: 250 });

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

  // Draw the header text
  // Define your header text
  const headerText = "1. Document Control";

  // Set font size for the header
  const headerFontSize = 16;
  console.log(doc.y);
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
  let y = 50; // Y position

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
        doc.rect(x, y, firstColumnWidth, cellHeight).fill(firstColumnFillColor);
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
        doc.rect(x, y, cellWidth, cellHeighttable2).fill(firstColumnFillColor);
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
        doc.rect(x, y, cellWidth, cellHeighttable3).fill(firstColumnFillColor);
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
        doc.rect(x, y, cellWidth, cellHeighttable4).fill(firstColumnFillColor);
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
  const tableOfContentsY = 50; // Y position

  // Draw the table of contents
  doc
    .fontSize(tableOfContentsFontSize)
    .text(tableOfContentsText, tableOfContentsX, tableOfContentsY, {
      width: 500,
    });

  doc.end();
};

export {
  createProject,
  actionProject,
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
};
