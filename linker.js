const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const xml2js = require("xml2js");

inquirer.prompt([
  {
    type: "input",
    message: "Folder where the project is located",
    name: "folder",
    validate: ((pathname) => {
      return (fs.existsSync(pathname) ? true : console.log("\nFolder does not exist") || false);
    })
  },
  {
    type: "input",
    message: "Name of the project",
    name: "config",
    validate: ((pathname) => {
      return pathname.length > 0
    })
  },
  {
    type: "checkbox",
    message: "Type of file(s)",
    name: "type",
    choices: ["C/C++ header", "C/C++ source"]
  },
  {
    type: "input",
    message: "Name of file(s)",
    name: "name",
    when: ((parameters) => {
      return parameters.type.length > 0;
    })
  }
]).then((parameters) => {
  parameters.config = path.resolve(parameters.folder, parameters.config);

  if(parameters.name.length === 0) {
    return console.log("No name found for file(s) to include") || false;
  }

  let parser = new xml2js.Parser();
  fs.readFile(parameters.config + ".cbp", (err, data) => {
    if(err) return console.error(err);

    parser.parseString(data, (err, result) => {
      if(err) return console.error(err);

      parameters.type.forEach((type) => {
        if(type == "C/C++ source") {
          result.CodeBlocks_project_file.Project[0].Unit.push({
            $: { filename: parameters.name + ".c" },
            Option: [
              { "$": { compilerVar: "CC" } }
            ]
          });
        } else if(type == "C/C++ header") {
          result.CodeBlocks_project_file.Project[0].Unit.push({
            $: { filename: parameters.name + ".h" }
          });
        }
      });

      // builder
      let builder = new xml2js.Builder();
      fs.writeFile(parameters.config + ".cbp", builder.buildObject(result), (err) => {
        if(err) return console.error(err);

        console.log("\n" + parameters.config + ".cbp has been modified");
      });
    });
  });
});