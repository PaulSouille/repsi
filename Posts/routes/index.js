const fs   = require("fs");
const path = require("path");
const posts = require("./posts")

const routes = [].concat(posts);

module.exports = routes;