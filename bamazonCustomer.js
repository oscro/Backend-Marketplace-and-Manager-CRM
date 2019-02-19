var mysql = require("mysql");
var inquirer = require("inquirer");
var total = 0;


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
  start();
});



function start() {

  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "Would you like to buy an item?",
      choices: ["Yes! Show me the goods!", "No, Thank You!"]
    })
    .then(function(answer) {
      
      if (answer.start === "Yes! Show me the goods!") {

         showProducts();
         setTimeout(buyProducts, 1000);
        
      }
      else if(answer.start === "No, Thank You!") {
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
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + ".00 | " + res[i].stock_quantity);
      };
    });
    //console.log("THIS IS QUERY SQL " + query.sql);
  };

function buyProducts(){
  
  inquirer
    .prompt([
    {
      type: 'input',
      name: 'chooseItem',
      message: 'Which item would you like to buy? Choose by ID number!',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many would you like to buy?',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function(answer) {
          calcUserOrder (answer.quantity, answer.chooseItem);
          console.log('Thank you for your purchase!');
    });
}

function calcUserOrder (purchaseQuantity, itemId) {
  
  var query = connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?;", [purchaseQuantity, itemId], function(err, res) {
    if (err) throw err; 
    // console.log("The updated inventory: ")
    // showProducts();
    // setTimeout(start, 2000);
  });

  connection.query("SELECT price FROM products WHERE item_id = ?;", [itemId], function(err, res){
    calcTotal(parseInt(purchaseQuantity), parseInt(res[0].price))
    console.log("Total: " + "$" + total + ".00");

  });

  inquirer
    .prompt({
      name: "continue",
      type: "list",
      message: "Would you like to buy another item?",
      choices: ["Sure! Why not? I love buying things", "No, Thank You!"]

    }).then(function(answer) {

      if(answer.continue == "Sure! Why not? I love buying things"){
        showProducts();
        setTimeout(buyProducts, 1000);
      } else {
        console.log("Thank you for shopping with Bamazon!");
        console.log("Your Total for Today is: " + "$" + total + ".00");
        connection.end();
      }   
    });

};

function calcTotal (amountPurchased, cost) {
  total += amountPurchased * cost; 
}
