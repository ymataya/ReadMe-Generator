//npm init -y
// npm i inquirer

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

//constant variable that tells us that the writeFile is asynchronous and it has to wait for the fs.writeFile to be done //
const writeFileAsync = util.promisify(fs.writeFile);

//Questions to ask user to fill out the README file//
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Provide a title for your project:"
        },
        {
            type: "list",
            name: "badge",
            message: "Please provide badges.",
            choices: ["MIT", "APACHE2.0", "GPL3.0", "none"] 
        },
        {
            type: "input",
            name: "description",
            message: "Describe your project:"
        },
        // {
        //     type: "input",
        //     name: "content",
        //     message: "Create a table of contents:"
        // },
        {
            type: "input",
            name: "install",
            message: "Provide a step-by-step description of how to get the development environment running:"
        },
        {
            type: "input",
            name: "usage",
            message: "Provide instructions and examples on how you want users to use your project:"
        },
        {
            type: "input",
            name: "credit",
            message: "List any help you got to create this project (contributors, third-party, tutorials, etc.): "
        },
        {
            type: "input",
            name: "license",
            message: "What can and cannot be done to your project:"
        },
        {
            type: "input",
            name: "test",
            message: "Write tests for your application and provide examples on how to run them:"
        },
        {
            type: "input",
            name: "email",
            message: "What is your Github email:"
        },
        {
            type: "input",
            name: "username",
            message: "What's your Github username:"
        },
        {
            type: "input",
            name: "picture",
            message: "Paste the URL for your Github profile picture:"
        }
    ]);
}

//Generate the README by creating a template and filling it in with user answers//
function generateReadMe(answer) {
    return `

# ${answer.title}

## Badge:
![*GitHub license*](https://img.shields.io/badge/license-${answer.badge}-blue.svg)

## Project Description:
### ${answer.description}

## Table of Contents:
### 1. Installation
### 1. Usage
### 1. Credit
### 1. License
### 1. Test
### 1. Github Project
### 1. Live Link
### 1. Profile Picture
### 1. Github Email

## Installation:
### ${answer.install}

## Usage:
### ${answer.usage}

## Credits:
### ${answer.credit}

## License:
### ${answer.license}

## Test:
### ${answer.test}

## Github Project: 
### https://github.com/${answer.username}/${answer.title.toLowerCase().split(" ").join("-")}

## Live Link: 
### https://${answer.username}.github.io/${answer.title.toLowerCase().split(" ").join("-")}/

## Profile Picture: 
![*Picture*](${answer.picture})

## Github Email: 
### ${answer.email}
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
    return writeFileAsync("README.md", readMe);
  })
  .then(function () {
    // If it's successful, it would just say successful //
    console.log("Successfully wrote to README.md");
  })
  .catch(function (err) { // Why catch? //
    // If it's not successful, it would throw an error //
    console.log(err);
  });