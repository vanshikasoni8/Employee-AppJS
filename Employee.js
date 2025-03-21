class Employee {
    constructor(name) {
        this.name = name;
    }

    checkAttendance() {
        const PRESENT_THRESHOLD = 0.5; // Threshold for presence
        let isPresent = Math.random() >= PRESENT_THRESHOLD; // Generate random value

        return isPresent ? `${this.name} is Present` : `${this.name} is Absent`;
    }

    // Function to determine work hours based on work type
    getWorkHours() {
        const PART_TIME_HOURS = 4;
        const FULL_TIME_HOURS = 8;

        // Generate random work type (0 = No Work, 1 = Part-Time, 2 = Full-Time)
        let workType = Math.floor(Math.random() * 3);

        switch (workType) {
            case 1:
                return PART_TIME_HOURS;
            case 2:
                return FULL_TIME_HOURS;
            default:
                return 0;
        }
    }

    // Function to calculate daily wage based on work type
    calculateDailyWage() {
        const WAGE_PER_HOUR = 20;
        let workHours = this.getWorkHours(); // Fetch work hours using helper function
        let dailyWage = workHours * WAGE_PER_HOUR;
        return `${this.name} worked ${workHours} hours and earned $${dailyWage}`;
    }

    // Function to calculate monthly wage with max 160 hours or 20 days
    calculateMonthlyWage() {
        const WAGE_PER_HOUR = 20;
        const MAX_WORKING_DAYS = 20;
        const MAX_WORKING_HOURS = 160;

        let totalWage = 0;
        let totalHours = 0;
        let daysWorked = 0;

        while (totalHours < MAX_WORKING_HOURS && daysWorked < MAX_WORKING_DAYS) {
            let workHours = this.getWorkHours();

            // Ensure we don't exceed 160 hours
            if (totalHours + workHours > MAX_WORKING_HOURS) {
                workHours = MAX_WORKING_HOURS - totalHours; // Adjust hours to exactly 160
            }

            totalHours += workHours;
            totalWage += workHours * WAGE_PER_HOUR;
            daysWorked++;

           // Store daily wage
           this.dailyWages.push({ day: daysWorked, workHours, dailyWage });
        }

        return {
            totalHours,
            totalWage,
            dailyWages: this.dailyWages,
        };
    }
}

// Example Usage:
const employee1 = new Employee("John Doe");

console.log(employee1.checkAttendance());
console.log(employee1.calculateDailyWage());
const monthlyWage = employee1.calculateMonthlyWage();

console.log(`Total Hours: ${monthlyWage.totalHours}`);
console.log(`Total Wage: $${monthlyWage.totalWage}`);
console.log("Daily Wages:", monthlyWage.dailyWages);