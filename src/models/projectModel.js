const { db, bucket } = require("../db");
const { Timestamp } = require("firebase-admin/firestore");
const { getProjectPropreties } = require("../utils/files");

class ProjectModel {
  async createProject(images, bodyProperties) {
    try {
      const docRef = db.collection("projects").doc();
      const projectPropreties = getProjectPropreties(
        images,
        bodyProperties,
        docRef.id
      );

      const newDocument = docRef.create({
        ...projectPropreties,
        createdAt: Timestamp.now(),
      });

      return await Promise.all([
        ...projectPropreties.imagesRefs.map(async (ref, index) => {
          await bucket.file(ref).save(images[index].data, { resumable: false });
        }),
        await newDocument,
      ]);
    } catch (err) {
      return err;
    }
  }

  async updateProject(images, properties, id) {
    try {
      const projectPropreties = getProjectPropreties(images, properties, id);

      const query = db.collection("projects").where("projectId", "==", id);
      const querySnapshot = await query.get();
      const { projectId, createdAt } = querySnapshot.docs[0].data();

      await db
        .collection("projects")
        .doc(projectId)
        .set({ ...projectPropreties, createdAt, updatedAt: Timestamp.now() });

      return await Promise.all([
        ...projectPropreties.imagesRefs.map(async (ref, index) => {
          await bucket.file(ref).save(images[index].data, { resumable: false });
        }),
      ]);
    } catch (err) {
      return err;
    }
  }

  async deleteProject(id) {
    try {
      const query = db.collection("projects").where("projectId", "==", id);
      const querySnapshot = await query.get();
      const project = querySnapshot.docs[0].data();
      const deletePromises = [];
      project.imagesRefs.forEach((filePath) => {
        deletePromises.push(bucket.file(filePath).delete());
      });
      deletePromises.push(
        db.collection("projects").doc(project.projectId).delete()
      );
      return await Promise.all(deletePromises);
    } catch (err) {
      return err;
    }
  }

  async getAllProjects() {
    try {
      const projects = [];
      const projectsQuery = await db.collection("projects").get();
      projectsQuery.forEach((queryDocument) =>
        projects.push(queryDocument.data())
      );

      return projects;
    } catch (err) {
      return err;
    }
  }

  async getProject(id) {
    try {
      const query = db.collection("projects").where("projectId", "==", id);
      const querySnapshot = await query.get();
      const project = querySnapshot.docs[0].data();

      return project;
    } catch (err) {
      return err;
    }
  }
}

module.exports = new ProjectModel();
