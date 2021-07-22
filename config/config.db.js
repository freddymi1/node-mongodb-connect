const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(console.log("Connexion avec mongoDB etablit")).catch(err=>
    console.log(err)
)