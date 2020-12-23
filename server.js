const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
var _ = require('lodash');

const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const blogs=[];

const homestartingcontent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutcontent="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.";
const contactcontent="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.";


app.get('/',function(req,res){
res.render('home',{homecontent:homestartingcontent,blogs:blogs});

});

app.get('/about',function(req,res){
res.render('about',{aboutcon:aboutcontent});
});

app.get('/contact',function(req,res){
res.render('contact',{concontent:contactcontent});
});

app.get('/compose',function(req,res){
res.render('compose');
});

app.post('/compose',function(req,res){
  var postContent={
    Titel:req.body.postTitle,
    Body:req.body.postBody
  };

  blogs.push(postContent);
  res.redirect('/');
});

app.get('/posts/:postname',function(req,res){
const requestedTitle=_.lowerCase(req.params.postname);

blogs.forEach(function(blog){
const storedtitle=_.lowerCase(blog.Titel);
  if(storedtitle === requestedTitle){
    res.render("post",
    {tit:blog.Titel,
    bod:blog.Body
  });

  }

});

});


app.listen(3000,function(){
  console.log("server is ready and running on port 3000")
});
