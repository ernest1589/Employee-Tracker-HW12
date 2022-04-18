INSERT INTO department (name)
VALUES 
("Sales"),
("Marketing"),
("HR"),
("IT");

INSERT INTO role (title, salary, department_id) 
VALUES
("Sales Manager", 100000, 1),
("Marketing Manager", 100000, 2),
("HR Manager", 100000, 3),
("IT Manager", 100000, 4),
("Sales Agent", 50000, 1),
("Marketing Asociate", 75000, 2),
("HR Assistant", 65000, 3),
("Engineer", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
("Charlie", "Villareal", 1, NULL),
("Karen", "Beltran", 2, NULL),
("Lizbeth", "Prieto", 3, NULL),
("Ernest", "Ramirez", 4, NULL),
("Pedrito", "Sola", 5 ,1),
("Maria", "Melendez", 5 ,1),
("Amaury", "Robles", 5 ,1),
("Pedro", "Picapiedra", 6 ,2),
("Spongebob", "Squarepants", 6 ,2),
("Peter", "Pan", 6 ,2),
("Jhon", "Wick", 7 ,3),
("Homer", "Simpson", 7 ,3),
("Homeless", "FromMetalSlug", 7 ,3),
("Saitama", "Sensei", 8 ,4),
("Kiriguya", "Kazuto", 8 ,4),
("Madara", "Uchiha", 8 ,4);

