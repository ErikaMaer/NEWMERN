const express =require('express');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const path =require('path')

const items = require('./routes/api/items');

const app = express();

//Bodyparser Middleware
 app.use(bodyParser.json());

if(process.env.NODE_ENV=== 'production'){
    app.use('/', express.static(path.join(__dirname,'client','build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items );

const port =process.env.PORT || 5080;


app.listen(port, () => console.log(`Server started on port ${port}`));
