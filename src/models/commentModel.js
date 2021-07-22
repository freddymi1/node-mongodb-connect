const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required:true
    },
    user:{
        type:String,
        required: true
    },
    cars:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default: Date.now()
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema);