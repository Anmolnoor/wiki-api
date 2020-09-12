const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/Wikidb",{ useUnifiedTopology: true , useNewUrlParser: true });

const articleSchema ={
  title: String,
  content: String
};

const Article = mongoose.model("Article",articleSchema);

app.route("/articles").get(function(req,res){
  Article.find(function(err,foundedArticles){
    if(!err){res.send(foundedArticles);}else{res.send(err);}
  });
}).post(function(req,res){
  const newArticle = new Article({
    title : req.body.title,
    content :req.body.content
  });
  newArticle.save(function(err){
    if(!err){res.send("Successfully added a new Article.")}else{res.send(err)}
  });
}).delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){res.send("Successfully delete all Articles.");}else{res.send(err)}
  });
});

app.route("/articles/:name").get(function(req,res){
  Article.findOne({title:req.params.name},function(err,foundedArticle){
    if(!err){
      if(foundedArticle){res.send(foundedArticle);
      }else if(!foundedArticle){"no article is found with this name " + req.params.name}
    }else{res.send(err)}
  });
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
