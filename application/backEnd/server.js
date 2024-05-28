const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const validator = require("validator");
// Create a connection to the database
// Removed the database information form the code 5/28/2024
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
//Json Parsing purposes
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Handling the Registration here
app.post("/registration", (req, res) => {
  const { username, email, password, secAnswer, account_type } = req.body;

  const formattedUsername =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

  //checking if the email has already signed up here
  const query = "SELECT * FROM Account WHERE email = ?";
  const checkUsername = "SELECT * FROM Account WHERE username = ?";

  // Use an array to hold the parameters that will be bound to the query
  const queryParams = [email];
  const checkUsernameParams = [username];

  database.query(query, queryParams, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      console.log("Did not found an account with that email.");

      database.query(checkUsername, checkUsernameParams, (err, result) => {
        //Checking username duplicate
        if (err) throw err;
        if (result.length === 0) {
          console.log("Did not found an account with that username.");
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, function (err, hash) {
              // Use parameterized queries for inserting data as well
              const insertQuery =
                "INSERT INTO Account (username, email, password, secAnswer, account_type) VALUES (?, ?, ?, ?, ?)";
              const insertParams = [
                formattedUsername,
                email,
                hash,
                secAnswer,
                account_type,
              ];

              database.query(insertQuery, insertParams, (err, result) => {
                if (err) throw err;

                console.log("New account registered: ", result.insertId);
                res.send("New account registered");
                console.log(`New Account Registered.`);
              });
            });
          });
        } else {
          res.status(401).send("Account already exists with that username.");
        }
      });
    } else {
      res.status(401).send("Account already exists with that email.");
    }
  });
});

//Handling the Login here
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM Account WHERE email = ?";
  database.query(query, [email], (err, result) => {
    console.log(req.body);
    if (err) throw err;

    if (result.length === 0) {
      res.status(500).send("Did not find any account with that email.");
      console.log("Did not found an account with that email.");
    } else {
      console.log("Found an account with that Email.");
      const user = result[0];
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) {
          console.log("Something went wrong. ");
        } else if (match) {
          console.log("it is a match");
          res.status(200).send({
            message: `Logged in as ${user.username}, and Status is ${user.account_type}`,
            username: user.username,
            email: user.email,
            account_type: user.account_type,
            favCounty: user.prefCounty,
          }); // Include the username in the response body
          console.log(`Logged in as ${user.username}`);
        } else {
          res
            .status(401)
            .send(
              "Invalid login credentials while comparing. Please try again."
            );
        }
      });
    }
  });
});

app.post("/forgot-password", (req, res) => {
  const { email, secAnswer } = req.body;
  const query = "SELECT * FROM Account WHERE email=? AND SecAnswer=?";
  database.query(query, [email, secAnswer], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.status(401).send("Wrong Answer");
    } else {
      const user = result[0];
      res.send({
        message: `Account info ${user.username}`,
        email: user.email,
      }); // Include the username in the response body
      console.log(`Account Email ${user.email}`);
    }
  });
});

//Handling the Home Page here
app.get("/check", (req, res) => {
  const searchTerm = `%${validator.escape(req.query.selectedCounty)}%`;
  // console.log("params: " + req.params);
  // console.log("query: " + req.query);
  // console.log("body: " + req.body);

  //load in the metrics tables from database
  if (searchTerm !== "") {
    const query = `SELECT DISTINCT L.*,
        C.*, 
        S.*, 
        W.*,
        Wi.*,
        W.warnings AS weather_warnings, 
        Wi.warnings AS wildfire_warnings
        FROM Location L  
        JOIN Cities Ct ON L.county = Ct.county
        JOIN Covid C ON L.county = C.county
        JOIN Security S ON L.county = S.county
        JOIN Weather W ON L.county = W.county 
        JOIN Wildfire Wi ON L.county = Wi.county 
        WHERE L.county LIKE ? 
        OR Ct.city LIKE ? OR Ct.zip LIKE ?`;

    const params = [searchTerm, searchTerm, searchTerm];

    database.query(query, params, (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        res.send("No data found.");
      } else {
        res.send(result);
        console.log(result);
      }
    });
  }
});

