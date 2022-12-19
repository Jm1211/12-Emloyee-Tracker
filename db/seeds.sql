USE employee_db;

INSERT INTO departments (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Harry", "Potter", 1),
("Ronald", "Weasley", 2),
("Hermonie", "Granger", 3),
("Draco", "Malfoy", 4),
("Severus", "Snape", 5),
("Sirius", "Black", 6),
("Rubeus", "Hagrid", 7),
("Minerva", "Mcgonagall", 5),
("Luna", "Lovegood", 4);