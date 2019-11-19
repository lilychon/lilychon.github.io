//Activity 20 changing colors of objects in HTML
//Activity 26 adding class to html
//Activity 33 Github 

const inquirier = require('inquirer');
const fs = require('fs');
const util = require('util');
const css = require('./generateHTML');
const axios = require('axios');
const pdf = require('html-pdf')

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter your Github username"
  },
  {
    type: "list",
    message: "Choose your favorite color",
    name: "color",
    choices: [
      "green",
      "blue",
      "pink",
      "red"
    ]
  }
];

function promptUser() {
  inquirier.prompt(questions)
    .then(function (input) {

      username = input.username;
      favColor = input.color;

      const githubUrl = `https://api.github.com/users/${username}`;
      return githubUrl;
    })
    .then(function (githubUrl) {
      axios.get(githubUrl).then(function (res) {
        res.data.color = favColor;
        const html = css(res.data);
        writeFileAsync("index.html", html);
        convertPdf(html);
      })
        .then(function () {
          console.log("Successfully wrote to index.html");
        })
        .catch(function (err) {
          console.log(err);
        });
    });
}

// function calculateStars(data) {
//   const repoUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
//   axios.get(repoUrl).then(function (repos) {
//     stars = 0;
//     for (var i = 0; i < repos.data.length; i++) {
//       stars = stars + repos.data[i].stargazers_count
//     }
//     data.stars = stars
//     console.log(`stars ${stars}`)
//   })
//   console.log(`${stars}`);
//   createAll(data);
// }

// function createAll(data) {
//   const html = css(data);
//   writeFileAsync("index.html", html);
//   convertPdf(html);
// }

// function getLocation(lat, lon) {

// }

function convertPdf(htmlPdf) {
  options = { format: 'A4' };
  pdf.create(htmlPdf, options).toFile('./resume.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res);
  })
}

promptUser();