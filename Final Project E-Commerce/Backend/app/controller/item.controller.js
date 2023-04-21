const itemModel = require("../../database/models/item.model");
const Helper = require("../helper");

class Item {
  static createItem = async (req, res) => {
    try {
      const newItem = await itemModel(req.body);
      await newItem.save();
      Helper.resHandler(res, 200, true, newItem, "items created");
    } catch (e) {
      Helper.resHandler(res, 404, false, e.message, "error in createdItem");
    }
  };

  static AllItems = async (req, res) => {
    try {
      const items = await itemModel.find();
      Helper.resHandler(res, 200, true, items, "items found");
    } catch (e) {
      Helper.resHandler(res, 404, false, e, "something went wrong");
    }
  };

  static itemsID = async (req, res) => {
    try {
      const id = req.params.id;
      const item = await itemModel.findById({ _id: id });
      Helper.resHandler(res, 200, true, item, "items found");
    } catch (e) {
      Helper.resHandler(res, 404, false, e, "error in itemsID");
    }
  };

  static updateItem = async (req, res) => {
    try {
      const item = await itemModel.findById(req.params.id);
      for (let key in req.body) {
        item[key] = req.body[key];
      }
      await item.save();
      Helper.resHandler(res, 200, true, item, "updateItem");
    } catch (e) {
      Helper.resHandler(res, 404, false, e, "error in updateItem");
    }
  };

  static del = async (req, res) => {
    try {
      //console.log("test");
      const itemData = await itemModel.findByIdAndDelete(req.params.id);
      Helper.resHandler(res, 200, true, itemData, "users featched");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error featch data");
    }
  };

  static delAll = async (req, res) => {
    try {
      //console.log("test");
      const itemData = await itemModel.deleteMany();
      Helper.resHandler(res, 200, true, itemData, "users featched");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error featch data");
    }
  };

}

module.exports = Item;
