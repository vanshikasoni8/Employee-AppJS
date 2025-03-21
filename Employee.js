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

    // Function to validate employee ID (non-zero positive number)
    validateEmployeeID = () => {
        try {
            // Convert ID to string for regex match
            const idPattern = /^[1-9][0-9]*$/;  // Non-zero positive number
            if (!String(this.id).match(idPattern)) {
                throw new Error('Invalid Employee ID: ID must be a non-zero positive number.');
            }
            return true;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    };

    // Function to validate salary (non-zero positive number)
    validateSalary = () => {
        try {
            if (this.salary <= 0) {
                throw new Error('Invalid Salary: Salary must be a non-zero positive number.');
            }
            return true;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    };

    // Function to validate gender (M or F)
    validateGender = () => {
        try {
            const genderPattern = /^[MF]$/;  // Must be 'M' or 'F'
            if (!this.gender.match(genderPattern)) {
                throw new Error('Invalid Gender: Gender must be "M" (Male) or "F" (Female).');
            }
            return true;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    };

    // Function to validate start date (not in the future)
    validateStartDate = () => {
        try {
            const today = new Date();
            if (this.startDate > today) {
                throw new Error('Invalid Start Date: Start date cannot be in the future.');
            }
            return true;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    };

    // Function to validate all fields
    validateAll = () => {
        return this.validateEmployeeID() && 
               this.validateSalary() && 
               this.validateGender() && 
               this.validateStartDate();
    };

    // Function to display employee details
    getDetails = () => {
        if (this.validateAll()) {
            const formattedStartDate = this.startDate.toLocaleDateString(); // Format the date
            return `Employee ID: ${this.id}, Name: ${this.name}, Salary: $${this.salary}, Gender: ${this.gender}, Start Date: ${formattedStartDate}`;
        } else {
            return 'Employee data is invalid. Please check the fields.';
        }
    };
}

// Example Usage:
const emp1 = new EmployeePayroll(101, "John Doe", 50000, "M", "2022-05-01");
const emp2 = new EmployeePayroll(102, "Jane Smith", -15000, "F", "2025-03-15");  // Invalid salary and future date

console.log(emp1.getDetails());  // Valid data
console.log(emp2.getDetails());  // Invalid salary and future date

// // Example Usage:
// const employee1 = new Employee("John Doe");
// employee1.calculateMonthlyWage();

// const { totalWage, totalHours } = employee1.getTotalWageAndHours();
// console.log(`\nTotal Wage: $${totalWage}, Total Hours Worked: ${totalHours}`);

// employee1.showFullWorkDays();
// console.log("\nPart-Time Work Days:", employee1.getPartWorkDays());
// console.log("\nNo Work Days:", employee1.getNoWorkDays());
