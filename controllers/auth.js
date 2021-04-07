const {response, json} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const _serverError = "Talk with the system administrator";

const createUser =  async(req,res = response) => {

    const {name,email,password} = req.body
    
    try {
        let user = await User.findOne({email});
      
        if(user){
            return res.status(400).json({
                ok:false,
                msg:'there`s is already a user with this email'
            });
        }
       
        user = new User(req.body); 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // JWT Creation
        const token =  await generateJWT(user.id, user.name)
       
        res.status(201).json({
            ok: true,
            msg: 'register',
            uid:user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:_serverError
        })
    }
}

const loginUser = async (req,res = response) => {

    const {email,password} = req.body;
    
    try {
        const  user = await User.findOne({email}); 
        if(!user){           
            return res.status(400).json({
                ok:false,
                msg:'user not found'
            });
        }

        const validPassword = bcrypt.compareSync(password,user.password);
        //TODO: for good practice, we have send ambigous message about the credendials
        if(!validPassword){
            return res.status(400),json({
                ok:false,
                msg: 'Incorrect password'
            });
        }

        // JWT Creation
        const token =  await generateJWT(user.id, user.name)

        res.status(200).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token

        });
    } catch (error) {
        console.log("Login error over here");
        console.log(error);
         res.status(500).json({
            ok:false,
            msg:_serverError
        });   
    }  
}

const renewToken = (req,res = response) =>{

   const {uid,name} = req.body

    // Generate JWT
    const token =  generateJWT(uid,name);

    res.json({
        ok:true,
        token
    })
};

module.exports = {
    createUser,
    loginUser,
    renewToken
}