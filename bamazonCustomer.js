var inquirer = require("inquirer");
var mysql = require("mysql");

//create connections
//connected to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mobylulu11!",
    database: "bamazon_db"
})

//list of all products
function productList(calledback) {
    connection.query("SELECT * from products", function (err, response) {
        if (err) throw err;
        calledback(response)
        // console.log(response)
    })
}

function update(newQuantity, id){
    connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity,id], function(err,response){
        if (err) throw err;
    })
}

//create function for inquirer
function customerSelect() {
    productList(function (response) {
        //create empty array
        var array = []
        //for loop over response
        for (var i = 0; i < response.length; i++) {
            array.push(
                response[i].id +
                " " +
                response[i].product_name +
                " || dept: " +
                response[i].department_name +
                " || price: $" +
                response[i].price +
                " || in stock: " +
                response[i].stock_quantity
            );
        }

        //inquirer
        inquirer.prompt([{
                type: "list",
                name: "product_choice",
                message: "What would you like to buy?",
                choices: array
            },
            {
                type: "input",
                name: "purchaseqty",
                message: "How many would you like to purchase?"
            }
        ]).then(answers => {
            var productNameId = answers.product_choice.split(" ");
            //selecting ID - ID from database
            productNameId = productNameId[0];
            //selecting the id from the array, and seperating it to take the quantity and subtract 1 to account for what has been chosen by the client
            var productNameIndex = productNameId[0] - 1;
            //grabbing quantity that user has selected to purchase
            var userQuantity = parseInt(answers.purchaseqty);
            //grabbing quantity available in the database
            var databaseQuantity = response[productNameIndex].stock_quantity;
            //now, were going to COMPARE the two with an if statement
            if (userQuantity > databaseQuantity) {
                console.log("Not enough in stock! Select a different quantity")
            } else if ( databaseQuantity > userQuantity) {
                console.log("Sold!");

                var newQuantity = databaseQuantity - userQuantity;
                update(newQuantity,productNameId)
            }
            customerSelect()
        })
    })

}

customerSelect()