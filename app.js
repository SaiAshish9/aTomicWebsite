const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
const mongoose=require('mongoose')
const _=require("lodash")



const homeStartingContent = "When we talk about the growth of the country, we take various factors into consideration and education is one of them. While most of the urban schools are getting the best of infrastructure, facilities and teachers, schools in rural areas are still struggling for quality education. Lack of teaching staff and motivation among students are two of the major reasons behind poor education quality in rural schools. 85% of the government schools are in villages, and do not get the benefit of quality education. We, at Atomic aim to provide education for the needy and spread awareness whilst reaching out to as many areas as possible. You can help us in our endeavour.";



mongoose.connect("mongodb+srv://Sai_99:shirdisai@cluster0-4bk2v.mongodb.net/articlesDB", {useNewUrlParser: true});


app.get("/",(req,res)=>{
  res.render('home')
})
app.get("/signup",(req,res)=>{
  res.render('signup',{title:"Sign Up",buttonName:"Sign Me Up!"})
})
app.get("/login",(req,res)=>{
  res.render('signup',{title:"Login",buttonName:"Login"})
})


//Articles Section






const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/articles", function(req, res){

  Post.find({}, function(err, posts){
    res.render("articles", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/articles");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});






app.post("/signup",function(req,res){
  var fname=req.body.fname;
    var lname=req.body.lname;
      var email=req.body.email;

      console.log(fname+" "+lname+" "+email);
var data={
  members:[{
    email_address:email,
    status:"subscribed"
}  ]
}

var json=JSON.stringify(data);

var option={
url: "https://us##.api.mailchimp.com/3.0/lists/ ########",
method:"POST",
headers:{
  "Authorization":"Sai ##########0"
},
body:json
}
request(option,(error,response,body)=>{
if(!error)
res.redirect("/message")

else {
res.redirect("/failure")}
})
})

app.get("/message",(req,res)=>{

  res.render("message",{startingMessage:"Awesome!",content:"You've been subscribed successfully!"})


})

app.get("/failure",(req,res)=>{

  res.render("message",{startingMessage:"Uh Oh!",content:"There was a problem signing you up.Please try Again later or contact the developers. "})


})






app.post("/simon",(req,res)=>{
  res.redirect("/simon")
})
app.get("/simon",(req,res)=>{
  res.render("simon")
})






let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
