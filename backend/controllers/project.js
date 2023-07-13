import { validationResult } from "express-validator";
import Project from "../models/project.js";

const createProject = async (req, res) => {
  const projectData = req.body;
  console.log(req.body.apiData.apifile);
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

export { createProject, actionProject };
