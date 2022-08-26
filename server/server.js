const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();


// //CORS middleware
// const allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// }

// app.configure(function() {
//     app.use(allowCrossDomain);
//     //some other code
// });

// app.use(cors());

connectDB();

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API started...'));

const apiUsers = require('./routes/api/users');

app.use('/api/users', apiUsers);
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));