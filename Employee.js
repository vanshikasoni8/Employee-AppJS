class Employee {
    constructor(name) {
        this.name = name;
        this.workLog = []; // Stores [{ day, workHours, dailyWage }]
    }

    // Function to determine work hours
    getWorkHours = () => {
        const PART_TIME_HOURS = 4, FULL_TIME_HOURS = 8;
        let workType = Math.floor(Math.random() * 3); // 0 = No Work, 1 = Part-Time, 2 = Full-Time
        return workType === 1 ? PART_TIME_HOURS : workType === 2 ? FULL_TIME_HOURS : 0;
    };

    // Function to calculate daily wage
    calculateDailyWage = (workHours) => workHours * 20;

    // Function to calculate monthly wage and store data in an object
    calculateMonthlyWage = () => {
        const MAX_DAYS = 20, MAX_HOURS = 160;
        let totalHours = 0, daysWorked = 0;
        this.workLog = []; // Reset the work log

        while (totalHours < MAX_HOURS && daysWorked < MAX_DAYS) {
            let workHours = this.getWorkHours();
            let dailyWage = this.calculateDailyWage(workHours);

            if (totalHours + workHours > MAX_HOURS) {
                workHours = MAX_HOURS - totalHours;
                dailyWage = this.calculateDailyWage(workHours);
            }

            totalHours += workHours;
            daysWorked++;

            // Store as an object in the workLog array
            this.workLog.push({ day: daysWorked, workHours, dailyWage });
        }
    };

    // a. Calculate total Wage and total hours worked using reduce
    getTotalWageAndHours = () => ({
        totalWage: this.workLog.reduce((sum, log) => sum + log.dailyWage, 0),
        totalHours: this.workLog.reduce((sum, log) => sum + log.workHours, 0)
    });

    // b. Show full working days using forEach
    showFullWorkDays = () => {
        console.log("\nFull Working Days:");
        this.workLog.forEach(log => {
            if (log.workHours === 8) console.log(`Day ${log.day}: ${log.workHours} hrs`);
        });
    };

    // c. Show part-time working days using map and reduce to string array
    getPartWorkDays = () =>
        this.workLog
            .filter(log => log.workHours === 4)
            .map(log => `Day ${log.day}`);

    // d. Show no working days using map function
    getNoWorkDays = () =>
        this.workLog
            .filter(log => log.workHours === 0)
            .map(log => `Day ${log.day}`);
}

class EmployeePayroll {
    constructor(id, name, salary, gender, startDate) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.gender = gender;
        this.startDate = new Date(startDate); // Ensure start date is in Date format
    }

    // Function to validate employee name using regex pattern
    validateName = () => {
        try {
            const namePattern = /^[A-Z][a-zA-Z]{2,}$/;  // Starts with capital, minimum 3 characters
            if (!this.name.match(namePattern)) {
                throw new Error('Invalid Name: Name must start with a capital letter and have at least 3 characters.');
            }
            return true;  // Name is valid
        } catch (error) {
            console.error(error.message);  // Catch and log error
            return false;  // Invalid name
        }
    };

    // Function to display employee details
    getDetails = () => {
        if (this.validateName()) {
            const formattedStartDate = this.startDate.toLocaleDateString(); // Format the date
            return `Employee ID: ${this.id}, Name: ${this.name}, Salary: $${this.salary}, Gender: ${this.gender}, Start Date: ${formattedStartDate}`;
        } else {
            return 'Employee name is invalid. Please check the name format.';
        }
    };
}

// Example Usage:
const emp1 = new EmployeePayroll(101, "John Doe", 50000, "Male", "2022-05-01");
const emp2 = new EmployeePayroll(102, "jane smith", 60000, "Female", "2021-03-15");

console.log(emp1.getDetails());  // Valid name
console.log(emp2.getDetails());  // Invalid name (starts with lowercase)

// // Example Usage:
// const employee1 = new Employee("John Doe");
// employee1.calculateMonthlyWage();

// const { totalWage, totalHours } = employee1.getTotalWageAndHours();
// console.log(`\nTotal Wage: $${totalWage}, Total Hours Worked: ${totalHours}`);

// employee1.showFullWorkDays();
// console.log("\nPart-Time Work Days:", employee1.getPartWorkDays());
// console.log("\nNo Work Days:", employee1.getNoWorkDays());
