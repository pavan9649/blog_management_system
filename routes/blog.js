const Blog = require("../src/models/blog");
const express = require("express");
//const body = require("body-parser");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const blogList = await Blog.find();

  if (!blogList) {
    res.status(500).json({ success: false });
  }
  res.send(blogList);
});


router.get(`/:id`, async (req, res) => {
    const blogList = await Blog.findById(req.params.id);
  
    if (!blogList) {
      res.status(500).json({ success: false });
    }
    res.send(blogList);
  });

  
 
router.post(`/upload`, async(req, res) => {
  let blog = new Blog({
     tittle:req.body.tittle,
     author:req.body.author,
     description:req.body.description,
  });

  blog = await blog.save();

  if (!Blog) return res.status(500).send("The Blog cannot be created");

  res.send(blog);
});


router.put("/:id", async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        tittle:req.body.tittle,
        author:req.body.author
        
      },
      { new: true }
    );
  
    if (!blog) return res.status(400).send("the Blog cannot be updated");
  
    res.send(blog);
  });

router.delete("/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
      .then((blog) => {
        if (blog) {
          return res
            .status(200)
            .json({ success: true, message: "the blog deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "the blog not found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  });

module.exports = router;