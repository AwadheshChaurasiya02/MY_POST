const express=require("express");
const app=express();

let port=8080;

app.listen(port,() => {
    console.log(`listening on port ${port}`);
});

app.set("view engine","ejs");

const path=require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

const { v4 : uuidv4 } = require( "uuid" );


let methodOverride = require("method-override");
app.use(methodOverride('_method'));


let posts=[
    {
        id:uuidv4(),
        username:"awadh",
        content:"i love coding",
    },

    {
        id:uuidv4(),
        username:"ram",
        content:"hard working is the key of sucess",
    },

    {
        id:uuidv4(),
        username:"shyam",
        content:"radhe rahde",
    },
];



app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/form",(req,res) => {
    res.render("form.ejs");
});

app.post("/posts/form",(req,res) => {
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id:id,username:username,content:content});
    res.redirect("/posts");
});


app.get("/posts/:id",(req,res) => {
    let {id} = req.params ;
    let post=posts.find((p) => id===p.id);
    res.render("post.ejs",{post});
});


app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params ;
    let post=posts.find((p) => id===p.id);
    res.render("edit.ejs",{post});
});


app.patch("/posts/:id",(req,res) => {
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p) => id===p.id);
    post.content=newContent;
    res.redirect("/posts");
});


app.delete("/posts/:id",(req,res) => {
    let {id} = req.params ;
    posts=posts.filter((p) => id!==p.id);
    res.redirect("/posts");
});