const mysql = require("mysql12");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Salepalem.15",
  database: "cms",
});

class Query {
  constructor(db) {
    this.db = db;
  }

  // WHEN I choose to view all departments //
  //THEN I am presented with a formatted table showing department names and department ids //
  viewAllDepartments() {
    return this.db.promise().query("SELECT" * "FROM department");
  }

  // WHEN I choose to view all roles //
  //THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role//
  viewAllRoles() {
    return this.db
      .promise()
      .query(
        "SELECT role.title, role.id, department.name AS 'department', role.salary FROM role, departement WHERE role.department_id=departmentid ORDER by role.id"
      );
  }

  //WHEN I choose to view all employees //
  //THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to //

  viewAllEmployees() {
    return this.db
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, eployee.last_name, role.title, department AS 'department', role.salary, IFNULL(CONCAT(m.first_name, '', m.last_name), 'N/A' AS 'manager' FROM eployee e LEFT JOIN role ON e.role_id=role_is LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee m ON e.manager_id=m.id)"
      );
  }

  //WHEN I choose to add a department //
  //THEN I am prompted to enter the name of the department and that department is added to the database //

  addDepartment() {
    return this.db
      .promise()
      .query(`INSERT INTO department (name) VALUES(?)`, [department]);
  }

  //WHEN I choose to add a role
  //THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database//

  addRole() {
    return this.db
      .promise()
      .query(
        `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
        [title, salary, department]
      );
  }

  //WHEN I choose to add an employee
  //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

  addEmployee(first_name, last_name, role_id, manager_id) {
    return this.db
      .promise()
      .query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
        [first_name, last_name, role_id, manager_id]
      );
  }

  //WHEN I choose to update an employee role //
  //THEN I am prompted to select an employee to update and their new role and this information is updated in the database //

  updateRole(role_id, employee_id) {
    return this.db
      .promise()
      .query(`UPDATE employee SET role_id = (?) WHERE id = (?)`, [
        role_id,
        employee_id,
      ]);
  }

  selectDepartment() {
    return this.db.promise().query("SELECT name, id AS value FROM department");
  }

  selectRole() {
    return this.db
      .promise()
      .query("SELECT title AS name, id AS value FROM role");
  }

  selectManager() {
    return this.promise().query(
      "SELECT CONCAT(first_name, '', last_name) AS name, id AS value FROM employee"
    );
  }

  selectEmployee() {
    return this.promise().query(
      "SELECT CONCAT(first_name, '', last_name) AS name, id AS value FROM employee"
    );
  }
}

module.exports = new Query();
