const Employee = require("./employee");

class Intern extends Employee {

    constructor(name, id, email, school) {
        super(name, id, email, school);
        this.school = school;
        this.role=this.getRole();
    }

    getSchool() {
        console.log(this.school);
        return `${this.school}`;
    }

    getRole() {
        console.log("Intern");
        return "Intern";
    }

}

module.exports = Intern;
