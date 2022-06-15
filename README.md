[![GitHub-Size](https://img.shields.io/github/languages/code-size/NousCode/BE-Backoffice?color=red&logo=Hack%20The%20Box&style=flat-square)](https://github.com/NousCode/BE-Backoffice)
[![GitHub-Commits](https://img.shields.io/github/checks-status/NousCode/BE-Backoffice/main?color=red&logo=Cachet&style=flat-square)](https://github.com/NousCode/BE-Backoffice)
![License](https://img.shields.io/github/license/C10-Ghibli-s/BE-Backoffice?color=red&logo=Textpattern&style=flat-square)


[![GitHub-Stars](https://img.shields.io/github/stars/C10-Ghibli-s/BE-Backoffice?color=red&logo=GitHub&style=flat-square)](https://github.com/C10-Ghibli-s/BE-Backoffice)
[![GitHub-forks](https://img.shields.io/github/forks/C10-Ghibli-s/BE-Backoffice?color=red&logo=GitHub&style=flat-square)](https://github.com/C10-Ghibli-s/BE-Backoffice)
![Last-commit](https://img.shields.io/github/last-commit/C10-Ghibli-s/BE-Backoffice?color=red&logo=Git&style=flat-square)


![Docker](https://img.shields.io/static/v1?style=flat-square&logo=Docker&label=Docker&message=Used&color=red)
![DigitalOcean](https://img.shields.io/static/v1?style=flat-square&logo=DigitalOcean&label=DigitalOcean&message=Deployed&color=red)
![HapijS](https://img.shields.io/static/v1?style=flat-square&logo=Node.js&label=Hapi.js&message=Framework&color=red)
![GraphQL](https://img.shields.io/static/v1?style=flat-square&logo=GraphQL&label=GraphQL&message=API&color=red)
![Prisma](https://img.shields.io/static/v1?style=flat-square&logo=Prisma&label=Prisma&message=ORM&color=red)


# 🍣BE-Studio-Ghibli-Backoffice
This is an expand of the project of [*Studio-Ghibli Movie Tracker*](https://github.com/C10-Ghibli-s/BE-Studio-Ghibli-Tracker/blob/main/README.md), it lets has roles in order to control the movie content, users, and even the admin users.  

The project structure implements technologies like docker
in order to mount image of mysql, hapi js framework of Node js, and GraphQL with helps from Apollo server for create the API. Finally, Deploy all the project in Digital Ocean.

## Table of Contents
1. [Config Environment](#-config-environment)
2. [Built With](#-built-with)
3. [Getting Started](#%EF%B8%8F-getting-started)
4. [Installation](#-installation)
4. [The data base modeling](#-the-database-modeling)
5. [Deploy](#-deploy)
6. [Our Team](#-our-team)

## 🫕 Config Environment
Make sure that you have install node js, docker is a nice tool to container images of applications, we are going to use it to run an image of mysql; or you can run your local databa application.

> ⚠️ The projec would be run, once you have configure the enviroment variables (**.env**)

## 📃 Built With
The following technologies are some of which that make up the project:
- Node.js
- Hapi.js
- Prisma
- MySQL
- GraphQL
- Docker
- Git
- Eslint
- Apollo-Server

## 📦️ Getting Started
So, let's talk about how to run this app in your computer. Follow step by step these instructions:

### Prerequisites
Install on your computer [*node.js*](https://nodejs.org/en/download/).

Once node.js is installed on your pc, make sure that you have the latest *npm version*. Run this command:
```bash
$ npm intall npm@latest -g
```
The project uses the docker ecosystem in order to run a container of mysql, so to do that; download [*docker*](https://www.docker.com/get-started/) and [*docker compose*](https://docs.docker.com/compose/install/).

## 🥣 Installation
Amazing! In this part we are talking about how to run the app in your local machine.
1. Clone the repository  
    `git clone https://github.com/NousCode/BE-Backoffice.git`

2. Go in the project directory  
`cd BE-StudioGhibliBackoffice`

3. Install the dependences with:  
`npm install`

4. Create a file *.env*, and put this code. This file configure the docker variables, and also the project.
> ⚠️ If you don't make this file, the app will not run.

```bash
DATABASE_URL="mysql://user:password@host:port/DB_name?schema=public"

# Variables environment
PORT=own_port
API_KEY=own_key
ENVIRONMENT=Development
DB_NAME=own_name
DB_PASSWORD=own_password
DB_PORT=own_port
PHPMA_PORT=own_port

# Variable for Auth0
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL
# Your Auth0 API's Identifier
AUTH0_AUDIENCE

```
5. Before start to run the app, we have to make up the image container, so in the terminal run:  
`docker compose up -d --build` 

![Docker-gif](./src/Public/img/docker.gif)

6. The last stap before run the app, it's the command `npx prisma migrate dev` for be able to have the entities and relations between them in your local machine.

7. Finally, run the app with the command, **Hello world! to Studio-Ghibli Backoffice**:  
`npm run dev`

![runapp-gif](./src/Public/img/runapp.gif)

### Running the test
In order to test the code of the project, run the next command, it runs a JestJS framework that help us to test code.

`npm test`

### Linter Code
Eslinter is very helpful to find and fix problems in JavaScript and TypeScript code.

`npm run lint`


### ⚡️ Scripts

| Process | Script | Description |
| :---: | :---: | :--- |
| Initialization | `npm install` | Install all the dependences. |
| Development | `npm run dev` | Run the local server. |
| Compile TS | `npm run build` | Compile TS code into the *dist* directory. |
| Testing | `npm run test` | Run the test environment. |
| Production | `npm run prod` | Simule the production environment. |
| ESLint | `npm run lint` | Run ESLint helper. |
| Precommit | `npm run precommit` | Before makes a push at the repository, it run sESLint and fix with ESLint. |

## 🍱 The DataBase Modeling
In this part you can check how is the design of the Data Base, first image you are looking the ER diagram.

![Relational Diagram](./src/Public/img/ERDiagram.jpg)

And this one, shows the relations and properties  between entities, it is the physical diagram.

![Physical Diagram](./src/Public/img/PDiagram.jpg)

## 🍜 Deploy
As a mention in the *built with*, the project is deployed in Digital Ocean's platform, just the Back end side. This is the link to it: [Studio Ghibli Backoffice](./).

If you want to know ore details about the API functionality in GraphQL, take a look of the documentation. [Documentation of the API](./)

## 👨‍🍳👩‍🍳 Our team!
Whitout you, this would not be possible...  
&nbsp;&nbsp;&nbsp;&nbsp; 👨‍🍳 [Ivan](https://github.com/AreYouIvan)  
&nbsp;&nbsp;&nbsp;&nbsp; 👩‍🍳 [Liliana](https://github.com/LilianaRestrepoTorres)  
&nbsp;&nbsp;&nbsp;&nbsp; 👨‍🍳 [Guillermo](https://github.com/Hai5edfm)

---
[C10-Squad-Search-Engine] 💚 Platzi Master
