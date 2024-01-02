// const express = require("express");
// const cors = require("cors");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const mysql = require("mysql2/promise");
// const path = require("path");
// const router = require('./api/route');

// const app = express();
// const db = require("./api/db");
// const PORT = 3000;


// app.use(express.static(__dirname + "/css"));
// app.use(express.static(__dirname + "/img"));

// app.use(cors());
// app.use(express.json());
// // app.use(express.static(path.join(__dirname, "index.html")));

// // Use the routes defined in route.js
// app.use('/', router);

// const connectToDatabase = async () => {
//   try {
//     const connection = await db.getConnection();
//     await connection.query("SELECT 1");
//     connection.release();
//     console.log("Database is connected");

//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("Can't connect to the database" + "\n" + err.message);
//   }
// };

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Notes App API",
//       version: "1.0.0",
//       description: "API for managing notes",
//     },
//   },
//   apis: ["app.js"],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get("/tools/:name", async (req, res) => {
//   const name = req.params.name;
//   try {
//     const [rows] = await db.query("SELECT * FROM tools WHERE name = ?", [name]);
//     res.send(rows);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke 💩");
// });

// connectToDatabase();