//handling the search on the security page, which can search for the incident type
app.get("/searchSecurity", (req, res) => {
  const searchTerm = validator.escape(req.query.selectedCounty);
  let query = "SELECT * FROM Location";

  if (searchTerm !== "") {
    query = `SELECT DISTINCT L.*, S.*
      FROM Location L
      JOIN Security S ON L.county = S.county
      JOIN Cities Ct ON L.county = Ct.county
      WHERE L.county LIKE ?
      OR Ct.city LIKE ? 
      OR Ct.zip LIKE ?
      OR S.incidentType LIKE ?`;
    const params = [
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
    ];
    database.query(query, params, (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        res.send("No data found.");
      } else {
        res.send(result);
        console.log(result);
      }
    });
  } else {
    query = `SELECT NULL FROM Location WHERE FALSE;`;
    database.query(query, (err, result) => {
      if (err) throw err;

      res.send(result);
      console.log(result);
    });
  }
});

//handling the search on the wildfire page, which can search for the wildfire name
app.get("/searchWildfire", (req, res) => {
  const searchTerm = validator.escape(req.query.selectedCounty);
  let query = "SELECT * FROM Location";

  if (searchTerm !== "") {
    query = `SELECT DISTINCT L.*, Wi.*,
    Wi.warnings AS wildfire_warnings
    FROM Location L
    JOIN Wildfire Wi ON L.county = Wi.county
    JOIN Cities Ct ON L.county = Ct.county
    WHERE L.county LIKE ?
    OR Ct.city LIKE ? 
    OR Ct.zip LIKE ?
    OR Wi.name LIKE ?`;
    const params = [
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
    ];
    database.query(query, params, (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        res.send("No data found.");
      } else {
        res.send(result);
        console.log(result);
      }
    });
  } else {
    query = `SELECT NULL FROM Location WHERE FALSE;`;
    database.query(query, (err, result) => {
      if (err) throw err;

      res.send("No data found.");
    });
  }
});

app.post("/changePassword", (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const selectQuery = `SELECT * FROM Account WHERE email='${email}'`;
  database.query(selectQuery, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      console.log("Incorrect Email entered");
      res
        .status(401)
        .send({ success: false, message: "Incorrect Email entered." });
    } else {
      //decrypt and make sure old password is correct
      const user = result[0];
      bcrypt.compare(oldPassword, user.password, function (err, match) {
        if (err) {
          console.log("Something went wrong. ");
          res.status(500).send({
            success: false,
            message: "Something went wrong. Please try again.",
          });
        } else if (match) {
          console.log("Old password is correct.");
          //encrypt new password
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              console.log("Something went wrong. ");
              res.status(500).send({
                success: false,
                message: "Something went wrong. Please try again.",
              });
            } else {
              bcrypt.hash(newPassword, salt, function (err, hash) {
                if (err) {
                  console.log("Something went wrong. ");
                  res.status(500).send({
                    success: false,
                    message: "Something went wrong. Please try again.",
                  });
                } else {
                  const updateQuery = `UPDATE Account SET password='${hash}' WHERE email='${email}'`;
                  database.query(updateQuery, (err, result) => {
                    if (err) throw err;
                    res.send({
                      success: true,
                      message: "Password has been changed successfully.",
                    });
                  });
                }
              });
            }
          });
        } else {
          console.log("Old password is incorrect.");
          res
            .status(401)
            .send({ success: false, message: "Old password is incorrect." });
        }
      });
    }
  });
});

app.post("/newPassword", (req, res) => {
  const { email, newPassword } = req.body;
  const selectQuery = `SELECT * FROM Account WHERE email= '${email}'`;

  database.query(selectQuery, (err, result) => {
    // if (err) throw err;

    if (result.length === 0) {
      console.log("Unusual error, no account exists.");
      res
        .status(401)
        .send({ success: false, message: "Unusual error, no account exists." });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, function (err, hash) {
          const updateQuery = `UPDATE Account SET password='${hash}' WHERE email='${email}'`;

          database.query(updateQuery, (err, result) => {
            if (err) throw err;
            res.send({
              success: true,
              message: "Password has been changed successfully.",
            });
          });
        });
      });
    }
  });
});

