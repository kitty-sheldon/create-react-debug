'use strict';

const chalk = require('chalk');
const commander = require('commander');
const execa = require('execa');

const packageJson = require('../package.json');

let projectName;

function init() {
    const program = new commander.Command(packageJson.name)
        .version(packageJson.version)
        .arguments('<project-directory>')
        .usage(`${chalk.green('<project-directory>')} [options]`)
        .action(name => {
            projectName = name;
        })
        .parse(process.argv);
    execa('npx', ['create-react-app', projectName]).stdout.pipe(process.stdout)
    // TODO
}

module.exports.init = init