const TaskController = require("../controller/taskController")
const router  = require("express").Router()

router.get("/", TaskController.all);
router.get("/add", TaskController.add);
router.get("/addTaskLogic", TaskController.addTaskLogic);
router.get("/single/:id", TaskController.single);
router.get("/del/:id", TaskController.del);
router.get("/delAll", TaskController.delAll);
router.get("/edit/:id", TaskController.edit);
router.get("/editTaskLogic/:id", TaskController.editTaskLogic);
router.get("/status/:id", TaskController.status);
router.get("/search/", TaskController.search)
module.exports = router