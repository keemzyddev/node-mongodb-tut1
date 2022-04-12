const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
require('dotenv/config')
const app = express();
const dbUri = process.env.DB_CONNECTION;
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () =>
  app.listen(5000, () => console.log("Connected successfully"))
);

app.get("/app-blog", async (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about the blog",
    body: "more on the blog",
  });
  try{
    const savedBlog = await blog.save()
    res.send(savedBlog);
  } catch(err){
    res.send(err)
  }
  
    
});

app.get('/all-blogs', async (req, res)=>{
  try{
  const findBlog = await Blog.find()
  res.send(findBlog)
  } catch(err){
    res.send(err)
  }
})
app.get('/single-blog', async(req, res)=>{
  try{
  const findBlogByID = await Blog.findById('62549fdd675cf610040669b6')
  res.send(findBlogByID)
  } catch (err){
    res.send(err)
  }
})

