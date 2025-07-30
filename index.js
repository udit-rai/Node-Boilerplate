import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

/* This line is both crucial and intricate to understand, let's break it down:
1. app.use(...) -> Runs the code on every incoming request, before route/verb handlers
2. bodyparser.urlencoded -> The bodyparser method parses urlencoded data type (the type html forms send, 
using the .urlencoded property. The technical name of type is x-www-form-urlencoded.
3. {extended : true} -> Defines whether app accepts only flat strings (false) 
or objects as well (true)
====This line WILL be used to parse almost every data you intake via html form====
*/
app.use(bodyParser.urlencoded({ extended: true}));

//Uses sendFile method with a path parameter; __dirname being existing and 
//remainder being further path to specific file. __dirname is necessary on clouds.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Places two rules upon the post /submit endpoint; firstly to log the request body
//secondly in case of status code 200 to send a response of success
app.post("/submit", (req, res) => {
  console.log(req.body);
  res.status(200).send("Success!");
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
}); 