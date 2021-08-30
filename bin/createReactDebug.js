'use strict';

const chalk = require('chalk');
const commander = require('commander');
const execa = require('execa');
const path = require('path');
const fs = require('fs');
const clearConsole = require('react-dev-utils/clearConsole');
const packageJson = require('../package.json');
const semver = require('semver')
const download = require('download-git-repo');

let projectName;

function init() {
    const program = new commander.Command(packageJson.name)
        .version(packageJson.version)
        .arguments('<project-directory>')
        .usage(`${chalk.green('<project-directory>')} [options]`)
        .action(name => {
            // TODO: file exist? delete or not
            projectName = name;
        })
        .parse(process.argv);
    createReactApp(projectName)
    // TODO
}

function createReactApp(name) {
    console.log('start creating react app...')
    const childProcess = execa('npx', ['create-react-app', name])
    const { stdout } = childProcess
    stdout.pipe(process.stdout)     // log process
    childProcess.then(() => {
        clearConsole()
        console.log(chalk.green('Success: create react app'))
        downLoadReact(name)
    }).catch(error => {
        clearConsole()
        console.log(chalk.red('Fail: create react app'))
        console.log(chalk.red(`${error}`))
    })
}

function downLoadReact(name) {
    console.log('Start downloading react source code...')
    const reactAppPath = path.resolve(name)
    const reactAppSrcPath = path.join(reactAppPath, 'src')
    const isCorrectPath = cdToDirectory(reactAppSrcPath)
    if (!isCorrectPath) {
        return
    }
    const reactAppPackageJson = require(`${reactAppPath}/package.json`);
    const reactVersion = semver.valid(semver.coerce(reactAppPackageJson.dependencies.react))
    console.log('reactVersion', reactAppPackageJson.dependencies.react, reactVersion)
    download(`facebook/react#${reactVersion}`, 'react', err => {
        console.log('download react', err ? `error ${err}` : 'success')
        if (!err) {
            const reactPath = path.join(reactAppSrcPath, 'react')
            installReactModules(reactPath)
        }
    })
}

function installReactModules(path) {
    console.log('Start installing react modules...')
    const isCorrectPath = cdToDirectory(path)
    if (!isCorrectPath) {
        return
    }
    const childProcess = execa('npm', ['install'])
    const { stdout } = childProcess
    stdout.pipe(process.stdout)
    childProcess.then(() => {
        // clearConsole()
        build()
        console.log(chalk.green('Success: install react modules'))
    }).catch(error => {
        // clearConsole()
        console.log(chalk.red(`${error}`))
        console.log(chalk.red('Fail: install react modules'))
    })
}

function cdToDirectory(dir) {
    const { chdir } = process
    try {
        chdir(dir);
        return true
    } catch (error) {
        console.log(chalk.red(`Error: chdir to ${dir} failed `));
        return false
    }
}

function build() {
    // TODO: build \ link and handle error
    const childProcess = execa('npm', ['run', 'build-for-devtools'])
    const { stdout } = childProcess
    stdout.pipe(process.stdout)
    childProcess.then(() => {
        // clearConsole()
        console.log(chalk.green('Success: build react'))
    }).catch(error => {
        // clearConsole()
        console.log(chalk.red(`${error}`))
        console.log(chalk.red('Fail: build react'))
    })
}

module.exports.init = init
module.exports.installReactModules = installReactModules
module.exports.build = build