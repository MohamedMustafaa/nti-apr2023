const deal = require("./dealWithJson");
const userHeads = ["id", "name", "age", "email"]

const createObj = (data) => {
  const userData = {};
  userHeads.forEach((h) => {
    if (h == "id") userData[h] = Date.now();
    else userData[h] = data[h];
  });
  return userData;
};
class User {
  static addUser = (argv) => {
    const userData = createObj(argv);
    const data = deal.readJsonData("data.json");
    data.push(userData);
    deal.writeJsonData("data.json", data);
  };

  static showAll = () => {
    const allUsers = deal.readJsonData("data.json");
    if (!allUsers.length) {
      console.log("No users yet");
      return;
    }
    allUsers.forEach((u, ind) => {
      console.log(`${ind + 1} - ${u.name} - ${u.id} - ${u.email}`);
    });
  };

  static showSingle = (argv) => {
    const allUsers = deal.readJsonData("data.json");
    const singleUser = allUsers.find(u => u.id == argv.id);
    if (!singleUser) console.log("no user with this id");
    else console.log(singleUser);
  };

  //start-task-two
  
  static deleteAll = () =>{
    const allUsers = deal.readJsonData("data.json");
    allUsers.splice(0,allUsers.length)
    deal.writeJsonData("data.json", allUsers);
  }

  static deleteElement = (argv)=>{
    const allUsers = deal.readJsonData("data.json");
    allUsers.forEach((e,i) =>{
      if(e.id == argv.id){
        console.log(allUsers[i].age);
        delete allUsers[i].age;
        deal.writeJsonData("data.json", allUsers);
      }
    })
  }

  static editUser = (argv) =>{
    const userData = createObj(argv);
    const allUsers = deal.readJsonData("data.json");
    allUsers.forEach((e,i)=> {
      if(e.id == argv.id){
        allUsers[i] = userData
        return allUsers[i]
      }
    })
    deal.writeJsonData("data.json", allUsers);
  }
}
module.exports = User;