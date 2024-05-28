# README

## Project Overview

This document provides an explanation of the key functionality within the `server.js` file. The file sets up an Express server and handles various operations related to user authentication, data management, and interactions with a MySQL database. Below is a detailed breakdown of the main components and operations.

## Key Modules and Middleware

1. **Modules**: The script uses several Node.js modules:

   - `mysql`: For connecting and interacting with the MySQL database.
   - `express`: A web framework for building the server.
   - `body-parser`: To parse incoming request bodies.
   - `cors`: To enable Cross-Origin Resource Sharing.
   - `bcrypt`: For hashing passwords.
   - `validator`: For sanitizing and validating inputs.

2. **Middleware**:
   - `cors`: Configured to allow requests from any origin (`{ origin: "*" }`).
   - `body-parser`: Configured to parse both URL-encoded and JSON request bodies.

## Database Connection

Database of choise used was AWS DB. A connection to the MySQL database is established using the `mysql` module. The connection details (host, port, user, password, and database) are specified, and the connection is tested for errors. As of the moment, data for hosts, and password has been removed due to database being turned off.

```javascript
const database = mysql.createConnection({
  host: "",
  port: 3306,
  user: "admin",
  password: "",
  database: "Main",
});

database.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to database!");
});
```

## Routes and Their Functionality

### 1. Registration (`/registration`)

Handles new user registration by:

- Validating if the email and username already exist.
- Hashing the password using `bcrypt`.
- Inserting the new user into the `Account` table.

### 2. Login (`/login`)

Handles user login by:

- Validating the email and password.
- Using `bcrypt` to compare the provided password with the stored hashed password.
- Returning user information if authentication is successful.

### 3. Forgot Password (`/forgot-password`)

Handles password recovery by:

- Verifying the user's email and security answer.
- Returning account information if the verification is successful.

### 4. Home Page Data Fetch (`/check`)

Fetches data related to a specified county or city by:

- Constructing and executing a SQL query to retrieve information from multiple tables (`Location`, `Cities`, `Covid`, `Security`, `Weather`, `Wildfire`).

### 5. Security Search (`/searchSecurity`)

Searches for security incidents by:

- Constructing and executing a SQL query to search for incidents by county, city, zip, or incident type.

### 6. Wildfire Search (`/searchWildfire`)

Searches for wildfires by:

- Constructing and executing a SQL query to search for wildfires by county, city, zip, or wildfire name.

### 7. Change Password (`/changePassword`)

Allows users to change their password by:

- Verifying the old password.
- Hashing the new password and updating it in the database.

### 8. New Password (`/newPassword`)

Sets a new password for the user by:

- Hashing the new password and updating it in the database.

### 9. Add Weather Data (`/addWeather`)

Adds or updates weather data for a specific county by:

- Checking if the county exists in the `Location` table.
- Inserting or updating the weather data in the `Weather` table.

### 10. Add Covid Data (`/addCovid`)

Adds or updates Covid-19 data for a specific county by:

- Checking if the county exists in the `Location` table.
- Inserting or updating the Covid-19 data in the `Covid` table.

### 11. Add Wildfire Data (`/addWildfire`)

Adds or updates wildfire data for a specific county by:

- Checking if the county exists in the `Location` table.
- Inserting or updating the wildfire data in the `Wildfire` table.

### 12. Add Security Data (`/addSecurity`)

Adds or updates security incident data for a specific county by:

- Checking if the county exists in the `Location` table.
- Inserting or updating the security data in the `Security` table.

### 13. Upgrade Account (`/upAccount`)

Handles the upgrade of user accounts from `regular` to `official` by:

- Inserting the upgrade request details into the `AccountConfirmation` table.

### 14. Set Favorite County (`/setCounty`)

Allows users to set a preferred county by:

- Updating the `prefCounty` field in the `Account` table for the specified user.

### 15. Remove Favorite County (`/removeCounty`)

Allows users to remove the preferred county by:

- Setting the `prefCounty` field to `NULL` in the `Account` table for the specified user.
