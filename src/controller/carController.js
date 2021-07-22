const CarModel = require('../models/carsModel');



exports.AddCars = async (req, res) => {
    try{
        const newCar = new CarModel({
            marque: req.body.marque,
            description: req.body.description,
            matricule: req.body.matricule,
        })
        const car = await newCar.save();
        res.status(200).json(car)
    }catch(err){
        res.send({status: 500, message: "Error de creation"})
    }
}

exports.getAllCar = async (req, res) => {
    try{
        await CarModel.find({}, (err, data)=>{
            if(err) res.status(400).json("Erreur de chargement");
            res.status(200).json(data)
        });
    }catch(err){
        res.send({status: 500, message: "Data vide"})
    }
}


exports.getOneCar = async (req, res) => {
    try{
        const car = await CarModel.findById(req.params.id);
        res.status(200).json(car);
    }catch(err){
        res.send({status: 500, message: "Cette voiture n'existe pas"})
    }
}

exports.UpdateCar = async (req, res) => {
    try{
        const updateCar = await CarModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true})
        res.status(200).json(updateCar);
    }catch(err){
        res.send({status: 500, message: "Error update"})
    }
    
}

exports.DeleteCar = async (req, res) => {
    try{
        const user = await CarModel.findById(req.params.id);
        try{
            await CarModel.findByIdAndDelete(req.params.id)
            res.status(200).json("Voiture bien supprimer");
        }catch(err){
            res.send({status: 500, message: "err"})
        }
    }catch(err){
        res.send({status: 400, message: "Cette voiture n'existe pas"});
    }
    
}