const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const app = express();
const dbUri =
  "mongodb+srv://keem:12345@node-tut.k0bi4.mongodb.net/node-tut?retryWrites=true&w=majority";
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () =>
  app.listen(5000, () => console.log("Connected successfully"))
);

app.get("/app-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about the blog",
    body: "more on the blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res)=>{
  Blog.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  });
})
app.get('/single-blog', (req, res)=>{
  Blog.findById('62549fdd675cf610040669b6')
  .then((result)=>{
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  });
})
