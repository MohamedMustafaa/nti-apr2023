const userModel = require("../../database/models/user.model")
const Helper = require("../helper")
class User {
  static register = async (req, res) => {
    try {
      //console.log("test");
      const userData = new userModel(req.body);
      await userData.save();
      Helper.resHandler(res, 200, true, userData, "user add successful");
    } catch (e) {
      Helper.resHandler(res, 500, false, e, "error adding data");
    }
  };

  static all = async (req, res) => {
    try {
      //console.log("test222");
      const userData = await userModel.find();
      Helper.resHandler(res, 200, true, userData, "users featched");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error featch data");
    }
  };

  // static single = async (req, res) => {
  //   try {
  //     //console.log("test");
  //     const userData = await userModel.findById(req.params.id);
  //     Helper.resHandler(res, 200, true, userData, "users featched");
  //   } catch (e) {
  //     Helper.resHandler(res, 500, false, e.message, "Error featch data");
  //   }
  // };

  // static del = async (req, res) => {
  //   try {
  //     //console.log("test");
  //     const userData = await userModel.findByIdAndDelete(req.params.id);
  //     Helper.resHandler(res, 200, true, userData, "users featched");
  //   } catch (e) {
  //     Helper.resHandler(res, 500, false, e.message, "Error featch data");
  //   }
  // };

  // static delAll = async (req, res) => {
  //   try {
  //     //console.log("test");
  //     const userData = await userModel.deleteMany();
  //     Helper.resHandler(res, 200, true, userData, "users featched");
  //   } catch (e) {
  //     Helper.resHandler(res, 500, false, e.message, "Error featch data");
  //   }
  // };

  static login = async (req, res) => {
    try {
      //console.log(req.body);
      const userData = await userModel.loginMe(
        req.body.email,
        req.body.password
      );
      //token part
      const token = await userData.generateToken(); // time 9:40AM in video S13
      Helper.resHandler(res, 200, true, { userData, token }, "done");
    } catch (e) {
      Helper.resHandler(res, 500, false, e, e.message);
    }
  };

  // static activate = async (req, res) => {
  //   try {
  //     const userData = await userModel.findById(req.params.id);
  //     userData.status = true;
  //     await userData.save();
  //     Helper.resHandler(res, 500, true, userData, "users fetched");
  //   } catch (e) {
  //     Helper.resHandler(res, 500, false, e, e.message);
  //   }
  // };

  // static profile = async (req, res) => {
  //   Helper.resHandler(res, 200, true, req.user, "fdxd");
  // };

  static logOut = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      Helper.resHandler(res, 200, true, {}, "logged out");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "error fetch data");
    }
  };
  
  static updatePimg = async (req, res) => {
    try {
      // const fs = require("fs")
      // const ext = req.file.originalname.split(".").pop()
      // const newName = req.file.path+"."+ext
      // fs.renameSync(req.file.path, newName)
      const ext = Helper.fileHandler(req);
      req.user.image = `${process.env.APPUrl}${req.file.filename}.${ext}`;
      await req.user.save();
      Helper.resHandler(res, 200, true, req.user, "done");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error featch data");
    }
  };

  // static logOutAll = async (req, res) => {
  //   try {
  //     req.user.tokens = [];
  //     await req.user.save();
  //     Helper.resHandler(res, 200, true, req.user, "logged out");
  //   } catch (e) {
  //     Helper.resHandler(res, 500, false, e.message, "error fetch data");
  //   }
  // };
}
module.exports = User