const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const config = require('config');


//@route POST api/users
//@desc Register user
//@access public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter password with 6 or more chars').isLength({min:6})
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password } = req.body

    try {
        let user = await User.findOne({email});
        // see if user exists
        if(user){
           return res.status(400).json({errors: [{msg: 'User already exists' }]})
        }
        
        //get users gravatar
        const avatar = gravatar.url(email, {
            //size
            s: '200',
            //rating
            r: 'pg',
            //default
            d: 'mm'
        })
        
        user = new User({
            name,
            email,
            avatar,
            password
        })

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
        //return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, 
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (e, token) => {
               if (e) throw e;
               res.json({token});
            });
    
    } catch(e){
        console.error(e.message);
        res.status(500).send('Server error');
    }
    


});


module.exports=router;