DROP DATABASE IF EXISTS cms;

CREATE DATABASE cms;

USE cms;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY auto_increment,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id) 
    REFERENCES role(id)
);
