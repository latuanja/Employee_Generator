INSERT INTO departments (id, dep_name)
VALUES (1, "Media Department"),
(2, "Marketing");

INSERT INTO roles (id, title, dep_id)
VALUES (10, "President", 1),
(20, "Content Creator", 2),
(30, "Software Developer", 2);

INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (1, "John", "Wick", 10),
(2, "Jennifer", "Rulio", 20),
(3, "Ben", "Simmons", 30),
(4, "Tom", "Thurasick", 30);