//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//require colors
var colors = require('colors');
//this requires the cli-table
var Table = require('cli-table');
//this makw the top row of the table
var table = new Table({ head: ["Product", "Item ID", "Department", "Price", "Quantity"] });
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

//this makes a purty table
table.push(
  { 'Johnny Dakota Jacket': ['10928', 'Bayside', '$199.95', '5'] }
  , { 'Weekend Vacation at Malibu Sands': ['20194', 'Malibu Sands', '$499.00', '3'] }
  , { 'Tiger Mascot Costume': ['29185', 'Malibu Sands', '$45.99', '18'] }
  , { 'Elvis Statue': ['30192', 'Powers Residence', '$84.50', '25'] }
  , { 'Buddy Bands': ['38111', 'Bayside', '$500.00', '8'] }
  , { 'Rod Belding Rafting Lessons': ['39658', 'Bayside', '$35.99', '30'] }
  , { 'Jar of Screech Spaghetti Sauce': ['48102', 'Bayside', '$7.99', '200'] }
  , { 'Opened Bottle of Caffeine Pills': ['49837', 'Powers Residence', '$15.99', '10'] }
  , { 'Tuttle Drivers Ed Car': ['94012', 'Bayside', '$950.25', '28'] }
  , { 'Zack Attack Tickets': ['94817', 'Bayside', '$65.99', '70'] }
);

console.log(table.toString());

//this is my mySQL connection
connection.connect(function (err) {
  if (err) throw err;
  //this was to test my connection--don't need it now
  //console.log("hey, cool---we are connected!");
  start();

});

function showProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
  });
}

// Creating a function to ask customer which product they would like to purchase.
function start() {
  inquirer.prompt({
    name: "start",
    type: "rawlist",
    message: "Welcome to the 'Saved by the Bell' store. Would you like to do some shopping today?",
    choices: ["YES", "NO"]
  })
    .then(function (answer) {
      // based on their answer, either ask another prompt or exit the store
      if (answer.start.toUpperCase() === "YES") {

        showProducts();
        customerShop();
      }
      //if they don't want to shop...
      else {
        console.log("Then you'd better hurry home. 'Save by the Bell' is on!" + "\n");
        connection.end();
      }
    });
}

// function to handle posting items up for sale
function customerShop() {
  // prompt for what customer wants to buy and how many they would like
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Type in the product ID for the item you'd like to buy." + "\n",
        validate: function (value) {
          //checking for correct number entered
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "amount",
        type: "input",
        message: "How many of this item would you like?" + "\n",
        validate: function (value) {
          //checking for correct quantity added
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the database
      var query = "SELECT * FROM products WHERE ?";
      connection.query(query, { item_id: answer.item }, function (err, res) {

        // this loop is to check if the quanity matches and update the database inventory
        for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name
            + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity + "\n" + "\n");

          if (answer.amount > res[i].stock_quantity) {
            console.log("Sorry, we don't have that many in stock. Please select a smaller number." + "\n" + "\n");
            start();
          }
          else {
            var orderCost = (res[i].price * answer.amount)

            //console out a purchased item
            console.log("\n" + "========================================")
            console.log("Your purchase is complete." + "\n");
            console.log("The final amount is $" + orderCost + "." + "\n");
            console.log("Your " + res[i].product_name + " will be delivered soon!");
            console.log("\n" + "========================================" + "\n");

            var newInventoryAmount = (res[i].stock_quantity - answer.amount);

            var inventoryUpdate = "UPDATE products SET ? WHERE ?"

            connection.query(inventoryUpdate, [{ stock_quantity: newInventoryAmount }, { item_id: answer.item }], function (err, res) {

            });
            connection.end();

          }
        }
      })
    });
}
