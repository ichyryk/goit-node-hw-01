const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

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
};

async function removeContact(contactId) { 
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const updatedContacts = contacts.filter(({ id }) => id !== Number(contactId));

        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
        console.table(updatedContacts);
    } catch (error) { 
        throw error;
    }
};

async function addContact(name, email, phone) { 
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const newContact = {
            id: v4(),
            name,
            email,
            phone,
        };
        const updatedContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
        console.log(`New contact with name ${name}, email ${email}, phone ${phone} was added`);
        console.table(updatedContacts);
    } catch (error) { 
        throw error;
    }
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};