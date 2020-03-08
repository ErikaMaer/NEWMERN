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
    }
});

module.exports = User = mongoose.model('user', UserSchema);



/*const ItemSchema =new Schema({
    name:{
        type:String,
        required:true,
    } ,
    date:{
        type: Date,
        default: Date.now
    }
});
*/

