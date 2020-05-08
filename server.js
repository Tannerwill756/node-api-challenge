const express = require("express");
const ProjectRouter = require("./projects/ProjectRouter");
const ActionsRouter = require("./projects/ActionsRouter");

const server = express();

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h1>Sprint Challange</h1>`);
});

server.use("/api/projects", ProjectRouter);
// server.use("/api/actions", ActionsRouter);

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(`[${today}] ${req.method} a ${req.url}`);
  next();
}

module.exports = server;
