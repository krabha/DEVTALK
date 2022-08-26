const mongoose = require('mongoose');
const config = require('config');
const db = config.get('localMongoUri');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Mongodb connected!');
    } catch (err) {
        console.log(err);
        //exit process with failure
        process.exit();
    }
};

module.exports = connectDB;