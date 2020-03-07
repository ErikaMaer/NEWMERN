const mongoose =require('mongoose');
const Schema = mongoose.Schema;

/*const UserS =new Schema({
    email:{
        type:String,
        required:true,
        unique: true
    } ,
    password:{
        type: String,
        required: true
    }
});*/
const ItemSchema =new Schema({
    name:{
        type:String,
        required:true,
    } ,
    date:{
        type: Date,
        default: Date.now
    }
});


module.exports = Item = mongoose.model('item', ItemSchema);