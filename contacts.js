const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() { 
    try { 
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        console.table(contacts);
    
    }  catch (error) {
        throw error;
    }
};

async function getContactById(contactId) { 
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const contact = contacts.find(item => item.id === Number(contactId));
        console.table(contact);
    } catch (error) { 
        throw error;
    }
}


module.exports = {
    listContacts,
    getContactById,
}