const express=require('express');
const router= express.Router();
const bcrypt=require('bcryptjs');
const config = require('config');
const jwt =require('jsonwebtoken');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');


router.post('/create/block', async (req, res) =>{
 const userId = req.body.id;
 const userStatus = req.body.status;
 const user = await User.findOne({_id: userId});
 await user.update({Status: userStatus});
 res.json({user})
});

router.delete('/create/delete', async (req, res) =>{
 const userId = req.body.id;
 const user = await User.remove({_id: userId});
 res.json({user})
});

router.get('/create', (req, res) =>{
 User.find()
     .sort({ date: -1})
     .then(users => res.json(users))
});

router.post(
   '/register',
   [
    check('email','Invalid email').isEmail(),
    check('password', 'The minimum password length is 6 symbols')
        .isLength({min:3})
   ], async (req,res) => {
    try {

     const errors =validationResult(req);

     if(!errors.isEmpty()){
      return res.status(400).json({
       errors:errors.array(),
       message:'Invalid data during registration'
      })
     }
     const {email,password} = req.body;
     const candidate =await User.findOne({email});

     if(candidate){
      return  res.status(400).json({message: 'This user already exists'})
     }
     const hashedPassword= await bcrypt.hash(password, 12);
     const regDate = new Date().toLocaleString("ru");
     const user = new User({email,password:hashedPassword, regDate});
     await user.save();
     res.status(201).json({message:'The user is created'})
    } catch (e) {
     res.status(500).json({ message: 'Something is wrong, try again'})
    }
   });

router.post(
   '/login',
   [
    check('email','Enter the correct email address').normalizeEmail().isEmail(),
    check('password','Enter the password').exists()
   ],
   async (req,res) => {
    try {
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
      return res.status(400).json({
       errors: errors.array(),
       message: 'Invalid data during login'
      })
     }

     const {email, password} = req.body;
     const user = await User.findOne({email});
     if(!user){
      return res.status(400).json({message:'The user is not found'})
     }
     const isMatch = await bcrypt.compare(password, user.password);

     if (!isMatch) {
      return res.status(400).json({message: 'Invalid password, try again'})
     }

      if(user.Status==="block"){
       return res.status(400).json({message: 'You are blocked'})
      }

      const logDate = new Date().toLocaleString("ru");
      await user.update({logDate});

      const token = jwt.sign(
          {userId: user.id},
          config.get('jwtSecret'),
          {expiresIn: '1h'},
      );
      res.json({token, userId: user.id})
    } catch (e) {
     res.status(500).json({message: 'Something is wrong, try again'})
    }
   });
module.exports=router;





















/*const express=require('express');
const router= express.Router();

const Item = require('../../models/Item');

router.get('/',(req,res) =>{
 Item.find()
   .sort({date: -1})
   .then(items =>res.json(items))
});

router.post('/',(req,res) =>{
 const newItem= new Item({
  name: req.body.name
 });
 newItem.save().then(item => res.json(item));
});

router.delete('/:id',(req,res) =>{
 Item.findById(req.params.id)
     .then (item =>item.remove().then(() => res.json({success:true})))
     .catch(err => res.status(404).json({success:false}))
});

module.exports =router;*/