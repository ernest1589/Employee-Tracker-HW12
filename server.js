const inquirer = require("inquirer");
const cTable = require("console.table");
const Query = require("./query");

const mainMenu = () => {
  inquirer
    .prompt({
      name: "menu",
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
    })
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
          addDepartmentInq();
          break;
        case "Add a Role":
          addRoleInq();
          break;
        case "Add an employee":
          addEmployeeInq();
          break;
        case "Update employee's role":
          updateRoleInq();
          break;
        case "Exit":
          console.log("Have a great Day!");
          break;
        default:
          console.log("Upps!...Something went wrong!");
      }
    });
};

const addDepartmentInq = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of this new Department?",
      name: "department_name",
    })
    .then((answers) => {
      addDepartment(answers.department_name);
    });
};

const addRoleInq = () => {
  Query.selectDepartment().then((data) => {
    const deptChoice = data[0];

    inquirer
      .prompt(
        {
          type: "input",
          message: "What is the new Role name?",
          name: "role_name",
        },
        {
          type: "input",
          message: "What is the salary of this new Role?",
          name: "role_salary",
        },
        {
          type: "list",
          message: "Choose the department this role belongs to:",
          name: "role_department",
          choices: deptChoice,
        }
      )
      .then((answers) => {
        addRole(
          answers.role_name,
          answers.role_salary,
          answers.role_department
        );
      });
  });
};

const addEmployeeInq = () => {
  Query.selectRole().then((data) => {
    const roleChoice = data[0];

    Query.selectManager().then((data) => {
      const any = {
        name: "No Manager",
        value: null,
      };

      data[0].unshift(any);
      const managerChoice = data[0];

      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the new employee's First Name?",
            name: "First_name",
          },
          {
            type: "input",
            message: "What is the new empoleey's Last Name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "Please choose the new emnployee's Role:",
            name: "employee_role",
            choices: roleChoice,
          },
          {
            type: "list",
            message: "Who will be the Manager for this new employee?",
            name: "employee_manager",
            choices: managerChoice,
          },
        ])
        .then((answers) => {
          addEmployee(
            answers.first_name,
            answers.last_name,
            answers.employee_role,
            answers.employee_manager
          );
        });
    });
  });
};
const updateRoleInq = () => {
  Query.selectEmployee().then((data) => {
    const emplChoice = data[0];

    Query.selectRole().then((data) => {
      const roleChoice = data[0];

      inquirer
        .prompt([
          {
            type: "list",
            message: "Choose the employee's role you want to update:",
            name: "update_employee",
            choices: emplChoice,
          },
          {
            type: "list",
            message: "What role will be assigned to this employee?",
            name: "update_role",
            choice: roleChoice,
          },
        ])
        .then((answers) => {
          updateRole(answers.update_role, answers.update_employee);
        });
    });
  });
};

mainMenu();

const viewAllDepartments = () => {
  Query.viewAllDepartments().then((data) => {
    console.table(data[0]);
    mainMenu();
  });
};

const viewAllRoles = () => {
  Query.viewAllRoles().then((data) => {
    console.table(data[0]);
    mainMenu();
  });
};

const viewAllEmployees = () => {
  Query.viewAllEmployees().then((data) => {
    console.table(data[0]);
    mainMenu();
  });
};

const addDepartment = (department) => {
  Query.addDepartment(department).then(() => {
    console.log(`You added ${department} to this database`);
    mainMenu();
  });
};

const addRole = (title, salary, department) => {
  Query.addRole(title, salary, department).then(() => {
    console.log(`You added ${title} to the database`);
    mainMenu();
  });
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
  Query.addEmployee(first_name, last_name, role_id, manager_id).then(() => {
    console.log(
      `The employee ${first_name} ${last_name} was added to the database`
    );
    mainMenu();
  });
};

const updateRole = (role_id, employee_id) => {
  Query.updateRole(role_id, employee_id).then(() => {
    console.log(`The employee's role it's been updated`);
  });
  mainMenu();
};
