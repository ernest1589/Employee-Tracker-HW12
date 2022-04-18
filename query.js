const mysql = require("mysql2");

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

  viewAllDepartments() {
    return db.promise().query("SELECT * FROM department");
  }

  viewAllRoles() {
    return db
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS 'department', role.salary FROM role, department WHERE role.department_id=department.id ORDER by role.id"
      );
  }

  viewAllEmployees() {
    return db
      .promise()
      .query(
        "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS 'department', role.salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'N/A') AS 'manager' FROM employee e LEFT JOIN role ON e.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee m ON e.manager_id=m.id"
      );
  }

  addDepartment(department) {
    return db
      .promise()
      .query(`INSERT INTO department (name) VALUES(?)`, [department]);
  }

  addRole(title, salary, department) {
    return db
      .promise()
      .query(
        `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
        [title, salary, department]
      );
  }

  addEmployee(first_name, last_name, role_id, manager_id) {
    return db
      .promise()
      .query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
        [first_name, last_name, role_id, manager_id]
      );
  }

  updateRole(role_id, employee_id) {
    return db
      .promise()
      .query("UPDATE employee SET role_id = (?) WHERE id = (?)", [
        role_id,
        employee_id,
      ]);
  }

  selectDepartment() {
    return db.promise().query("SELECT name, id AS value FROM department");
  }

  selectRole() {
    return db.promise().query("SELECT title AS name, id AS value FROM role");
  }

  selectManager() {
    return db
      .promise()
      .query(
        "SELECT CONCAT(first_name, '', last_name) AS name, id AS value FROM employee"
      );
  }

  selectEmployee() {
    return db
      .promise()
      .query(
        "SELECT CONCAT(first_name, '', last_name) AS name, id AS value FROM employee"
      );
  }
}

module.exports = new Query();
