const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
let employeesHtml = ""

const employees = []


function addMember() {
    inquirer.prompt([{
        message: "Enter team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter team member's id",
        name: "id"
    },
    {
        message: "Enter team member's email address",
        name: "email"
    }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"
        }])
        .then(function({roleInfo, moreMembers}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
                addEngineerHtml(name, id, email, roleInfo)
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
                addInternHtml(name, id, email, roleInfo)
            } else {
                newMember = new Manager(name, id, email, roleInfo);
                addManagerHtml(name, id, email, roleInfo)
            }
                if (moreMembers === "yes") {
                    addMember();
                } else {
                    const html = wrapHtml()
                    fs.writeFile("./dist/team.html", html, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                
            
        });
    });
}

function wrapHtml(){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">

        ${employeesHtml}

         </div>
         </div>
            

        </body>
        </html>`;
}

function addManagerHtml(name, id, email, officePhone){
    employeesHtml += `<div class="card mx-auto" style="width: 18rem">
    <h5 class="card-header">${name}<br /><br />Manager</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">id:${id}</li>
        <li class="list-group-item">email:${email}</li>
        <li class="list-group-item">office phone:${officePhone}</li>
    </ul>
</div>`
}

function addEngineerHtml(name, id, email, github){
    employeesHtml += `<div class="card mx-auto" style="width: 18rem">
    <h5 class="card-header">${name}<br /><br />Engineer</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">id:${id}</li>
        <li class="list-group-item">email:${email}</li>
        <li class="list-group-item">github:${github}</li>
    </ul>
</div>`
}

function addInternHtml(name, id, email, school){
    employeesHtml += `<div class="card mx-auto" style="width: 18rem">
    <h5 class="card-header">${name}<br /><br />Intern</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">id:${id}</li>
        <li class="list-group-item">email:${email}</li>
        <li class="list-group-item">school:${school}</li>
    </ul>
</div>`
}


addMember()
