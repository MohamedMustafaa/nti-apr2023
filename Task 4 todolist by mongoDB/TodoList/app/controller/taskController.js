const deal = require("../helper/dealWithJson");
const connectDb = require("../../models/dbConnect")
const ObjectId = require("mongodb").ObjectId
const fileName = "models/tasks.json"

class Task {
  static addTaskLogic = (req, res) => {
    try {
      connectDb(async(db)=>{
        await db.collection("tasks").insertOne(req.query)
        res.redirect("/")
      })
    }
    catch (e) {
      res.send(e)
    }
  };

  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add Task",
    });
  };

  // "/"
  static all = (req, res) => {
    try {
      connectDb(async(db)=>{
        const allTasks = await db.collection("tasks").find().toArray()
        res.render("all", {
          pageTitle: "All Data",
          allTasks,
          hasData: allTasks.length,
        });
      })
    } catch (e) {
      res.send(e)
    }
  };

  static single = (req, res) => {
    try {
      connectDb(async (db) => {
        const task = await db.collection("tasks").findOne({
          id: new ObjectId(req.params.id),
        });
        res.render("single", {
          pageTitle: "Single Data",
          task,
        });
      })
    } catch (e) {
      res.send(e)
    }
  };

  static del = (req, res) => {
    try {
      connectDb(async (db) =>
          await db.collection("tasks").deleteOne({
          id: new ObjectId(req.params.id)})
        );
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };

  static delAll = (req, res) => {
    try {
      connectDb(async (db) => await db.collection("tasks").remove())
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };

  static edit = (req, res) => {
    try {
      connectDb(async (db) => {
        const task = await db.collection("tasks").findOne({
          id: new ObjectId(req.params.id),
        });
        res.render("edit", {
          pageTitle: "Edit Data",
          task,
        });
      })
    } catch (e) {
      res.send(e);
    }
  };

  static editTaskLogic = (req, res) => {
    try {
      connectDb(async (db) => {
        await db.collection("tasks").updateOne(
          {id: new ObjectId(req.params.id)},
          {$set: req.query } //...
        );
        res.redirect(`/single/${id}`);
      })
    } catch (e) {
      res.send(e);
    }
  };

  static status = (req, res)=> {
    try {
      connectDb(async (db) => {
        await db.collection("tasks").updateOne(
          { id: new ObjectId(req.params.id) },
          { $set:  {status: "Active"} }
          );
      })
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  }

  static search = (req, res)=> {
    try {
      connectDb(async (db) => {
        const search = req.query.search
        const task = await db.collection("tasks").find({
          $or: [{ title: { $regex: search } }, { content: { $regex: search } }].toArray()
        });
        res.render("single", {
          pageTitle: "Search Data",
          task,
        });
      })
    } catch (e) {
      res.send(e);
    }
  }
}
module.exports = Task