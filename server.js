const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";

const client = new MongoClient(MONGO_URL);

async function startServer() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db("apnacollege-db");

        // GET all users
        app.get("/getUsers", async (req, res) => {
            const data = await db.collection("users").find({}).toArray();
            res.send(data);
        });

        // POST new user
        app.post("/addUser", async (req, res) => {
            const userObj = req.body;

            const data = await db.collection("users").insertOne(userObj);

            console.log("Data inserted");

            res.send("User added successfully");
        });

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();
