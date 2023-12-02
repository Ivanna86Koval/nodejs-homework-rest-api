// contacts.js

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts", "db", "contacts.json");

const updateListContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const contactDate = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const listContacts = async () => {
  const contacts = await contactDate();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await contactDate();
  const result = contact.find((item) => item.id === contactId);
  return result || console.log("not found");
};

const removeContact = async (contactId) => {
  const contacts = await contactDate();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateListContact(contacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await contactDate();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateListContact(contacts);
  return newContact;
};

const updateListContactById = async (contactId, data) => {
  const contacts = await contactDate();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateListContact(contacts);
  return contacts[index];
};

export default {
  contactDate,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateListContact,
  updateListContactById,
};
