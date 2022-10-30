<div align="center">

  <img src="resources/Kintoisologo.png" alt="logo" width="200" height="auto" />
  <h1>Kinto Frontend Service</h1>
  
  <h5>
    UADE Informatics Engineering thesis project - 2022   
  </h5>

  <p>
    User interface for Kinto network service
  </p>
   
<h4>
    <a href="https://github.com/K-nto/Kinto-FE">Documentation</a>
  <span> · </span>
    <a href="https://github.com/K-nto/Kinto-FE/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/K-nto/Kinto-FE/issues/">Request Feature</a>
  </h4>
</div>

<br />

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
- [Setup](#Setup)
  - [Prerequisites](#bangbang-prerequisites)
- [Usage](#eyes-usage)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

## :star2: About the Project

This repository contains the code for the frontend service of Kinto. Developed in React 17.

### :space_invader: Tech Stack

  <ul>
    <li><a href="https://reactjs.org/">ReactJS</a></li>
     <li><a href="https://react-redux.js.org/">React  Redux</a></li>
  </ul>

### :dart: Features

- Graphical interface for managing user information, files and nodes
- Upload encrypted files to the network
- Connect new nodes to the Kinto network

## :toolbox: Setup

### :bangbang: Prerequisites

- **Node** This project uses node and npm as package manager, make sure it is installed.

```bash
 node -v
 npm -v
```

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`KINTO_SERVICE_URL`: URL of the Kinto Storage service
`KINTO_NODES_URL`: URL of the Kinto Nodes service";
`USERS_ROUTE`: Kinto Storage service's users endpoint;
`FILES_ROUTE`: Kinto Storage service's files endpoint;
`NODES_ROUTE`: Kinto Nodes Service's nodes endpoint;

## :gear: Usage

Clone the project

```bash
  git clone https://github.com/K-nto/Kinto-network-status-service.git
```

Install dependencies

```bash
  npm install
```

Start the service.

```bash
  npm run dev
```

## :warning: License

Distributed under the no License. See LICENSE.txt for more information.

<!-- Contact -->

## :handshake: Contact

Federico Javier Parodi - Fedejp - [Linkedin](https://www.linkedin.com/in/fedejp) - [Github](https://github.com/Fedejp)

Carlos Santiago Yanzon - Bizk - [Linkedin](https://www.linkedin.com/in/carlos-santiago-yanzon/) - [Github](https://github.com/bizk)

Project Link: [https://github.com/K-nto](https://github.com/K-nto)

## :gem: Acknowledgements

We thank and aknowledge the authors of these resources for their work.

- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#travel--places)
- [Readme Template](https://github.com/othneildrew/Best-README-Template)
