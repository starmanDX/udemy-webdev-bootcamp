const express           = require('express'),
    expressSanitizer    = require('express-sanitizer'),
    methodOverride      = require('method-override'),
    mongoose            = require('mongoose'),
    bodyParser          = require('body-parser'),
    hostname            = "127.0.0.1",
    port                = process.env.PORT || 3000,
    app                 = express(),
    blogSchema          = new mongoose.Schema({
        title: String,
        image: String,
        body: String,
        created: {
            type: Date,
            default: Date.now
        }
    }),
    Blog            = mongoose.model("Blog", blogSchema);

//APP CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost:27017/restful_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//ROOT ROUTE
app.get("/", (req,res) => {
    res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    }) 
});

//NEW ROUTE
app.get("/blogs/new", (req,res) => {
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", (req,res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
})

//SHOW ROUTE
app.get("/blogs/:id", (req,res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog:foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", (req,res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect("/blogs");
        }
    })
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});