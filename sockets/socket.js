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

     client.on('mensaje', (payload) => {
         console.log('Mensaje!!!!', payload);

         io.emit('mensaje', {admin: 'Nuevo mensaje'});
     })

     /* client.on('emitir-mensaje', (payload) => {
         //console.log(payload);
         //io.emit('nuevo-mensaje', payload); // emite a todos!
         client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos al que lo emitío
     }) */

     client.on('vote-band', (payload) => {
         bands.voteBands(payload.id);
         io.emit('active-bands', bands.getBands());
     })

     client.on('add-band', (payload) => {
         const newBand = new Band(payload.name);
         bands.addBand(newBand);
         io.emit('active-bands', bands.getBands());
     })

     client.on('delete-band', (payload) => {
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands());
    })
});