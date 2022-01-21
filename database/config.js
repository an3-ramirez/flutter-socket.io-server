const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online');
    } catch (error) {
        console.log('Message: ', error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }
}

module.exports = {
    dbConnection
}