const contacts = require("./contacts");
// console.log(contacts.listContacts());

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return await contacts.listContacts();
    
    case "get":
      return await contacts.getContactById(id);
    
    case "remove":
      return await contacts.removeContact(id);
    
    case "add":
      return await contacts.addContact(name, email, phone);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

