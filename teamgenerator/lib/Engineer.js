const Employee = require("./employee");

class Engineer extends Employee {

  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this.role=this.getRole();
  }

  getGitHub() {
    console.log(this.github);
    return `${this.github}`;
  }

  getRole() {
    console.log("Engineer");
    return "Engineer";
  }

}

module.exports = Engineer;