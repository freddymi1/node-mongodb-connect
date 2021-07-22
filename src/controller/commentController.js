const UserModel = require('../models/userModel');
const CarsModel = require('../models/carsModel');
const CommentModel = require('../models/commentModel')


exports.PostComment = async (req, res) => {
  const newComment = new CommentModel(req.body);
  try{
    const comm = await newComment.save();
    res.status(200).json(comm)
  }catch(err){
      res.send({status: 500, message: "Error de creation"})
  }
  
}

exports.UpdateComment = async (req, res) => {
  
  try{
    const comment = await CommentModel.findById(req.params.id);
    if(comment.user === req.body.user){
      try{
        const updateComment = await CommentModel.findByIdAndUpdate(req.params.id,{
          $set:req.body
        },{new:true})
        res.status(200).json(updateComment)
      }catch(err){
        res.send({status: 500, message: "Error de creation"})
      }
    }else{
      res.send({status: 400, message: "Vous pouvez seulement modifier votre commentaire!"});
    }
    
  }catch(err){
      res.send({status: 500, message: "Error de creation"})
  }
}

exports.DeleteComment = async (req, res) => {
  try{
    const comment = await CommentModel.findById(req.params.id);
    if(comment.user === req.body.user){
      try{
        await comment.delete()
        res.status(200).json("Comment bien supprimer")
      }catch(err){
        res.send({status: 500, message: "Error de creation"})
      }
    }else{
      res.send({status: 400, message: "Vous pouvez seulement modifier votre commentaire!"});
    }
    
  }catch(err){
      res.send({status: 500, message: "Error de creation"})
  }
}

exports.getOneComment = async (req, res) => {
  try{
      const coment = await CommentModel.findById(req.params.id);
      res.status(200).json(coment);
  }catch(err){
      res.send({status: 500, message: "Cette comment n'existe pas"})
  }
}

exports.getAllComment = async (req, res) => {
  const user = req.query.user;
  const cars = req.query.cars;
  try{
    let comments;
    if(user){
      comments = await CommentModel.find({user})
    }else if(cars){
      comments = await CommentModel.find({
        cars:{
          $in: [cars]
        }
      })
    }else{
      comments = await CommentModel.find();
    }
    res.status(200).json(comments);
  }catch(err){
      res.send({status: 500, message: "Pas de commentaire"})
  }
}