//Handling the Adding information to the Weather Table here
app.post("/addWeather", (req, res) => {
  const { county, aqi, temperature, warnings } = req.body;
  console.log(req.body);
  // Check if the county already exists in the Location table
  const checkQuery = `SELECT county FROM Location WHERE county = ?`;
  database.query(checkQuery, [county], (err, result) => {
    if (err) {
      console.error("Error checking location data:", err);
      res.status(500).send("Error checking location data");
      return;
    }

    if (result.length === 0) {
      // County does not exist in Location table
      console.error(`County '${county}' does not exist in Location table`);
      res
        .status(400)
        .send(`County '${county}' does not exist in Location table`);
      return;
    }

    // County exists in Location table, insert or update the weather record
    const addOrUpdateWeatherQuery = `UPDATE Weather 
                                  SET aqi = '${aqi}',
                                      temperature = '${temperature}',
                                      warnings = '${warnings}'
                                  WHERE county = '${county}'`;

    database.query(
      addOrUpdateWeatherQuery,
      [county, aqi, temperature, warnings],
      (err, result) => {
        if (err) {
          console.error("Error updating weather data:", err);
          res.status(500).send("Error updating weather data");
          return;
        }
        console.log("Updated weather data");
        res.send("Updated successfully");
      }
    );
  });
});

//Handling the Adding information to the Covid Table here
app.post("/addCovid", (req, res) => {
  const { county, confirmedCases, deaths, recoveries } = req.body;
  console.log(req.body);
  const checkQuery = `SELECT county FROM Location WHERE county = ?`;
  database.query(checkQuery, [county], (err, result) => {
    if (err) {
      console.error("Error checking location data:", err);
      res.status(500).send("Error checking location data");
      return;
    }

    if (result.length === 0) {
      // County does not exist in Location table
      console.error(`County '${county}' does not exist in Location table`);
      res
        .status(400)
        .send(`County '${county}' does not exist in Location table`);
      return;
    }

    const addOrUpdateCovidQuery = `UPDATE Covid
                                  SET confirmedCases = '${confirmedCases}',
                                      deaths = '${deaths}',
                                      recoveries = '${recoveries}'
                                  WHERE county = '${county}'`;

    database.query(
      addOrUpdateCovidQuery,
      [county, confirmedCases, deaths, recoveries],
      (err, result) => {
        if (err) {
          console.error("Error inserting or updating covid data:", err);
          res.status(500).send("Error inserting or updating covid data");
          return;
        }
        console.log("Updated Covid-19 data");
        res.send("Updated successfully");
      }
    );
  });
});

//Handling the Adding information to the Wildfire Table here
app.post("/addWildfire", (req, res) => {
  const { county, name, dateStart, dateEnd, warnings, casualties } = req.body;
  console.log(req.body);
  const checkQuery = `SELECT county FROM Location WHERE county = ?`;
  database.query(checkQuery, [county], (err, result) => {
    if (err) {
      console.error("Error checking location data:", err);
      res.status(500).send("Error checking location data");
      return;
    }

    if (result.length === 0) {
      // County does not exist in Location table
      console.error(`County '${county}' does not exist in Location table`);
      res
        .status(400)
        .send(`County '${county}' does not exist in Location table`);
      return;
    }

    const addOrUpdateWildfireQuery = `UPDATE Wildfire 
                                  SET name = '${name}',
                                      dateStart = '${dateStart}',
                                      dateEnd = '${dateEnd}',
                                      warnings = '${warnings}',
                                      casualties = '${casualties}'
                                  WHERE county = '${county}'`;

    database.query(
      addOrUpdateWildfireQuery,
      [county, name, dateStart, dateEnd, warnings, casualties],
      (err, result) => {
        if (err) {
          console.error("Error inserting or updating wildfires data:", err);
          res.status(500).send("Error inserting or updating wildfires data");
          return;
        }
        console.log("Updated wildfires data");
        res.send("Updated successfully");
      }
    );
  });
});

