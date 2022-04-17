const inquirer = require("inquirer");
const cTable = require("console.table");
const Query = require("./query");
const queries = new Query();

const mainMenu = () => {
  inquirer
    .prompt([
      {
        name: "mainOptions",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all Roles",
          "View all employees",
          "Add a Department",
          "Add a Role",
          "Add an employee",
          "Update employee's role",
          "Exit",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.menu) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all Roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee's role":
          updateRole();
          break;
        case "Exit":
          console.log("Have a great Day!");
        default:
          console.log("Upps!...Something went wrong!");
      }
    });
};
