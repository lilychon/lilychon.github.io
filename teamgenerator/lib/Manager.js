const Employee = require("./employee");

class Manager extends Employee {

  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role=this.getRole();
  }

  getOffice() {
    console.log(this.officeNumber);
    return `${this.officeNumber}`;
  }

  getRole() {
    console.log("Manager");
    return "Manager";
  }

}

module.exports = Manager;
