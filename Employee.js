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
}

// Example Usage:
const employee1 = new Employee("John Doe");

console.log(employee1.checkAttendance());
console.log(employee1.calculateDailyWage());