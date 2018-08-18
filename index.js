console.log('here')
const d3 = require('d3')
const createUsers = require('./resources/create_users.js')
const createTree = require('./resources/create_tree.js')

const users = createUsers(20)
const nestedUsers = createTree(users)
console.log("nestedUsers", nestedUsers);

const margin = {top: 20, right: 120, bottom: 20, left: 120}
const width = 960 - margin.right - margin.left
const height = 500 - margin.top - margin.bottom

// const tree = d3.layout.tree()
// 	.size([height, width]);

const svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")


// console.log("users", users);
d3.select('#people_view')
	.append('text')
	.text('Hello there.')
