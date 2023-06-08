const ProjectModel = require("../models/projectModel");
const { getImages } = require("../utils/files");

class ProjectsController {
  async create(req, res) {
    try {
      const images = getImages(req.files);
      await ProjectModel.createProject(images, req.body);
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  async update(req, res) {
    try {
      const images = getImages(req.files);
      await ProjectModel.updateProject(images, req.body, req.body.projectId);
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  async delete(req, res) {
    try {
      await ProjectModel.deleteProject(req.body.projectId);
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  async getAll(req, res) {
    try {
      const allProjects = await ProjectModel.getAllProjects();
      return res.status(200).json(allProjects);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  async getOne(req, res) {
    try {
      const project = await ProjectModel.getProject(req.params.projectId); // Was modified from req.params.id => req.params.projectId
      return res.status(200).json(project);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = new ProjectsController();
