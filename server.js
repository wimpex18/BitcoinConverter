const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){
    let enterbit = Number(req.body.enterbit);
    let currency = req.body.currency;
    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;

    axios.get(url).then(function(response){
        let price;

        console.log("Server status code " , response.status);
        //console.log(response);

        if(currency === "EUR"){
            price = response.data.bpi.EUR.rate_float;
            res.send(
                `Bitcoin EUR rate: <b>${price}</b>
                <br>The indicated number of bitcoins: <b>${enterbit}</b>
                <br>Calculator Results: <b>${price*enterbit} EUR </b>`
            );
        }else{
            price = response.data.bpi.USD.rate_float;
            res.send(
                `Bitcoin USD rate: <b>${price}</b>
                <br>The indicated number of bitcoins: <b>${enterbit}</b>
                <br>Calculator Results: <b>${price*enterbit} USD </b>`
            );
        }
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});