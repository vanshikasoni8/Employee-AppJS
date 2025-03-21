class Employee {
    constructor(name) {
        this.name = name;
        this.dailyWages = []; // Array to store daily wages
        this.dailyWageMap = new Map(); // Map to store wages by day
    }

    // Function to determine work hours
    getWorkHours() {
        const PART_TIME_HOURS = 4;
        const FULL_TIME_HOURS = 8;

        let workType = Math.floor(Math.random() * 3); // 0 = No Work, 1 = Part-Time, 2 = Full-Time

        switch (workType) {
            case 1:
                return PART_TIME_HOURS;
            case 2:
                return FULL_TIME_HOURS;
            default:
                return 0;
        }
    }

    // Function to calculate daily wage
    calculateDailyWage() {
        const WAGE_PER_HOUR = 20;
        let workHours = this.getWorkHours();
        let dailyWage = workHours * WAGE_PER_HOUR;
        return { workHours, dailyWage };
    }

    // Function to calculate monthly wage and store in Map
    calculateMonthlyWage() {
        const WAGE_PER_HOUR = 20;
        const MAX_WORKING_DAYS = 20;
        const MAX_WORKING_HOURS = 160;

        let totalHours = 0;
        let daysWorked = 0;
        this.dailyWages = []; // Reset array
        this.dailyWageMap.clear(); // Reset map

        while (totalHours < MAX_WORKING_HOURS && daysWorked < MAX_WORKING_DAYS) {
            let { workHours, dailyWage } = this.calculateDailyWage();

            if (totalHours + workHours > MAX_WORKING_HOURS) {
                workHours = MAX_WORKING_HOURS - totalHours; // Adjust last day's hours
                dailyWage = workHours * WAGE_PER_HOUR;
            }

            totalHours += workHours;
            daysWorked++;

            // Store in Array & Map
            this.dailyWages.push({ day: daysWorked, workHours, dailyWage });
            this.dailyWageMap.set(daysWorked, dailyWage);
        }
    }

    // a. Compute total wage using forEach on the Map
    getTotalWageFromMap() {
        let totalWage = 0;
        this.dailyWageMap.forEach(wage => totalWage += wage);
        return totalWage;
    }

    // b. Display Day-wise wages from Map
    getDailyWagesFromMap() {
        return [...this.dailyWageMap.entries()].map(([day, wage]) => `Day ${day}: Earned $${wage}`);
    }
}

// Example Usage:
const employee1 = new Employee("John Doe");
employee1.calculateMonthlyWage();

console.log(`Total Wage from Map: $${employee1.getTotalWageFromMap()}`);
console.log("Day-wise Wages from Map:", employee1.getDailyWagesFromMap());
