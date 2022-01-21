# What you need #

## Before you can start: Installations on windows ##

- First Javascript is a Script-Language and as such it needs an interpreter we use [NodeJS](https://nodejs.org/en/download/). NodeJS makes it possible to use Jaascript out off your browser. Install at least version 14.x

- Now you need something to write your code in. We recommend using the free but powerfull [Visual Studio Code](https://code.visualstudio.com/download).
  
- at last you must manage your changes in a history, we use git and the code is hosted on [https://www.github.com](https://github.com/Caritasverband-Diozese-Hildesheim/MCBackend). To have it easier install the [desktop client](https://desktop.github.com/) for github.

You will need a Github-Account an then you can clone the mcbackend directly to your harddisk.

## Run the software ##

### Install the dependencies ###

open the folder, where you cloned the repository in, in Visual Studio Code.
The first time you want to start it, you need to install all dependencies. NodeJS comes with npm (Node package manager). Visual Studio Code comes with an integrated terminal. In there you can install the dependencies with the command

```console
npm i
```

### Setup the environment ###

Before we can continue you need to setup all environment-variables or the app will end with an error. Here is the comannd-ist for that.
You have to ask for the real valuesm though. We can't publish those informations

```powershell
$env:MC_HOST="localhost"
$env:MC_DMS_URL="<ask for the value>"
$env:MC_DMS_EMAIL="<ask for the value>"
$env:MC_DMS_TOKEN="<ask for the value>"
$env:MC_OIDC_CLIENTID="<ask for the value>"
$env:MC_OIDC_TOKEN="<ask for the value>"
$env:MC_OIDC_URL="<ask for the value>"
$env:MC_OIDC_REALM="<ask for the value>"
$env:MC_EXT_URL="http://localhost:5000/"
$env:MC_OIDC_RDIURL_CB="http://localhost:5000/auth/callback"
$env:MC_OIDC_RDIURL_LO="http://localhost:5000/logout/callback"
```

if you don't feel it to do it everytime you start Visual Studio Code you can setup the environment variables in your system or - much better - create a [tasks.json](https://code.visualstudio.com/docs/editor/tasks). A task can set up the environment variables for you.

### Start the application ###

That's all the setup. How do we run it now? Well, there are Scripts to tell NPM what to do, because you can start many things (the app itself, tests, building documentation, etc).

```console
npm run dev 
```

Normally - as in production - we start it with

```console
npm start
```

'nom run dev'  starts with nodemon - a tool that restarts the app everytime you change the code - and setup a local development environnwnt.

### List of NPM-Scripts ###

All NPM-Scripts and what they do are listed in the package.json file. Every script can be run with

```console
npm run <name of the script>
```

Here is the list of all NPM-Scripts we use and what they do.

- "lint": runs a static code test and test if the code-syntax follows the rules
- "lint-with-fix": same as "lint", but tries some auto-corrects (indents, etc)
- "test": runs tests against the functions of the app, without starting the app itself.
- "full-test": the combination of "lint" and "test"
- "build-swagger": rebuilds the configuration for swagger (automatic API docunentation)
- "build-docs": Generates the Website for the documentation. See annotation in comments
- "dev": Starts the application with nodemon and node environment "test"
- "start": Start-Script for production environment. Rebuilds swagger and code documentation
- "debug": Starts the app so you can live inspect it
