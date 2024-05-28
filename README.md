# Dooms Day Alert [Spring 2023]

You may visit the website here : https://dooms-day-alert.onrender.com/

_Please keep in mind that this website is not being maintained anymore. Some things may not work correctly anymore, because of different deployment method, outdated packages and no database support._

## Documentation Folder contains 5 Milestones, which explains the project in detail.

Group Project, Credits go to following people besides me.

|       Student Name       |          Student Email          | GitHub Username |            Roles             |
| :----------------------: | :-----------------------------: | :-------------: | :--------------------------: |
|       Umid Muradli       |     umuradli@mail.sfsu.edu      |    umidmurad    | Full Stack Member, Team Lead |
|  North Wiriyachinnakarn  | swiriyachinnakarn@mail.sfsu.edu |  northsupakit   |           Back End           |
|      Matthew Marcos      |     mmarcos4@mail.sfsu.edu      |    mmarcos3     |           Back End           |
|        Edward Li         |          eli9@sfsu.edu          | Edwards-Github  |           Back End           |
| Khabibullo Khujamberdiev |     kkhujamberdiev@sfsu.edu     |    khabibkh     |          Front End           |
|         Arin Ton         |       aton@mail.sfsu.edu        |     a-ton9      |     Back End (Database)      |

# The Objective of the Website

Dooms Day Alert website is an interactive platform designed to provide users with essential information and resources related to disaster preparedness. Our project aims to demonstrate our understanding of various technologies and concepts, including:

- Setting up and deploying a web application using AWS services like EC2.
- Establishing and managing a database, and connecting to it via API endpoints.
- Implementing interactive features, such as utilizing the Google Maps API for location-based functionality.

# Technologies Used

- **Frontend**: React.js, JavaScript, CSS
- **Backend**: Express.js, Node.js
- **Database**: Amazon RDS
- **Deployment**: AWS EC2
- **APIs**: Google Maps API

# Project Structure

```
doomsdayalert/
│
├── application/         # Root directory for the application
│   ├── backEnd/         # Backend server and API
│   └── frontEnd/        # Frontend React application
│   └── .gitignore       # Git ignore file
│
├── Documents/           # Documentation folder
├── README.md            # Project README file
```

# Prerequisites

- Database (AWS RSD)
- Hosting Site (AWS EC2)

If you would like to have fully working website. You may create a Database, and input the information to `server.js` file. Otherwise, backEnd will not work, and you may skip the step 3 below.

# Setup Instructions

## Keep in Mind that

1. Clone this repository to your local machine.
2. Navigate to the `frontEnd` directory and run `npm install` to install frontend dependencies.
3. Navigate to the `backEnd` directory and run `npm install` to install backend dependencies.
4. Run `npm start` in both the `backEnd` and `frontEnd` directories to start the frontend and backend servers.
5. Access the application at `http://localhost:3000` in your web browser.

# Usage Guide

Once the application is running, users can navigate to various sections of the website to explore different features, including:

- Viewing information about disaster preparedness and safety measures.
- Accessing real-time weather updates and forecasts.
- Monitoring potential security threats and alerts in their area.
- Reporting and tracking incidents related to wildfires, COVID-19, and other emergencies.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Screenshots

I have attached images of the functional website and Database when it was functional.

![Screenshot 1](/Documentations/Ex1.png)
_You can see how county or city search shows results._

![Screenshot 2](/Documentations/Ex2.png)
_You can see Google map API highlighting the county when searched._

![Screenshot 3](/Documentations/Ex3.png)
_You can see the Google API chart usage on Covid Data._

![Screenshot 4](/Documentations/DB.png)
_You can see some of the data we were storing in our database._

For More screenshots and details, please see the **CSC648-848 Spring 2023 Milestone5 Section 02 Team 06.pdf**
