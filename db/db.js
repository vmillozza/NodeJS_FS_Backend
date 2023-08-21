const { default: mongoose } = require('mongoose');

require('dotenv').config();

const connect = async ()=>{
    await mongoose.connect(process.env.mongo);
}
//{connect}: Questa è una sintassi di inizializzazione dell'oggetto ES6. È equivalente a scrivere {connect: connect}. Ciò significa che stai esportando un oggetto con una proprietà chiamata connect, il cui valore è la variabile/funzione connect definita nel modulo.
module.exports = {connect};