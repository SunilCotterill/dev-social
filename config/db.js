const monggose = require('mongoose');
const config = require('config');
const { default: mongoose } = require('mongoose');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await monggose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB Connected');
    }catch(e){
        console.error(e.message);

        //this exits the process with failure
        process.exit(1);
    }

}


module.exports = connectDB;
