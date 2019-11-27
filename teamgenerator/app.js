const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const generateHTML = require("./lib/generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const teamArr = [];

const quesManager = [
  {
    type: "input",
    message: "Manager's Name",
    name: "name"
  },
  {
    type: "input",
    message: "Manager's ID",
    name: "id"
  },
  {
    type: "input",
    message: "Manager's Email",
    name: "email"
  },
  {
    type: "input",
    message: "Manager's Office Number",
    name: "officeNumber"
  }
];

const quesEngineer = [
  {
    type: "input",
    message: "Engineer's Name",
    name: "name"
  },
  {
    type: "input",
    message: "Engineer's ID",
    name: "id"
  },
  {
    type: "input",
    message: "Engineer's Email",
    name: "email"
  },
  {
    type: "input",
    message: "Engineer's Github",
    name: "github"
  }
];

const quesIntern = [
  {
    type: "input",
    message: "Intern's Name",
    name: "name"
  },
  {
    type: "input",
    message: "Intern's ID",
    name: "id"
  },
  {
    type: "input",
    message: "Intern's Email",
    name: "email"
  },
  {
    type: "input",
    message: "Intern's School",
    name: "school"
  }
];


function promptManager() {
  inquirer
    .prompt(quesManager)
    .then(function (input) {
      const manager = new Manager(input.name, input.id, input.email, input.officeNumber)
      teamArr.push(manager);
      createTeam();
    });
}

function promptEngineer() {
  inquirer
    .prompt(quesEngineer)
    .then(function (input) {
      const engineer = new Engineer(input.name, input.id, input.email, input.github)
      teamArr.push(engineer);
      createTeam();
    });
}

function promptIntern() {
  inquirer
    .prompt(quesIntern)
    .then(function (input) {
      const intern = new Intern(input.name, input.id, input.email, input.school);
      teamArr.push(intern);
      createTeam();
    });
}

function createTeam() {

  const createTeamMember = [
    {
      type: "list",
      message: "Choose an employee to add",
      name: "role",
      choices: [
        "Engineer",
        "Intern",
        "Finish Create Team"
      ]
    }];

  inquirer
    .prompt(createTeamMember)
    .then(function (input) {
      console.log(input);

      if (input.role === "Engineer") {
        promptEngineer();
      }
      if (input.role === "Intern") {
        promptIntern();
      }
      else if (input.role === "Finish Create Team") {

        getHtmlTeam();

        return;
      }

    });
}

promptManager();

let html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Team</title>
    <!-- Latest compiled and minified CSS & JS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/4d07055d3e.js" crossorigin=“anonymous”></script>

    <style>

        .shadow {
            box-shadow: 5px 5px 5px grey;
        }
    </style>

</head>

<body>

    <div class="container-fluid p-0 mb-0">
        <div class="jumbotron jumbotron-fluid bg-danger text-light">
            <div class="container text-center">
                <h1 class="display-4">My Team</h1>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center" id="cards">
`;


let close = `
      </div> 
      </div> 
    </body>
  </html>
            `;

function getHtmlTeam() {
  let card = ""
  for (let i = 0; i < teamArr.length; i++) {
    card = generateHTML(teamArr[i])
    html += card;
  }
  html += close;

  writeFileAsync("./output/team.html", html);

};





