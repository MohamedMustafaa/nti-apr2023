const deal = require('./modules/dealWithJson')
const user = require("./modules/users")
const yargs = require("yargs")
yargs.command({
  command: "addUser",
  builder: {
    name: {demandOption :true},
    age: {demandOption :true},
    email: {demandOption :true}
  },
  handler: (argv)=>{
    user.addUser(argv);
  }
})

yargs.command({
  command: "showAll",
  handler: () => user.showAll(),
});

yargs.command({
  command: "showSingle",
  builder: {
    id: { demandOption: true },
  },
  handler: (argv) => user.showSingle(argv),
});

yargs.command({
  command: "deleteAll",
  handler: () => user.deleteAll(),
});

yargs.command({
  command: "deleteElement",
  builder: {
    id: { demandOption: true },
  },
  handler: (argv) => user.deleteElement(argv),
});

yargs.command({
  command: "editUser",
  builder: {
    id: { demandOption: true },
    // name: { demandOption: true },
    age: { demandOption: true },
    // email: { demandOption: true },
  },
  handler: (argv) => user.editUser(argv),
});

yargs.argv