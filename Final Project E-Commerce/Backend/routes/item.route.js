const router = require("express").Router();
const itemController = require("../app/controller/item.controller");
const auth = require("../app/middleware/auth.middleware");
const upload = require("../app/middleware/upload.middleware");


router.post("/items", itemController.createItem);
router.get("/allItems", itemController.AllItems);
router.get("/findItems/:id", auth, itemController.itemsID);
router.patch("/editItems/:id", auth, itemController.updateItem);

router.delete("/del/:id", auth, itemController.del);
router.delete("/delAll", auth, itemController.delAll);



module.exports = router;
