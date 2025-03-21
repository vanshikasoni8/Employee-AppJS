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

    // Display the work log
    displayWorkLog = () => this.workLog.forEach(log => 
        console.log(`Day ${log.day}: Worked ${log.workHours} hrs, Earned $${log.dailyWage}`)
    );
}

// Example Usage:
const employee1 = new Employee("John Doe");
employee1.calculateMonthlyWage();

console.log("\nEmployee Work Log:");
employee1.displayWorkLog();
