const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
console.log('init server');

bands.addBand(new Band('Binomio'));
bands.addBand(new Band('Ozuna'));
bands.addBand(new Band('Julio jaramillo'));
bands.addBand(new Band('Electro'));

// Mensjess de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

     /* client.on('mensaje', (payload) => {
         console.log('Mensaje!!!!', payload);

         io.emit('mensaje', {admin: 'Nuevo mensaje'});
     }) */
});