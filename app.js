const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_CMS_db',
  password: "BigBlunts1"
});

var inquirer = require('inquirer');
async function getDepartments() {
   await connection.promise().query( 'SELECT * FROM `department`').then(departments=>{
    console.log("ID Department")
                    console.log("__ __________")
                    departments[0].forEach(department=>{
                        console.log(department.id + " " + department.name)
                    })
   })
   
    
 }
 async function getRoles(){
    await connection.promise().query("SELECT * FROM `role`").then(roles=>{
        console.log('ID Role')
        roles[0].forEach(role=>{
            console.log(role.id + " " + role.title + " " + role.salary)
        })
        displayMainMenu()
    })
 }
 async function saveDepartment(departmentName){
   await connection.promise().query(`INSERT INTO department (name) VALUES (${departmentName})`).then(results=>{
    console.log(results)
    console.log("department added")
    displayMainMenu()
   })
  }
function createDepartment(){
    return inquirer
    .prompt([
        /* Pass your questions in here */
        {
            name: "departmentName",
            message: "Please enter a name for the new department.",
            default: "New Department"
        }
    ])
  .then( async (answers) => {
        // Use user feedback for... whatever!!
        const { departmentName } = answers;
   await    saveDepartment(departmentName)
       console.log("entry saved.")
       displayMainMenu()
    })
  }
  function displayMainMenu() {
    return inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: "list",
            name: "userSelection",
            message: "Hello. Welcome to the company's internal CMS application. What would you like to do?",
            choices: returnMenuOptions
        }
    ])
    .then( async (answers) => {
        // Use user feedback for... whatever!!
        console.log('answers object is', answers);
        const { userSelection } = answers;
        switch (userSelection) {
            case "View departments":
                // run some function which performs an SQL query to your database and returns all the deparments...
                // for now, we will just print something to the console
                // simple query
                await getDepartments().then(departments=>{
                  
                })
               
            //     for (let i = 0; i<departments.length;i++){
            // console.log(departments[i].id + " " + departments[i].name)
            //     }
                console.log('You selected view deparments');
                displayMainMenu()
                break;
            case "Add a department":
                createDepartment()
            break
            case "View roles":
                getRoles()
            break
            case "Exit system":
                // run some function which performs an SQL query to your database and returns all the deparments...
                // for now, we will just print something to the console
                console.log('You selected exit system');
                process.exit(0);
                break;
            default:
                break;
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.log('isTtyError', error);
        } else {
            // Something else went wrong
            console.log('error is', error);
        }
    });
    
  }

  displayMainMenu()

function returnMenuOptions() {
    return [
        "View departments",
        "Add a department",
        "View roles",
        "View employees",
        new inquirer.Separator(),
        "Exit system"
    ];
}

// return inquirer.prompt([{
//     name: 'firstName',
//     message: 'What is your first name?',
//     type: 'input',
//     validate: (firstName) => {
//       if(!firstName.length) {
//         return 'Please provide a first name';
//       }
//       if(firstName.length <= 3 || firstName.length > 20) {
//         return 'Please provide a first name between 4 and 20 characters long';
//       }

//       return true;
//     },
//     filter: (firstName) => {
//       return firstName.trim();
//     }
//   },
//   {
//     name: 'options',
//     message: 'What would you like to guess for the given first name?',
//     type: 'checkbox',
//     choices: ['gender', 'nationality'],
//     validate: (options) => {
//       if (!options.length) {
//         return 'Choose at least one of the above, use space to choose the option'
//       }

//       return true;
//     }
//   }]);