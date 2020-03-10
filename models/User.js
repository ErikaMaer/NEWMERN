const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const UserSchema =new Schema({
    email:{
        type:String,
        required:true,
        unique: true
    } ,
    password:{
        type: String,
        required: true
    },
    regDate:{
        type: String,
        default: null
    },
    logDate:{
        type: String,
        default: null
    },
    Status:{
        type: String
    },
    Checked:{
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);




