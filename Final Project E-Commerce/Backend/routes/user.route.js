const router = require("express").Router()
const userController = require("../app/controller/user.controller")
const auth = require("../app/middleware/auth.middleware")

router.get("/", userController.all);
// router.get("/single/:id", userController.single);
// router.delete("/del/:id", userController.del);
// router.delete("/delAll", userController.delAll);
// router.patch("/activate/:id", userController.activate);
// router.get("/me", auth, userController.profile)

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout",auth, userController.logOut);
//router.post("/logoutall", auth, userController.logOutAll);

router.patch('/updatePimg', auth, upload.single("img"), userController.updatePimg)

module.exports = router;
