const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mysql = require("mysql2/promise");
const path = require("path");
const router = require('./route');

const app = express();
const db = require("./db");
const PORT = 3000;


app.use(express.static(__dirname + "/../css"));
app.use(express.static(__dirname + "/../img"));
app.use(express.static(__dirname + "/../component"));
app.use(express.static(__dirname + "/../html"));
app.use(express.static(__dirname + "/../js"));
// app.use(express.static(__dirname + "/../json"));


app.use(express.json());
// app.use(express.static(path.join(__dirname, "index.html")));

app.use('/', router);

const connectToDatabase = async () => {
  try {
    const connection = await db.getConnection();
    await connection.query("SELECT 1");
    connection.release();
    console.log("Database is connected");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Can't connect to the database" + "\n" + err.message);
  }
};
/**
 * @swagger
 * /tools/{category}:
 *   get:
 *     summary: Get tools by category
 *     tags: [Tools]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category of the tools
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{ "toolName": "Example Tool", "description": "Tool description" }]
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    info: {
      title: "Billiard Tools API",
      version: "1.0.0",
      description: "API for managing billiard tools",
    },
    tags: [
      {
        name: "Tools",
        description: "API for managing billiard tools",
      },
    ],
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
  apis: ["./route.js" , ],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/tools/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const query = "SELECT * FROM tools WHERE category = ?";
    const [rows] = await db.query(query, [category]);
    res.send(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});








app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});



connectToDatabase();
