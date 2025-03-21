class Employee {
    constructor(name) {
        this.name = name;
        this.dailyWages = []; // Store daily wages
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

    // Function to calculate monthly wage with max 160 hours or 20 days
    calculateMonthlyWage() {
        const WAGE_PER_HOUR = 20;
        const MAX_WORKING_DAYS = 20;
        const MAX_WORKING_HOURS = 160;

        let totalHours = 0;
        let daysWorked = 0;
        this.dailyWages = []; // Reset daily wages array

        while (totalHours < MAX_WORKING_HOURS && daysWorked < MAX_WORKING_DAYS) {
            let { workHours, dailyWage } = this.calculateDailyWage();

            if (totalHours + workHours > MAX_WORKING_HOURS) {
                workHours = MAX_WORKING_HOURS - totalHours; // Adjust last day's hours
                dailyWage = workHours * WAGE_PER_HOUR;
            }

            totalHours += workHours;
            daysWorked++;

            // Store daily wage
            this.dailyWages.push({ day: daysWorked, workHours, dailyWage });
        }
    }

    // a. Calculate total wage using reduce
    getTotalWage() {
        return this.dailyWages.reduce((total, day) => total + day.dailyWage, 0);
    }

    // b. Show the day along with daily wage using map
    getDailyWages() {
        return this.dailyWages.map(day => `Day ${day.day}: Earned $${day.dailyWage}`);
    }

    // c. Show days when full-time wage (160) was earned using filter
    getFullTimeDays() {
        return this.dailyWages.filter(day => day.workHours === 8).map(day => day.day);
    }

    // d. Find the first occurrence when full-time wage was earned using find
    getFirstFullTimeDay() {
        let fullTimeDay = this.dailyWages.find(day => day.workHours === 8);
        return fullTimeDay ? `First full-time wage earned on Day ${fullTimeDay.day}` : "No full-time wage earned";
    }

    // e. Check if every element with full-time wage truly holds full-time wage using every
    checkAllFullTimeWages() {
        return this.dailyWages.every(day => day.workHours !== 8 || day.dailyWage === 160);
    }

    // f. Check if there is any part-time wage using some
    hasPartTimeWage() {
        return this.dailyWages.some(day => day.workHours === 4);
    }

    // g. Find the number of days the employee worked
    getDaysWorked() {
        return this.dailyWages.length;
    }
}

// Example Usage:
const employee1 = new Employee("John Doe");
employee1.calculateMonthlyWage();

console.log(`Total Wage: $${employee1.getTotalWage()}`);
console.log("Daily Wages:", employee1.getDailyWages());
console.log("Days with Full-Time Wage:", employee1.getFullTimeDays());
console.log(employee1.getFirstFullTimeDay());
console.log("All Full-Time Wages are Correct:", employee1.checkAllFullTimeWages());
console.log("Has Part-Time Wage:", employee1.hasPartTimeWage());
console.log(`Total Days Worked: ${employee1.getDaysWorked()}`);