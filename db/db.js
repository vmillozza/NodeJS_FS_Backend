const { default: mongoose } = require('mongoose');
const User = require("../models/userModel")
require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

const disconnect =async()=>{
    try{
        await mongoose.connection.close();
    }
    catch (err) {
        console.error('Error to disconnecting to MongoDB', err);
    }
}
const findUser =async(obj)=>{
    User.findOne(obj).exec();
}
const saveUser =async(newuser)=>{
    await  newuser.save();
    
}
//{connect}: Questa è una sintassi di inizializzazione dell'oggetto ES6. È equivalente a scrivere {connect: connect}. Ciò significa che stai esportando un oggetto con una proprietà chiamata connect, il cui valore è la variabile/funzione connect definita nel modulo.
module.exports = { connect,disconnect,findUser,saveUser };