const UserModel = require('../models/userModel');
const CommentModel = require('../models/commentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.SignUp = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
        const user = await newUser.save();
        res.status(200).json(user)
    }catch(err){
        res.send({status: 500, message: "Nom ou email deja exister"})
    }
}

// exports.Login = async (req, res) =>{
//     await UserModel.findOne({email: req.body.email}).then(user => {
//         if(user === null){
//             res.status(401).json({
//                 message: "Email ou mot de passe invalide!",
//             });
//         }else{
//             bcrypt.compare(req.body.password, user.password, (err, result)=>{
//                 if(result){
//                     const token = jwt.sign({
//                         email: user.email,
//                         userId: user.id
//                     }, process.env.JWT_KEY, (err, token)=>{
//                         res.send({
//                             status: 200,
//                             message: "Authentification effectuer avec successful!",
//                             token: token
//                         });
//                     });
//                 }
//                 else{
//                     res.status(401).json({
//                         message: "Email ou mot de passe invalide!",
//                     });
//                 }
//             });
//         }
//     }).catch(error => {
//         res.status(500).json({
//             message: "Something went wrong!",
//         });
//     });
// }

exports.Login = async (req, res) => {
    try{
        const user = await UserModel.findOne({email: req.body.email});
        !user && res.status(400).json("Erreur de connexion")

        const validation = await  bcrypt.compare(req.body.password, user.password)
        !validation && res.status(400).json("Erreur de connexion")

        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch(err){
        res.send({status: 500, message: err})
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        await UserModel.find({}, (err, data)=>{
            if(err) res.status(400).json("Erreur de chargement");
            res.status(200).json(data)
        });
    }catch(err){
        res.send({status: 500, message: "Data vide"})
    }
}

exports.getOneUser = async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.id);
        const { password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.send({status: 500, message: "Cette user n'existe pas"})
    }
}

exports.UpdateUser = async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true})
            res.status(200).json(updateUser);
        }catch(err){
            res.send({status: 500, message: "err"})
        }
    }else{
        res.send({status: 400, message: "Vous pouvez seulement modifier votre profile!"});
    }
    
}

exports.DeleteUser = async (req, res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await UserModel.findById(req.params.id);
            try{
                await CommentModel.deleteMany({nameUser: user.name});
                await UserModel.findByIdAndDelete(req.params.id)
                res.status(200).json("User bien supprimer");
            }catch(err){
                res.send({status: 500, message: "err"})
            }
        }catch(err){
            res.send({status: 400, message: "User n'existe pas"});
        }
    }else{
        res.send({status: 400, message: "Vous pouvez seulement supprimer votre profile!"});
    }
    
}