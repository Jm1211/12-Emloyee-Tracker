const db = require("../db/connection")
const cTable = require('console.table');
const inquirer = require("inquirer");

const startInquirer = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "toDo",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments ",
                "Add an Employee",
                "Add a Role",
                "Add a Department",
                "Update an Employee Role",
                "Exit"
            ]
        }
    ])
}