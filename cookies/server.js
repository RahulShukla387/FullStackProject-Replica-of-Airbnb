import express from "express";
//todo Importing and using session code 
import session from "express-session";
import flash from "connect-flash";
import path from "path";
const router = express.Router();
const port = 8080;
const app = express();
 //todo to change from common Js to Embedded Js we required to add these 3 lines extra so that we can use import at the place of require import is a part of new ejs and in package.json write "type:" = "module"
import { fileURLToPath } from "url"; // Required for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Get the directory name
//todo for using ejs
app.set("views",path.join(__dirname,"/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //getting public file .
//todo Starting.

const value = {secret: "RahulShukla", resave:false, saveUninitialized: true} ;
app.use(session( value));
app.use(flash());
app.listen(port, ()=>{
    console.log("website is working properly");
})
app.get("/test", (req, res)=>{
    res.send("test successfull!");
})
app.get("/reqcount",(req, res)=>{
    
    if( req.session.count){
        req.session.count++;
    }
    else{
        req.session.count = 1;
    }
    res.send(`You sent a request ${ req.session.count} times`);
})
app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})
app.get("/register", (req, res)=>{
    let { name = "unknown"} = req.query;
    req.session.name = name;
   if(name === "unknown"){
    req.flash("error", "User not registered");
    // console.log(req.flash())
   }
   else{
    req.flash("success", "Congratulation you registered successfully");
    // console.log(req.flash())
   }
    console.log(req.session.name);
    // console.log(req.flash()); //todo don't console req.flash() if you will console it then it will not get rendered and send to ejs file because flash can use only once 
    res.redirect("/greet");
    //  res.send(req.session.name);
})
app.get("/greet", (req, res)=>{
    res.render("page.ejs",{name: req.session.name});
    // res.send(`Hello ${req.session.name}`);
})
