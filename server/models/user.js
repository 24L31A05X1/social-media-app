const mongoose = require('../mockMongoose');

const userSchema = new mongoose.Schema({

    name:String,

    email:{
        type:String,
        unique:true
    },

    password:String,

    bio:{
        type:String,
        default:'Hello 👋'
    },

    profileImage:{
        type:String,
        default:
'https://i.pravatar.cc/150'
    },

    followers:[String],

    following:[String]
});

module.exports =
mongoose.model('User', userSchema);