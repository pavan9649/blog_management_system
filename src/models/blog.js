const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
});

const Blog =mongoose.model("Blog",blogSchema);
module.exports=Blog;