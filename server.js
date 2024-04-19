//Import Express + Morgan (nodemon)
const express = require("express");
const morgan = require("morgan");
//Instance of Express
    //Variable to hold Express as a function (This helps us create an Express application when the express() function is called): Helping us set up our server
const app = express();

//Port
const port = 3000;

//Start Express Server
    //Using listen() method that says: "Express server (app) is listening on port 3000 (port) for requests from client"
app.listen(port, ()=>{
    console.log("Listening on port 3000");
})

//Mount Morgan middleware function to Express Instance (app): Logging middleware function
app.use(morgan("dev"));

//1.Be Polite, Greet the user
app.get("/greetings/:username", (req, res)=>{
    const username = req.params.username;
    console.log(username);
    res.send(`<h1>What a delight it is to see you once more, ${username}</h1>`);
})

//2.Rolling the Dice
app.get("/roll/:number", (req, res)=>{
    const number = req.params.number;
    // console.log(number)
    if(isNaN(number)){
        res.send(`<h1>You must specify a valid number</h1>`);
        console.log("not a valid number")
    }else{
        let randomInt = Math.floor(Math.random() * number) + 1;
        res.send(`<h1>You rolled a ${randomInt}</h1>`);
        console.log("valid number")
    }
})

//3.I want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get("/collectibles/:index", (req, res)=>{
    const index = req.params.index;
    if(index === "0" || index === "1" || index === "2"){
        res.send(`<h1>So, you want the ${collectibles[index].name}? For ${collectibles[index].price} it can be yours!</h1>`);
        // console.log(collectibles[index]);
    }else{
        res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
        // console.log(index);
    }
})

//Using Query Parameters
//4.Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
//Query Parameters:
    // min-price: excludes shoes below this price
    // max-price: excludes sheos above this price
    // type: shows only shoes of the specified type
    // No parameters: responds with the full list of shoes

app.get("/shoes", (req, res)=>{
    const minPrice = req.query.price;
    if(minPrice <= 100){
        console.log(minPrice);
        res.send(`<h1>Please indicate shoes higher than $100</h1>`)
    }else{
        res.send(`<h1>Shoes available: ${shoes[1].name}, ${shoes[2].name}, ${shoes[5].name}, and ${shoes[6].name}</h1>`);
        //Try array iterator methods to make strings out of the names in shoes array
    }
})


