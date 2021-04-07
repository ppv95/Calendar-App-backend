
const mongoose = require('mongoose');


const dbConnection = async() =>{
    try {
    mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    mongoose.set('useFindAndModify', false);
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error on instance database')
    }
}

module.exports = {
    dbConnection
}