//----------------------------------------------------------------""all require""
const express = require("express");//---------------------take the file expresss
const app = express();//-----------------------------creation app with express
const port = 3000;//--------------------the port of the serveur
const mongoose = require("mongoose");//-----------------------mangodb
app.use(express.urlencoded({ extended: true }));//--------------------------take the time of any data in mangodb
const User = require("./models/customerSchema");//---------------------the data model
app.set("view engine", "ejs");//------------------file ejs
app.use(express.static('public'));//----------------------------for add any file like css , js , bootstrap ......
var methodOverride = require('method-override');//------------------1.1-delete-methode
app.use(methodOverride('_method'));//------------------1.2-delete-methode







//----------------------------------------------------------------------------------all you need to Auto refresh
const path = require("path");//--------------------------------take the file of the path 
const livereload = require("livereload");//-----------------------------livereload
const liveReloadServer = livereload.createServer();//-------------------------creation the serveur of livereload
liveReloadServer.watch(path.join(__dirname, 'public'));//-------------------------creation the serveur of livereload
 
 
const connectLivereload = require("connect-livereload");//----------------------------the file of connection with livereload
const moment = require("moment");//------------------------file of time
app.use(connectLivereload());//------------------------------using the livereload
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 0);
});





//-----------------------------------------------------------------------------""get"" 

app.get("/", (req, res) => {
User.find()
.then((resultat)=>{res.render("index", { arr : resultat , moment:moment});})
.catch((err)=>{console.log(err);})
});


app.get("/user/add.html", (req, res) => {
  res.render("user/add")
});


app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
  .then((resultat)=>{res.render("user/edit",{obj : resultat , moment:moment })})
  .catch((err)=>{console.log(err);})
});



app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
  .then((resultat)=>{res.render("user/view",{obj : resultat , moment:moment })})
  .catch((err)=>{console.log(err);})
});












//------------------------------------------------------------------------------------""post""

app.post("/user/add.html", (req, res) => {
  User.create(req.body).then(()=>{
    res.redirect("/")
  }).catch((err)=>{
    console.log(err)
  })
});
//--------------------------------------------------------------------------------""put""
app.put('/edit/:id', (req, res) => {
  User.findByIdAndUpdate({_id:req.params.id},req.body)
  .then(()=>{res.redirect("/")}).catch((err)=>console.log(err));
  
})




//----------------------------------------------------------------------------------""delete"" 

app.delete("/edit/:id",(req,res)=>{
  
  User.findByIdAndDelete(req.params.id)
  .then(()=>{res.redirect("/");})
  .catch((err)=>{console.log(err);})
});











//-------------------------------------------------------------------------------""connection""
mongoose
  .connect("mongodb+srv://rayen:jETRFjGPcyxW1gMz@cluster0.dfsw3ub.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {app.listen(port, () => {console.log(`http://localhost:${port}/`);});})
  .catch((err) => {console.log(err);
});