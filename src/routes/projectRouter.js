const { Router } = require("express");
const ProjectController = require("../controllers/projectController");
const router = new Router();

router.post("/", ProjectController.create);
router.put("/", ProjectController.update);
router.delete("/", ProjectController.delete);
router.get("/", ProjectController.getAll);
router.get("/:id", ProjectController.getOne);

module.exports = router;
