let test = require("./testUser");
let { User } = require("./models/user");
const mongoose = require("mongoose");

const users = [
  {
    email: "jkowal@email.com",
    firstName: "Jan",
    lastName: "Kowalski",
    phone:"123-456-789",
    zip_code:"00-001",
    address:"Poczta Warszawa 001, ul. Świętokrzyska 31/33",
    home_no:"33a",
    city:"Warszawa"
  },
  {
    email: "mnowak@gmail.com",
    firstName: "Michał",
    lastName: "Nowak",
    phone:"(+48) 123 456 789",
    zip_code:"00-021",
    // address:"ul. Świętokrzyska 35/313",
    // home_no:"313c",
    city:"Warszawa"
  }
];

// use case : create connection, erease all data, create 2 groups and add to them users
const createDB = async users => {
  await test.removeAll();
  let _users = await test.createUsers(users);
  return _users;
};

testUsers();
async function testUsers() {
  let res=await createDB(users);
  // let res = await test.getUsers(["mnowak@gmail.com"]);
  console.log(res);
}
