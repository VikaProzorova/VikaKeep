var Storage = require('../Storage');

new Storage().registerUser({
    email:    process.argv[2],
    password: process.argv[3],
    name:     process.argv[4] || 'Vasia'
})
.catch(function(error){
    console.error(error);
})
.done(process.exit);
