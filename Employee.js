class Employee {
    constructor(name) {
        this.name = name;
        this.dailyWageMap = new Map(); // Stores day → wage
        this.dailyHourMap = new Map(); // Stores day → hours
    }

    // Function to determine work hours
    getWorkHours = () => {
        const PART_TIME_HOURS = 4, FULL_TIME_HOURS = 8;
        let workType = Math.floor(Math.random() * 3); // 0 = No Work, 1 = Part-Time, 2 = Full-Time
        return workType === 1 ? PART_TIME_HOURS : workType === 2 ? FULL_TIME_HOURS : 0;
    };

    // Function to calculate daily wage
    calculateDailyWage = (workHours) => workHours * 20;

    // Function to calculate monthly wage and store in Maps
    calculateMonthlyWage = () => {
        const MAX_DAYS = 20, MAX_HOURS = 160;
        let totalHours = 0, daysWorked = 0;

        this.dailyWageMap.clear();
        this.dailyHourMap.clear();

        while (totalHours < MAX_HOURS && daysWorked < MAX_DAYS) {
            let workHours = this.getWorkHours();
            let dailyWage = this.calculateDailyWage(workHours);

            if (totalHours + workHours > MAX_HOURS) {
                workHours = MAX_HOURS - totalHours;
                dailyWage = this.calculateDailyWage(workHours);
            }

            totalHours += workHours;
            daysWorked++;

            this.dailyWageMap.set(daysWorked, dailyWage);
            this.dailyHourMap.set(daysWorked, workHours);
        }
    };

    // a. Calculate total wage and total hours worked using reduce
    getTotalWageAndHours = () => ({
        totalWage: [...this.dailyWageMap.values()].reduce((sum, wage) => sum + wage, 0),
        totalHours: [...this.dailyHourMap.values()].reduce((sum, hours) => sum + hours, 0)
    });

    // b. Categorize days into full work, part work, and no work using filter
    getWorkDayCategories = () => ({
        fullWorkDays: [...this.dailyHourMap.entries()].filter(([_, hours]) => hours === 8).map(([day]) => day),
        partWorkDays: [...this.dailyHourMap.entries()].filter(([_, hours]) => hours === 4).map(([day]) => day),
        noWorkDays: [...this.dailyHourMap.entries()].filter(([_, hours]) => hours === 0).map(([day]) => day)
    });
}

// Example Usage:
const employee1 = new Employee("John Doe");
employee1.calculateMonthlyWage();

const { totalWage, totalHours } = employee1.getTotalWageAndHours();
console.log(`Total Wage: $${totalWage}, Total Hours: ${totalHours}`);

const workDayCategories = employee1.getWorkDayCategories();
console.log("Full Work Days:", workDayCategories.fullWorkDays);
console.log("Part Work Days:", workDayCategories.partWorkDays);
console.log("No Work Days:", workDayCategories.noWorkDays);
