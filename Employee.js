class Employee {
    constructor(name) {
        this.name = name;
    }

    checkAttendance() {
        const PRESENT_THRESHOLD = 0.5; // Threshold for presence
        let isPresent = Math.random() >= PRESENT_THRESHOLD; // Generate random value

        return isPresent ? `${this.name} is Present` : `${this.name} is Absent`;
    }
}

// Example Usage:
const employee1 = new Employee("John Doe");
console.log(employee1.checkAttendance());
