# create-react-debug [![Npm Version](https://img.shields.io/npm/v/create-react-debug?color=bright)](https://www.npmjs.com/package/create-react-debug) 


## Quick Overview

```sh
npm i -g create-react-debug
create-react-debug project-directory
```

If you haven't previously installed `yarn`, please install it using  `npm install -g yarn`.

If you've previously installed `create-react-debug` globally via `npm install -g create-react-debug`, please uninstall the package using `npm uninstall -g create-react-debug` or `yarn global remove create-react-debug` to ensure always uses the latest version.

If you've previously linked `react` and `react-dom` , please unlink them using `npm unlink react react-dom` or `yarn unlink react react-dom`.


## Install
```sh
npm i create-react-debug
```

## Creating a debug react source code environment

**This is based on [react](https://github.com/facebook/react) and [create-react-app](https://github.com/facebook/create-react-app), so you need to fulfil the requirement of react and create-react-app。** For Example：

**You’ll need to have Node 14.0.0 or later version on your local development machine** (but it’s not required on the server). We recommend using the latest LTS version. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

Use following methods to build a debug environment, this may take a while:

### npm

```sh
create-react-debug test
```

It will create a directory called `test` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
test
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── react
│       └── build
│           └── node_modules
│               ├── react
│               └── react-dom 
├── tsconfig.json
└── yarn.lock
```
Once the installation is done, you can open your project folder:

```sh
cd test
```
**React source code is placed inside src/react**
**You can debug in src/react/build/node_module/react or src/react/build/node_module/react-dom to enjoy react source code**

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Others
[react](https://github.com/facebook/react) 
[create-react-app](https://github.com/facebook/create-react-app)

## TODO:
1. handle project-directory already exist
2. automatically install yarn
3. add test