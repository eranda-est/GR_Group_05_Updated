//Signup Controller

const db = require('../utils/db')
const bcrypt = require('bcryptjs')

exports.registerUser = (req,res)=>{
    const{name,email,password,isAdmin} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    db.query('SELECT * FROM user WHERE email = ?', [email], async(err,result) => {
        if(err) return res.status(500).json({error:err});

        if(result.length>0){
            return res.status(400).json({message:"Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        db.query(
            "INSERT INTO user (name,email,password,isAdmin) VALUES (?,?,?,?)",
            [name,email,hashedPassword,isAdmin || false],
            (err,result) => {
                if (err) return res.status(500).json({error:err});

                res.status(201).json({message:"User Registered successfully"});
            }
        );
    });
};
