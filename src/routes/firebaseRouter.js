const { Router } = require("express");
const FirebaseController = require("../controllers/firebaseController");
const router = new Router();

router.get("/", FirebaseController.updateData);
router.get("/cards", FirebaseController.getCards);
router.get("/user", FirebaseController.claimUserRoles);

module.exports = router;
