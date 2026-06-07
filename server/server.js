const express = require('express');
const mongoose = require('./mockMongoose');
const cors = require('cors');
const authroutes = require('./routes/authroutes');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    'mongodb://127.0.0.1:27017/socialmedia'
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req,res)=>{

    res.send('Social Media Backend Running');
});
app.use('/api/auth',authroutes);
app.listen(5000, ()=>{

    console.log('Server running on port 5000');
});