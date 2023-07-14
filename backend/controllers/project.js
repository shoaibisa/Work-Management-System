import { validationResult } from "express-validator";
import Project from "../models/project.js";
import Task from "../models/task.js";
import SubmitProject from "../models/submitproject.js";
import fs from "fs";
import mongoose from "mongoose";

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

const createTask = async (req, res) => {
  const TaskData = req.body;
  const filteredData = filterEmptyData(TaskData);
  // console.log(filteredData);
  // Check if there is any data to save
  if (isEmpty(filteredData)) {
    console.log("No data to save.");
    return;
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({
      title: "Error",
      message: errors.array(),
      isError: true,
    });
  }
  const task = new Task(filteredData);
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

export { createProject, actionProject, submitProject, createTask };
