//npm init -y
// npm i inquirer

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

//constant variable that tells us that the writeFile is asynchronous and it has to wait for the fs.writeFile to be done //
const writeFileAsync = util.promisify(fs.writeFile);

//Questions to ask user to fill out the README file//
function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "badge",
            message: "Please provide badges."
        },
        {
            type: "input",
            name: "title",
            message: "Provide a title for your project."
        },
        {
            type: "input",
            name: "description",
            message: "Describe your project."
        },
        {
            type: "input",
            name: "content",
            message: "If your README is long, creating a table of contents would be helpful for users."
        },
        {
            type: "input",
            name: "install",
            message: "Provide a step-by-step description of how to get the development environment running."
        },
        {
            type: "input",
            name: "usage",
            message: "Provide instructions and examples on how you want users to use your project."
        },
        {
            type: "input",
            name: "credit",
            message: "List anyone who collaborated with you by adding links to their Github profiles. If there were any tutorials or third-party assets that were used, list the creators along with their links."
        },
        {
            type: "input",
            name: "license",
            message: "Let other developers know what they can and cannot do with your project."
        },
        {
            type: "input",
            name: "test",
            message: "Write tests for your application and provide examples on how to run them."
        },
        {
            type: "input",
            name: "picture",
            message: "Provide a file name for your Github profile picture."
        },
        {
            type: "input",
            name: "email",
            message: "What is your Github email?"
        }
    ]);
}

//Generate the README by creating a template and filling it in with user answers//
function generateReadMe(answer) {
    return `
    Badge:
    ${answer.badge}

    Project Title:
    ${answer.title}

    Project Description:
    ${answer.description}

    Table of Contents:
    ${answer.content}

    Installation:
    ${answer.install}

    Usage:
    ${answer.usage}

    Credits:
    ${answer.credit}

    License:
    ${answer.license}

    Test:
    ${answer.test}

    Profile Picture:
    ${answer.picture}

    Github Email:
    ${answer.email}
`;
  }

  // Calling out the function called promptUser on line12 //
  promptUser()
  // A promise that states whatever is inside function userInput is going to run when it's ready //
  .then(function (userInput) {
    // Created a const variable that calls out whatever is inside the generatedReadMe function with userInput as argument?? //
    const readMe = generateReadMe(userInput); 
    console.log(readMe);
    // Return or print out a new file called readme.md // Not sure why it's returning this though
    return writeFileAsync("readme-generator.md", readMe);
  })
  .then(function () {
    // If it's successful, it would just say successful //
    console.log("Successfully wrote to readme-generator.md");
  })
  .catch(function (err) { // Why catch? //
    // If it's not successful, it would throw an error //
    console.log(err);
  });