//Handling the Adding information to the Security Table here
app.post("/addSecurity", (req, res) => {
  const {
    county,
    date,
    time,
    incidentType,
    incidentDescription,
    officerName,
    badgeNumber,
    incidentReportNumber,
    address,
  } = req.body;
  console.log(req.body);
  const checkQuery = `SELECT county FROM Location WHERE county = ?`;
  database.query(checkQuery, [county], (err, result) => {
    if (err) {
      console.error("Error checking location data:", err);
      res.status(500).send("Error checking location data");
      return;
    }

    if (result.length === 0) {
      // County does not exist in Location table
      console.error(`County '${county}' does not exist in Location table`);
      res
        .status(400)
        .send(`County '${county}' does not exist in Location table`);
      return;
    }

    const addOrUpdateSecurityQuery = `UPDATE Security
                                  SET date = '${date}',
                                      time = '${time}',
                                      incidentType = '${incidentType}',
                                      incidentDescription = '${incidentDescription}',
                                      officerName = '${officerName}',
                                      badgeNumber = '${badgeNumber}',
                                      incidentReportNumber = '${incidentReportNumber}',
                                      address = '${address}'
                                  WHERE county = '${county}'`;

    database.query(
      addOrUpdateSecurityQuery,
      [
        county,
        date,
        time,
        incidentType,
        incidentDescription,
        officerName,
        badgeNumber,
        incidentReportNumber,
        address,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting or updating security data:", err);
          res.status(500).send("Error inserting or updating security data");
          return;
        }
        console.log("Updated security data");
        res.send("Updated successfully");
      }
    );
  });
});

//Handling Upgrading the account from `regular` to `official` here
app.post("/upAccount", (req, res) => {
  const { email, position, companyName, managerContact, managerName } =
    req.body;
  console.log(req.body);
  const upgradeAccountInfo = `INSERT INTO AccountConfirmation (email, position_title, company_name, manager_contact, manager_name)
  VALUES ('${email}', '${position}', '${companyName}', '${managerContact}', '${managerName}')`;

  database.query(
    upgradeAccountInfo,
    [email, position, companyName, managerContact, managerName],
    (err, result) => {
      if (err) {
        console.error("Error inserting Account Confirmation", err);
        res.status(500).send("Error inserting Account Confirmation");
        return;
      }
      console.log("Account confirmation has been received");
      res.send("Account confirmation has been received");
    }
  );
});
//Add Favorite County to user's account
app.post("/setCounty", (req, res) => {
  const { county, emailAuth } = req.body;
  console.log(req.body);
  const selectAccount = `SELECT * FROM Account WHERE email='${emailAuth}' `;

  database.query(selectAccount, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      console.log("No account found!");
      res.status(401).send({ success: false, message: "No account found!" });
    } else {
      const user = result[0];
      const updateQuery = `UPDATE Account SET prefCounty='${county}' WHERE email='${emailAuth}'`;
      database.query(updateQuery, (err, result) => {
        if (err) throw err;
        res.send({
          success: true,
          message: "Preferred County Updated succesfully.",
        });
      });
    }
  });
});
//Remove county off user's account.
app.post("/removeCounty", (req, res) => {
  const { emailAuth } = req.body;
  console.log(req.body);
  const selectAccount = `SELECT * FROM Account WHERE email='${emailAuth}' `;

  database.query(selectAccount, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      console.log("No account found!");
      res.status(401).send({ success: false, message: "No account found!" });
    } else {
      const updateQuery = `UPDATE Account SET prefCounty = NULL WHERE email='${emailAuth}'`;
      database.query(updateQuery, (err, result) => {
        if (err) throw err;
        res.send({
          success: true,
          message: "Preferred County Updated succesfully.",
        });
      });
    }
  });
});
app.listen(3001, () => {
  console.log("Server running on 3001");
});
