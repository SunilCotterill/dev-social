const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');


//@route get api/auth
//@desc Test route
//@access public
//ADDING AUTH HERE MAKES THE REQUEST PROTECTED
router.get('/', auth,async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    }catch(e){
        console.error(e.message);
        res.status(500).send('Server Error');
        }
});



//@route POST api/auth
//@desc Authenticate user and get token
//@access public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','password is required').exists()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password } = req.body

    try {
        let user = await User.findOne({email});
        // see if user exists
        if(!user){
           return res.status(400).json({errors: [{msg: 'Invalid Credentials' }]})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials' }]})
        }

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