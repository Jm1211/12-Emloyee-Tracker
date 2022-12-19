const db = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer')

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    startQuestions()
  });

const startQuestions = () => {
    const options = [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add an Employee",
        "Add a Role",
        "Add a Department",
        "Update an Employee's Role",
        "Exit",
    ];
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Welcome to your Employee tracker!",
            choices: options,  
        },
    ])
    .then(({choice}) => {
        switch (choice) {
            case "View All Employees":
                viewAlLEmployees()
                break;
            case "View All Roles":
                viewAllRoles()
                break;
            case "View All Departments":
                 viewAllDpt()
                 break;    
            case "Add an Employee":
                 addEmployee()
                 break;
            case "Add a Role":
                 addRole()
                break;   
            case "Add a Department":
                 addDepartment()
                 break;    
            case "Update and Employee's Role":
                    updateEmpRole()
                    break;         
            case "Exit":
                 process.exit();
        }
    });    
}; 

const viewAlLEmployees = () => {
    
   const sql =
    `SELECT employees.id,
                        employees.first_name,
                        employees.last_name,
                        roles.title AS title,
                        roles.salary AS salary,
                        departments.name AS departments,
                        CONCAT (manager.first_name, "", manager.last_name) AS manager
                 FROM employees
                 LEFT JOIN roles 
                 ON employees.role_id = roles.id
                 LEFT JOIN departments 
                 ON roles.department_id = departments.id
                 LEFT JOIN employees manager ON employees.manager_id = manager.id`
            
    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.table(rows)
        startQuestions()
    });
};

const viewAllDpt = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err 
      }
      console.table(rows)
      startQuestions()
    });
}

