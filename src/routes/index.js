const { Router } = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const projectRouter = require("./projectRouter");
const firebaseRouter = require("./firebaseRouter");

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/firebase", firebaseRouter);

module.exports = router;
