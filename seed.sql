
INSERT INTO departments (id, dep_name)
VALUES (1, "Media Department"),
(2, "Marketing");

INSERT INTO roles (id, title, dep_id)
VALUES (10, "Pesident", 1),
(20, "International Sales", 2),
(30, "Software Developer", 2);

INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (1, "Michael", "Jordan", 10, null),
(2, "LeBron", "James", 20),
(3, "Stephen", "Curry", 30),
(4, "Magic", "Johnson", 30);