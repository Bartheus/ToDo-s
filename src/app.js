require("dotenv").config({ path: "../../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const serveStatic = require("serve-static");

const app = express(); // create your express app
const router = express.Router();

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
let client;
let mongoClient = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoClient.connect((err, db) => {
  // returns db connection
  if (err != null) {
    console.log(err);
    return;
  }
  client = db;
});

// make app use dependencies
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.post("/addTodo", (req, res) => {
  const collection = client.db("todosapp").collection("todos");
  let todo = req.body.todo; // parse the data from the request's body
  collection.insertOne({ title: todo }, function (err, results) {
    if (err) {
      console.log(err);
      res.send("");
      return;
    }
    res.send(results.ops[0]); // returns the new document
  });
});
app.post("/deleteTodo", (req, res) => {
  const collection = client.db("todosapp").collection("todos");
  // remove document by its unique _id
  collection.removeOne(
    { _id: mongo.ObjectID(req.body.todoID) },
    function (err, results) {
      if (err) {
        console.log(err);
        res.send("");
        return;
      }
      res.send(); // return
    }
  );
});
app.get("/todo", (req, res) => {
  const collection = client.db("todosapp").collection("todos");
  collection.find().toArray(function (err, results) {
    if (err) {
      console.log(err);
      res.send([]);
      return;
    }

    res.send(results);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(serveStatic(__dirname + "/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "dist", "index.html"));
  });
}

const port = process.env.PORT || 8081;
app.use("/", router);
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
}); // client is already running on 8080
