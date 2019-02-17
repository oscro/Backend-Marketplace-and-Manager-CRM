var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  showProducts();
  //start();
});


function start() {
  //Show list of products available
  inquirer
    .prompt({
      name: "buyItem",
      type: "list",
      message: "Would you like to buy an item?",
      choices: ["PURCHASE", "EXIT"]
    })
    .then(function(answer) {
      
      if (answer.buyItem === "PURCHASE") {
        //function to buy item
        console.log("Sub for purchase item");
      }
      else if(answer.postOrBid === "EXIT") {
        console.log("Thank you for shopping with Bamazon!")
        connection.end();
      }
    });
}

function showProducts() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err; 
      console.log("ID || Product Name || Department || Price || Stock");
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      };
    });
    console.log(query.sql);
    connection.end();
  };
