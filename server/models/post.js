const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    userId:String,

    username:String,

    caption:String,

    image:String,

    likes:[String],

    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports =
mongoose.model('Post', postSchema);