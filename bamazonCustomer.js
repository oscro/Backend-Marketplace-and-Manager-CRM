var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require("table");
var total = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

var showProducts = function() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      var info = [["ID", "Item Name", "Department", "Price", "Stock"]];
      res.forEach(function(pro) {
          info.push([pro.item_id, pro.product_name, pro.department_name, "$" + pro.price, pro.stock_quantity])
      });
      var display = table(info);
      console.log(display);
  });
};

function start() {
  showProducts();
  setTimeout(function(){
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "Would you like to buy an item?",
      choices: ["Yes, I would love to buy some products!", "No, Thank You!"]
    })
    .then(function(answer) {
      
      if (answer.start === "Yes, I would love to buy some products!") {

         
         setTimeout(buyProducts, 500);
        
      }
      else if(answer.start === "No, Thank You!") {
        console.log("Thank you for shopping with Bamazon!")
        connection.end();
      }
    });
  }, 1000);
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

  connection.query("SELECT stock_quantity FROM products WHERE item_id = ?;", [itemId], function(err, res){

  if (parseInt(res[0].stock_quantity) >= parseInt(purchaseQuantity)){
  
  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?;", [purchaseQuantity, itemId], function(err, res) {
    if (err) throw err; 
  });

  connection.query("SELECT price FROM products WHERE item_id = ?;", [itemId], function(err, res){
    calcTotal(parseInt(purchaseQuantity), parseInt(res[0].price))
    console.log("Total: " + "$" + total + ".00");

  });

  } else {
    console.log("Sorry We don't have enough stock to fulfill your order. Please order a lesser amount.");
  };
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
};

// function showProducts() {
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err; 
  
//       console.log("ID || Product Name || Department || Price || Stock");
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + ".00 | " + res[i].stock_quantity);
//       };
//     });
//     //console.log("THIS IS QUERY SQL " + query.sql);
//   };
