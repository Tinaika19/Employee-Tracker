INSERT INTO department (name) VALUES ('Engineering'), ('Human Resources'), ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('HR Manager', 75000, 2),
('Accountant', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, 1),
('Jane', 'Smith', 2, 2),
('Robert', 'Brown', 3, 3);
