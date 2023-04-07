const deal = require("../helper/dealWithJson");
const fileName = "models/tasks.json"

class Task {
  static addTaskLogic = (req, res) => {
    const allTasks = deal.readJsonData(fileName);
    const newTask = { id: Date.now(), ...req.query };
    allTasks.push(newTask);
    deal.writeJsonData(fileName, allTasks);
    res.redirect("/");
  };

  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add Task",
    });
  };

  // "/"
  static all = (req, res) => {
    const allTasks = deal.readJsonData(fileName);
    res.render("all", {
      pageTitle: "All Data",
      allTasks,
      hasData: allTasks.length,
    });
  };

  static single = (req, res) => {
    const allTasks = deal.readJsonData(fileName);
    const id = req.params.id;
    const task = allTasks.find(u => u.id == id);
    res.render("single", {
      pageTitle: "Single Data",
      task,
    });
  };

  static del = (req, res) => {
    let allTasks = deal.readJsonData(fileName);
    const id = req.params.id;
    const index = allTasks.findIndex(u => u.id == id);
    allTasks.splice(index, 1);
    deal.writeJsonData(fileName, allTasks);
    res.redirect("/");
  };

  static delAll = (req, res) => {
    deal.writeJsonData(fileName, []);
    res.redirect("/");
  };

  static edit = (req, res) => {
    const allTasks = deal.readJsonData(fileName);
    const id = req.params.id;
    const task = allTasks.find(u => u.id == id);
    res.render("edit", {
      pageTitle: "Edit Data",
      task,
    });
  };

  static editTaskLogic = (req, res) => {
    const allTasks = deal.readJsonData(fileName);
    const id = req.params.id;
    const index = allTasks.findIndex(u => u.id == id);
    allTasks[index] = { id, ...req.query };
    deal.writeJsonData(fileName, allTasks);
    res.redirect(`/single/${id}`);
  };

  static status = (req, res)=> {
    const allTasks = deal.readJsonData(fileName)
    const id = req.params.id
    const index = allTasks.findIndex(u => u.id == id);
    if (allTasks[index].status == "InActive"){
      allTasks[index].status = "Active"
      deal.writeJsonData(fileName, allTasks)
      res.redirect("/")
    }
  }

  static search = (req, res)=> {
    const allTasks = deal.readJsonData(fileName);
    const search = req.query.search
    const task = allTasks.find(u => u.title == search || u.content == search)
    res.render("single", {
      pageTitle: "Search Data",
      task
    });
  }
}
module.exports = Task