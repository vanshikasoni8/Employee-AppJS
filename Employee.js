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

// Example Usage:
const employee1 = new Employee("John Doe");
employee1.calculateMonthlyWage();

const { totalWage, totalHours } = employee1.getTotalWageAndHours();
console.log(`\nTotal Wage: $${totalWage}, Total Hours Worked: ${totalHours}`);

employee1.showFullWorkDays();
console.log("\nPart-Time Work Days:", employee1.getPartWorkDays());
console.log("\nNo Work Days:", employee1.getNoWorkDays());
