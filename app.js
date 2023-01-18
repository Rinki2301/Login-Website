const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https"); 

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const secname = req.body.lname;
    const mail = req.body.email;
    const data={
         members:[
            {
                email_address: mail,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:secname
                }
            }
         ]
    };
    const jsonData = JSON.stringify(data) ;
    const url="https://us10.api.mailchimp.com/3.0/lists/2ad440e88c";

const options={
    method:"POST",
    auth:"rinki2301:c22def3cdba61e9823c859853a39ae65-us10"
}

   const request= https.request(url,options, function(response){ 
    
    var success = response.statusCode;
    if(success===200){
        res.sendFile(__dirname+"/success.html");
    }
    else
       {
         res.sendFile(__dirname+"/failure.html");
       }
    response.on("data",function(data){
    console.log(JSON.parse(data));
})
    })
    request.write(jsonData);
    request.end();
}); 

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});

// apikey c22def3cdba61e9823c859853a39ae65-us10
// audienceid 2ad440e88c
// c22def3cdba61e9823c859853a39ae65-us10