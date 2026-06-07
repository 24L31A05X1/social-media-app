const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

/* REGISTER */

router.post('/register',
async(req,res)=>{

    try{

        const {
            name,
            email,
            password
        } = req.body;

        const existingUser =
        await User.findOne({email});

        if(existingUser){

            return res.json({
                message:'User already exists'
            });
        }

        const hashedPassword =
        await bcrypt.hash(password,10);

        const user = new User({

            name,
            email,
            password:hashedPassword
        });

        await user.save();

        res.json({
            message:'Registration Successful'
        });

    }catch(err){

        res.json(err);
    }
});

/* LOGIN */

router.post('/login',
async(req,res)=>{

    try{

        const {
            email,
            password
        } = req.body;

        const user =
        await User.findOne({email});

        if(!user){

            return res.json({
                message:'User Not Found'
            });
        }

        const validPassword =
        await bcrypt.compare(
            password,
            user.password
        );

        if(!validPassword){

            return res.json({
                message:'Invalid Password'
            });
        }

        const token = jwt.sign(
            {id:user._id},
            'secretkey'
        );

        res.json({

            message:'Login Successful',

            token,

            user
        });

    }catch(err){

        res.json(err);
    }
});

module.exports = router;