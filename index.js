// index.js
const inquirer = require('inquirer');
const db = require('./db/functions');

async function mainMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ]);

    switch (action) {
        case 'View All Departments':
            await db.viewAllDepartments();
            break;
        case 'View All Roles':
            await db.viewAllRoles();
            break;
        case 'View All Employees':
            await db.viewAllEmployees();
            break;
        case 'Add Department':
            const { departmentName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the department:'
                }
            ]);
            await db.addDepartment(departmentName);
            break;
        case 'Add Role':
            const roleAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the role:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for the role:'
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'Enter the department ID for the role:'
                }
            ]);
            await db.addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.department_id);
            break;
            case 'Add Employee':
                const employeeAnswers = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter the first name of the employee:'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter the last name of the employee:'
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'Enter the role ID for the employee:'
                    },
                    {
                        type: 'input',
                        name: 'manager_id',
                        message: 'Enter the manager ID for the employee (or leave blank):',
                        default: null
                    }
                ]);
                await db.addEmployee(employeeAnswers.first_name, employeeAnswers.last_name, employeeAnswers.role_id, employeeAnswers.manager_id);
                break;
                case 'Update Employee Role':
                    const employees = await db.getEmployees(); // Implement this function
                    const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
                    const roles = await db.getRoles(); // Implement this function
                    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
                    const updateAnswers = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employee_id',
                            message: 'Select the employee whose role you want to update:',
                            choices: employeeChoices
                        },
                        {
                            type: 'list',
                            name: 'new_role_id',
                            message: 'Select the new role for the employee:',
                            choices: roleChoices
                        }
                    ]);
                    await db.updateEmployeeRole(updateAnswers.employee_id, updateAnswers.new_role_id);
                    break;
                
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    // Return to main menu after action is complete
    mainMenu();
}

mainMenu();
