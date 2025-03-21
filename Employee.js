class Employee {
    constructor(name) {
        this.name = name;
    }

    checkAttendance() {
        const PRESENT_THRESHOLD = 0.5; // Threshold for presence
        let isPresent = Math.random() >= PRESENT_THRESHOLD; // Generate random value

        return isPresent ? `${this.name} is Present` : `${this.name} is Absent`;
    }

    // Calculate daily wage based on work type
    calculateDailyWage() {
        const WAGE_PER_HOUR = 20;
        const PART_TIME_HOURS = 4;
        const FULL_TIME_HOURS = 8;

        // Generate random work type (0 = No Work, 1 = Part-Time, 2 = Full-Time)
        let workType = Math.floor(Math.random() * 3);
        let workHours = 0;

        switch (workType) {
            case 1:
                workHours = PART_TIME_HOURS;
                break;
            case 2:
                workHours = FULL_TIME_HOURS;
                break;
            default:
                workHours = 0;
        }
        let dailyWage = workHours * WAGE_PER_HOUR;
        return `${this.name} worked ${workHours} hours and earned $${dailyWage}`;
    }
}

const employee1 = new Employee("John Doe");

// console.log(employee1.checkAttendance());
console.log(employee1.calculateDailyWage());
