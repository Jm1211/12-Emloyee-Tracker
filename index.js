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
                 ON employees.roles_id = roles.id
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

const viewAllRoles = () => {
    const sql = `SELECT roles.id,
                        roles.title,
                        roles.salary,
                        departments.name AS department
                FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id`;
         db.query(sql,(err, rows) => {
            if (err) {
                throw err;
            }
            console.table(rows);
            startQuestions();
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
};

const addEmployee = () => {
    return inquirer.prompt ([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?', 
        validate: first_nameInput => {
            if (first_nameInput) {
                return true;
            } else {
                console.log ("Please enter the employees first name!");
                return false; 
            }
        }
    },
    {
        type: 'input',
        name: 'last_name',
        message: "What is the employees last name?",
        validate: last_nameInput => {
            if  (!last_nameInput) {
                console.log ("Please enter the employees last name!");
                return false; 
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'roles_id',
        message: "Please enter the id of the employees role",
        validate: roles_idInput => {
            if  (!roles_idInput) {
                console.log ("Please enter the employees role ID!")
                return false; 
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'manager_id',
        message: "Please enter the id of the employees manager",
        validate: manager_idInput => {
            if  (!manager_idInput) {
                console.log ("Please enter the employees manager ID!")
                return false; 
            } else {
                return true;
            }
        }
    }
  ])
    .then(answers => {
    const sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`;
    const params = [
      answers.first_name,
      answers.last_name,
      answers.roles_id,
      answers.manager_id
    ];
    db.query(sql, params, (err, result) => {
      if (err) {
        throw err
      }
      console.log('Your new employee as been added!')
      startQuestions()
    });
  })
  };

  
  const addDepartment = () => {
      inquirer
    .prompt({
      type: 'input',
      name: 'newDepartment',
      message: 'what would you like to name the new department?'
    })
      .then(answers => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
      const params = [
        answers.newDepartment,
      ];
  
      db.query(sql, params, (err, result) => {
        if (err) {
          throw err
        }
        console.log('Your new department as been added')
        startQuestions()
  
      });
    })
  };
  
  const addRole = () => {
    return inquirer.prompt ([
      {
        type: 'input',
        name: 'title',
        message: 'Whats the title of this role?', 
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log ("Please enter the title for this role!");
                return false; 
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: "Whats the Salary for this role?",
        validate: salaryInput => {
            if  (!salaryInput) {
                console.log ("Please enter this roles salary!");
                return false; 
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'department_id',
        message: "Please enter the department ID for this role",
        validate: department_idInput => {
            if  (!department_idInput) {
                console.log ("Please enter the department ID!")
                return false; 
            } else {
                return true;
            }
        }
    },
  ])  
    .then(answers => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [
      answers.title,
      answers.salary,
      answers.department_id
    ];
    db.query(sql, params, (err, result) => {
      if (err) {
        throw err
      }
      console.log('Your new role has been added')
      startQuestions()
    });
  })
  };

  const updateEmpRole = () => {
    return inquirer.prompt ([
     {
       type: 'input',
       name: 'id',
       message: 'please enter the employee id for the updated role', 
       validate: idInput => {
           if (idInput) {
               return true;
           } else {
               console.log ("Please enter the employee ID");
               return false; 
           }
       }
   },
   {
       type: 'input',
       name: 'roles_id',
       message: "enter the new role ID",
       validate: roles_idInput => {
           if  (!roles_idInput) {
               console.log ("Please enter updated role ID!");
               return false; 
           } else {
               return true;
           }
       }
   }
 ]) 
 .then(answers => {
   const sql = `UPDATE employees SET roles_id= ? WHERE id= ?`;
   const params = [
     
     answers.roles_id,
     answers.id,
   ];
   db.query(sql, params, (err, result) => {
     if (err) {
       throw err
     }
     console.log('Your new employee has been updated')
     startQuestions()
   });
 })
 };
 
 