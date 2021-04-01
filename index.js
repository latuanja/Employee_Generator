const express = require("express")
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
//create connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeeDB"
});

//connect to MySql
connection.connect(err => {
    if(err) {
        throw err;
    }
    //when connected: console log? display info??
    employeeDetails();
});

const employeeDetails = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'selection',
            message: 'How can I help you today?',
            choices: [
                "View Employees",
                "View Roles",
                "View Departments",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Delete Employee"
            ],
        })
        .then((answers) => {
            switch (answers.selection) {
                case "View Employees":
                    viewEmployees();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Update Employee":
                    updateEmployeeRole();
                    break;
                default:
                    console.log(answers.selection + " still default");
                    break;
            }
        });

};
const viewEmployees = () => {
    console.log("Employees");
    
    const query = `SELECT
    employees.id AS "ID",
    first_name AS "First Name",
    last_name AS "Last Name",
    title AS "Title",
    departments.dep_name AS "Deparment"
    FROM employee
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON departments.id = roles.dep_id
    ORDER BY employees.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);

        console.table(res);
        emmployeeInfo();
        
    });
};

const viewDepartments = () => {
    console.log("Departments");
    const query = `SELECT
    departments.id AS "ID",
    dep_name AS "Department Name"
    FROM departments
    ORDER BY departments.id`;
    connections.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeInfo();
    });
};

const viewRoles = () => {
    console.log("Roles");
    const query = `SELECT
    roles.id AS "ID",
    title AS "Role Title",
    dep_name AS "Department"
    FROM roles
    JOIN departments ON roles.dep_id = departments.id
    ORDER BY roles.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeInfo();
    });
}
const addEmployee = () => {
    console.log("Add New Employee");
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Enter Employee first name',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Enter Employee last name',
            },
            {
                name: 'employeeRole',
                type: 'input',
                message: 'Enter employee role',
            }
        ])
        .then((answers) => {
            const newEmployee = {
                firstName: answers.firstName,
                lastName: answers.lastName,
                role: answers.employeeRole,
            };
            const query = 
                "INSERT INTO employees (first_name, last_name, role_id, manager_id) Values (?, ?, ?, ?)";
            connection.query(
                query,
                [
                    newEmployee.firstName,
                    newEmployee.lastName,
                    newEmployee.role,
                ],
                (err) => {
                    if (err) throw err;
                    console.log(`${newEmployee.firstName} ${newEmployee.lastName} has been added`);
                    empoloyeeInfo();
                }
            );
        });
};
const addDepartment = () => {
    console.log("Add New Department");
    inquirer
    .prompt([
        {
            name: "depName",
            type: "input",
            message: "Enter Department Name",
        },
    ])
    .then((answers) => {
        const newDep = { depName: answers.depName };
        var query = "INSERT INTO departments (dep_name) Value (?)";
        connection.query(query, [newDep.depName], 
            (err) => {
            if (err) throw err;
            console.log(`${newDep.depName } has been added`);
            employeeInfo();
        });
    });
};
const addRole = () => {
    console.log("ADD NEW ROLE");
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "Enter the employee's title",
        },
        {
          name: "depId",
          type: "number",
          message: "Enter the employee's new id number",
        },
      ])
      .then((answers) => {
        const newRole = {
          roleTitle: answers.roleTitle,
          depId: answers.depId,
        };
  
        var query = "INSERT INTO roles (title, dep_id) Values (?,?,?)";
        connection.query(
          query,
          [newRole.roleTitle, newRole.salary, newRole.depId],
          (err) => {
            if (err) throw err;
            console.log(`${newRole.roleTitle} has been added`);
            employeeInfo();
          }
        );
      });
  };
  const updateEmployeeRoles = () => {
    console.log("UPDATE EMPLOYEE ROLE");
    connection.query("SELECT id, first_name, last_name FROM employees",
      (err, res) => {
        if (err) throw err;
        let employeesArray = [];
        res.forEach(employee => {
          employeesArray.push({
            name: `${employee.first_name} ${employee.last_name}`,
            id: employee.id,
          });
        });
        inquirer
          .prompt([
            {
              name: "selectedEmployee",
              type: "list",
              message: "Which employee needs updating?",
              choices: employeesArray,
            },
          ])

          .then((answers) => {
            const selectedEmployee = answers.selectedEmployee;
            let employeeId;
            for (i = 0; i < employeesArray.length; i++) {
              if (employeesArray[i].name === selectedEmployee) {
                employeeId = employeesArray[i].id;
              }
            }
            connection.query("SELECT id, title FROM roles", (err, res) => {
              if (err) throw err;
              let roles = [];
              res.forEach(role => {
                roles.push({ name: role.title, id: role.id });
              });
              
              inquirer
                .prompt([
                  {
                    name: "newRole",
                    type: "list",
                    message: "Select new role",
                    choices: roles,
                  },
                ])
                .then((answers) => {
                  const selectedRole = answers.newRole;
                  let roleId;
                  for (i = 0; i < roles.length; i++) {
                    if (roles[i].name === selectedRole) {
                      roleId = roles[i].id;
                    }
                  }
  
      
                  connection.query(
                    "UPDATE employees SET role_id =? WHERE id = ?",
                    [roleId, employeeId],
                    (err) => {
                      if (err) throw err;
  
                      console.log(`${selectedEmployee.toUpperCase()}'S ROLE HAS BEEN UPDATED TO ${selectedRole.toUpperCase()}`);
                        employeeInfo();
                    }
                  );
                });
            });
          });
      }
    );
  };