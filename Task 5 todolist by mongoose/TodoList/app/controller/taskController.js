const deal = require("../helper/dealWithJson");
const taskModel = require("../../db/models/task.model")
const fileName = "models/tasks.json"

class Task {
  static addTaskLogic = async (req, res) => {
    try {
      const data = new taskModel(req.query);
      await data.save();
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };

  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add Task",
    });
  };

  // "/"
  static all = async (req, res) => {
    try {
      const allTasks = await taskModel.find();
      res.render("all", {
        pageTitle: "All Data",
        allTasks,
        hasData: allTasks.length,
      });
    } catch (e) {
      res.send(e.message);
    }
  };

  static single = async (req, res) => {
    try {
      const data = await taskModel.findById(req.params.id);
      res.render("single", {
        pageTitle: "Single Data",
        data,
      });
    } catch (e) {
      res.send(e);
    }
  };

  static del = async (req, res) => {
    try {
      await taskModel.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };

  static delAll = async (req, res) => {
    try {
      await taskModel.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };

  static edit = async(req, res) => {
    try {
      const data = await taskModel.findById(req.params.id);
        res.render("edit", {
          pageTitle: "Edit Data",
          data,
        });
    } catch (e) {
      res.send(e);
    }
  };

  static editTaskLogic = async(req, res) => {
    try {
        await taskModel.findByIdAndUpdate(req.params.id, req.query);
        res.redirect(`/single/${req.params.id}`);
    } catch (e) {
      res.send(e);
    }
  };

  static status = async(req, res) => {
    try {
      await taskModel.findByIdAndUpdate(req.params.id, { $set: { status: true } })
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };

  static search = async(req, res) => {
    try {
        const search = req.query.search;
        const data = await taskModel.find({
          $or: [
            { title: { $regex: search } },
            { content: { $regex: search } }
          ]
        });
        res.render("single", {
          pageTitle: "Search Data",
          data,
        });
    } catch (e) {
      res.send(e.message);
    }
  };
}
module.exports = Task