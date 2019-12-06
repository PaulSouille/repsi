const fs   = require("fs");
const path = require("path");
const posts = require("./posts")
const comments = require("./comments")
const routes = [].concat(posts,comments);

module.exports = routes;