const express=require('express');
const router=express.Router();
const User=require("../model/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

//create the user using:POST  /api/auth/createuser
router.post('/createuser',[
    body('name','Enter valid name').isLength({min:3}).isAlpha(),
    body('email','Enter valid email').isEmail(),
    body('password','Enter valid password').isLength({min:3}),
    ],async (req,res)=>{

    //if any error occuring
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({success:false, errors: result.array() });
    }

    try{
        const {name,email,password}=req.body;

        //Validate if User exist or not
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"User Already Exist"
            })
        }

        //hashing the password using bcrypt
        const salt=await bcrypt.genSalt(10);
        const securePass=await bcrypt.hash(req.body.password,salt);

        //add user to db
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:securePass
        })

        //creating authentation token for user using jwt
        const data={
            user:{
                id:user.id
            }
        };
        const authToken=jwt.sign(data,process.env.JWT_SECRET);

        return res.status(200).json({
            success:true,
            data:authToken,
            message:"User Created successfully"
        })
    }catch(e){
        console.log(e);
        return res.status(500).send({
            success:false,
            message:"Internal server err"
        })
    }
})


//Authenticate the user using:POST  /api/auth/login
router.post('/login',[
    body('email','Enter valid email').isEmail(),
    body('password','Enter valid password').notEmpty()
    ],async (req,res)=>{

    //if any error occuring
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try{
        const {email,password}=req.body;

        //Validate if User exist or not
        let user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                suceess:false,
                message:"Please try to login with correct creadential"
        })
        }

        const passCompare=await bcrypt.compare(password,user.password);
        if(!passCompare){
            return res.status(400).json({
                suceess:false,
                message:"Please try to login with correct creadential"
        })
        }

        const data={
            user:{
                id:user.id
            }
        };
        const authToken=jwt.sign(data,process.env.JWT_SECRET);

        return res.status(200).json({
            success:true,
            data:authToken,
            message:"User loginned successfully"
        })
    }catch(e){
        console.log(e.message);
        return res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
})

//Get loggedIn user details using:POST  "/api/auth/getuser"   login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try{
        const userId=req.user.id
        const user=await User.findById(userId).select("-password");
        return res.json({suceess:true,user});
    }catch(e){
        console.log(e.message);
        return res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
})

module.exports=router



