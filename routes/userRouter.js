let express = require("express");
const router = express.Router();
let User = require("../models/userModel");

const userController = require("../controllers/userController");
router.post("/register", userController.register);
router.post("/login", userController.login);
// router.use("/profile", userController.profile);

router.get("/registrationform", userController.registrationform);
router.get("/loginform", userController.loginform);

// // Route for updating a user
router.put("/update/:email", userController.update);

// // Route for deleting a user
// router.delete("/delete", userController.delete);

module.exports = router;
