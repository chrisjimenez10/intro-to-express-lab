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
        let randomInt = Math.floor(Math.random() * number);
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

// app.get("/collectibles/:index", (req, res)=>{
//     const indexNumber = req.params.index;
//     if(index === "0" || index === "1" || index === "2"){
//         res.send(`<h1>So, you want the ${collectibles[index].name}? For ${collectibles[index].price} it can be yours!</h1>`);
//         // console.log(collectibles[index]);
//     }else{
//         res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
//         // console.log(index);
//     }
// })

  //Second attempt to problem #3 with a more dynamic approach
app.get("/collectibles/:index", (req, res)=>{
    const indexNumber = parseInt(req.params.index); //Value that comes from the request in the URL is a string data type, so using parseInt to convert to number data type
    let collectibleItem;
    let collectiblePrice;
    const indexItemExists = collectibles.some((collectible, index)=>{
        collectibleItem = collectibles[index].name;
        collectiblePrice = collectibles[index].price;
        return indexNumber === index
    })
    if(indexItemExists === true){
        res.send(`So, you want the ${collectibleItem}? For ${collectiblePrice} it can be yours!`)
    }else if(isNaN(indexNumber)){
        res.send(`Please type a valid number`)
        }else{
        res.send(`This item is not yet in stock. Check back soon!`)
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

// app.get("/shoes", (req, res)=>{
//     const minPrice = req.query.minprice;
//     const maxPrice = req.query.maxprice;
//     const type = req.query.type;
//     if(minPrice > 49 && maxPrice < 500 && type === "heel"){
//         console.log(minPrice, maxPrice, type)
//         res.send(`Here is your shoe: ${shoes[6].name}`)
//     }else{
//         res.send(`Here is the entire list of shoes: ${shoes[0].name}, ${shoes[1].name}, ${shoes[2].name}, ${shoes[3].name}, ${shoes[4].name}, ${shoes[5].name}, ${shoes[6].name}`)
//     }
// })

//Feedback: I tried using array iterator methods to create more dynamic conditions - not sure how we should have completed this lab (hard coding min, max, type values or a more dynamic approach)
    //I tried to use array iterator methods to be more dyanmic and was able to do it: FEEDBACK please on the practicality of being dynamic vs. hard coding the values

//     app.get("/shoes", (req, res)=>{
//     const minPrice = parseInt(req.query.minprice);
//     const maxPrice = parseInt(req.query.maxprice);
//     const type = req.query.type;
//     let shoeItem;//Declare variable to store shoe name, so we can send to client
//     let objectprice = shoes.some((shoe)=>{
//         shoeItem = shoe.name //Store name of shoe from the array, should thhe conditions evaluate to TRUE 
//         return shoe.price > minPrice && shoe.price < maxPrice && shoe.type === type;
//     })
//     if(objectprice){
//         res.send(`Shoe exists: ${shoeItem}`)
//     }else{
//         res.send(`Shoe DOES NOT exists`)
//     }
// })
//     app.get("/shoes", (req, res)=>{
//     const minPrice = parseInt(req.query.minprice);
//     const maxPrice = parseInt(req.query.maxprice);
//     const type = req.query.type;
//     // let shoeArray = []; //I initailly pushed the elements that met the if... condition and used res.send() to send to client - but it displayed the names in array format
//     //let shoeItem;//Declare variable to store shoe name, so we can send to client
//     // let objectprice = shoes.some((shoe)=>{
//     //     shoeItem = shoe.name //Store name of shoe from the array, should thhe conditions evaluate to TRUE 
//     //     return shoe.price > minPrice && shoe.price < maxPrice && shoe.type === type;
//     // })
//     shoes.forEach((shoe)=>{
//         if(shoe.price > minPrice && shoe.price < maxPrice && shoe.type === type){
//             // shoeArray.push(shoe.name)
//             res.write(`<h1>${shoe.name}</h1>`) //Asked Chat GPT array methods I can use to send elements in an array to the client using the respond object and I learned about the write() method - It allows us to send CHUNK of data in smaller chunks or when streaming data (so it went from array chunk, to smaller individual value chunks(individual strings)
//             console.log(shoe)
//         }
//     })
//     res.end(); //Need to use this method to ensure the response ENDS/Terminates and can send all the values to the client (it loads infinitely and won't send the response if we don't have this res.end()) - learned that using res.end() depends on use case, but in this case when we're iterating over an array and sending mulitple small chunks of data, it's appropriate to terminate the response so it can send it to the client (otherwise it will keep waiting on events to respond to)
    
//     // if(objectprice){
//     //     res.send(`Shoe exists: ${shoeItem}`)
//     // }else{
//     //     res.send(`Shoe DOES NOT exists`)
//     // }
// })

app.get("/shoes", (req, res)=>{
    const minPrice = parseInt(req.query.minprice);
    const maxPrice = parseInt(req.query.maxprice);
    const type = req.query.type;
    if (!isNaN(minPrice) && !isNaN(maxPrice) && type){ //Using bang operator on isNaN() for the query values because parseInt CAN return NaN if the user provided characters that cannot be converted to a valid number
        let shoesArray = shoes.filter((shoe)=>{
        return shoe.price > minPrice && shoe.price < maxPrice && shoe.type === type   
        })
        shoesArray.forEach((shoe)=>{
            res.write(`<h1>${shoe.name}</h1>`)
        })
    }else{ //I was having an issue in the preivous attempt of using an else statement where the first and second condition code expressions where being executed: Looked up on chat gpt why that was the case using the write() method and learned that I was sending html content to the client with a single forEach() - I had to create the filtered array that matched the conditions we are looking for and then iterate over that new filtered array with a forEach to access the shoe name
        shoes.forEach((shoe)=>{ //Then, for the else statement I needed another SEPARATE forEach() to iterate over the original array to display ALL shoe names if the strict condition in the if statement was not met
            res.write(`<h1>${shoe.name}</h1>`)
        })
    }
    res.end();
})

