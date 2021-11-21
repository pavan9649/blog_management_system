const { User } = require("../src/models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");


router.get(`/`, async (req, res) => {
    const userList = await User.find();
  
    if (!userList) {
      res.status(500).json({ success: false });
    }
    res.send(userList);
  });
  
  router.get(`/:id`, async (req, res) => {
    const userList = await User.findById(req.params.id);
  
    if (!userList) {
      res.status(500).json({ success: false });
    }
    res.send(userList);
  });
  

router.post("/signup", async (req, res) => {
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password:bcrypt.hashSync(req.body.password,10),
      phone: req.body.phone,
      isAdmin:req.body.isAdmin
      
    });
    user = await user.save();
  
    if (!user) return res.status(400).send("the user cannot be created!");
  
    res.send(user);
  });

  router.post("/login",async(req,res)=>{
      const secret=process.env.secret;
      const user=await User.findOne({username:req.body.username});
      if(!user)
      {
          return res.status(400).send("the user not found");
      }
      if(user && bcrypt.compareSync(req.body.password,user.password))
      {
          const token=jwt.sign(
              {
                  userId: user.id,
                  isAdmin: user.isAdmin,

            },
            secret,
            {
                expiresIn: "1d"
            }
          );
        return res.status(200).send({user:user.username,token:token});
      }
      else{
        return res.status(400).send("the password is worng");
      }
  })
  router.put("/:id", async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
      newPassword = userExist.passwordHash;
    }
  
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        password:newPassword,
        phone: req.body.phone
      },
      { new: true }
    );
    if (!user) return res.status(400).send("the user cannot be created");
  
    res.send(user);
  });

  router.delete("/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ success: true, message: "the user deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "user not found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  });
  module.exports = router;