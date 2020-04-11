var express = require('express')

const cors = require('cors');
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

var app = express()
// parse application/json
app.use(cors());
app.use(bodyParser.json())

const passs = process.env.DB_PASS
const user = process.env.DB_USER
const uri = `mongodb+srv://${user}:${passs}@cluster0-y7sqc.mongodb.net/test?retryWrites=true&w=majority`;
let client = new MongoClient(uri, { useNewUrlParser: true });

const users = ['mamun','sdfsddsf','sfsdsfdsf','erewrewrewre'];

//database Connection




app.post('/getProductsByKey',(req,res) =>{

  //console.log(req.params.key)
  const key = req.param.key
  const productKeys = req.body;
  
  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    // perform actions on the collection object
  
    collection.find({key: {$in: productKeys}}).toArray((err,documents) =>{
      if(err){

      }else{
        res.send(documents);
      }
     
    })
  
    console.log('Database Connected......')
  
    client.close();
  });

})





// app.get('/', function (req, res) {
//     res.send('Thank you for calling me4444')
//   })

  app.get('/fruits/banana',(req,res) =>{
      res.send({fruits:'banana',price:20})
  })

  app.get('/product/:key',(req,res) =>{

    //console.log(req.params.key)
    const key = req.params.key;
    
    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
      const collection = client.db("onlineStore").collection("products");
      // perform actions on the collection object
    
      collection.find({key}).toArray((err,documents) =>{
        if(err){

        }else{
          res.send(documents[0]);
        }
       
      })
    
      console.log('Database Connected......')
    
      client.close();
    });

  })

  app.get('/products',(req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
      const collection = client.db("onlineStore").collection("products");
      // perform actions on the collection object
    
      collection.find().toArray((err,documents) =>{
        if(err){

        }else{
          res.send(documents);
        }
       
      })
    
      console.log('Database Connected......')
    
      client.close();
    });


  })







  //post
  app.post('/addProduct',(req,res) =>{

    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
   

    client.connect(err => {
      const collection = client.db("onlineStore").collection("products");
      // perform actions on the collection object
    
      collection.insert(product,(err,result) =>{
        if(err){
console.log(err)
        }else{
          res.send(result.ops[0]);
        }
       
      })
    
      console.log('Database Connected......')
    
      client.close();
    });

   


  })


  app.post('/placeorder',(req,res) =>{

    const orderDetails = req.body;
    orderDetails.orderTime = new Date();

    client = new MongoClient(uri, { useNewUrlParser: true });
   

    client.connect(err => {
      const collection = client.db("onlineStore").collection("orders");
      // perform actions on the collection object
    
      collection.insertOne(orderDetails,(err,result) =>{
        if(err){
         console.log(err)
        }else{
          res.send(result.ops[0]);
        }
       
      })
    
      console.log('Database Connected......')
    
      client.close();
    });

   


  })

  const port = process.env.PORT || 3000
  
  app.listen(port,() => console.log('listening to port 4000'))