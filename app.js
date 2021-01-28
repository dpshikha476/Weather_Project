const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){

    res.sendFile(__dirname+ "/index.html");
    

});

app.post("/", function(req,res){
    const query=req.body.cityName;
const url= "https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid=5cf156ccea279d25c5d40050b7af7b8c&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon+ "@2x.png";
            res.write("<h1>The temperature in "+query+" is "+ temp+ " degree Celcius.</h1>");
            res.write("<h3>The weather is currently "+ weatherDescription + ".</h3>");
            res.write("<img src=" + imageURL +">");
            res.send();

        });

    });
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});
