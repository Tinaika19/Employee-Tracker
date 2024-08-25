// db/queryFunctions.js
const pool = require('./connection');

// View all departments
async function viewAllDepartments() {
    try {
        const result = await pool.query('SELECT * FROM department');
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving departments:', err);
    }
}

// View all roles
async function viewAllRoles() {
    try {
        const query = `
            SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            JOIN department ON role.department_id = department.id
        `;
        const result = await pool.query(query);
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving roles:', err);
    }
}

// View all employees
async function viewAllEmployees() {
    try {
        const query = `
            SELECT 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                department.name AS department, 
                role.salary, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id
        `;
        const result = await pool.query(query);
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving employees:', err);
    }
}

// Add a new department
async function addDepartment(name) {
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Department ${name} added successfully.`);
    } catch (err) {
        console.error('Error adding department:', err);
    }
}

// Add a new role
async function addRole(title, salary, department_id) {
    try {
        await pool.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        );
        console.log(`Role ${title} added successfully.`);
    } catch (err) {
        console.error('Error adding role:', err);
    }
}

// Add a new employee
async function addEmployee(first_name, last_name, role_id, manager_id) {
    try {
        // Check if the role ID exists
        const roleResult = await pool.query('SELECT id FROM role WHERE id = $1', [role_id]);
        if (roleResult.rows.length === 0) {
            throw new Error(`Role ID ${role_id} does not exist.`);
        }

        
        // Check if the manager ID exists (if provided)
        if (manager_id) {
            const managerResult = await pool.query('SELECT id FROM employee WHERE id = $1', [manager_id]);
            if (managerResult.rows.length === 0) {
                throw new Error(`Manager ID ${manager_id} does not exist.`);
            }
        }

        // Insert the new employee
        await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, manager_id]
        );
        console.log(`Employee ${first_name} ${last_name} added successfully.`);
    } catch (err) {
        console.error('Error adding employee:', err.message);
    }
}


// Update an employee's role
async function updateEmployeeRole(employee_id, new_role_id) {
    try {
        await pool.query(
            'UPDATE employee SET role_id = $1 WHERE id = $2',
            [new_role_id, employee_id]
        );
        console.log(`Employee ID ${employee_id} role updated successfully.`);
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
