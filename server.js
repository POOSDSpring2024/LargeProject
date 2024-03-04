const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(5000); // start Node + Express server on port 5000

// NOTE: Project connection string 'mongodb+srv://COP4331:POOSD24@cluster0.pwkanif.mongodb.net/'
const url = 'mongodb+srv://COP4331:POOSD24@cluster0.pwkanif.mongodb.net/'
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));

// Check http://localhost:5000/ to see Hello World
app.get('/', function(req, res, next) {
  res.send("Hello world");
});


// TODO: password hashing with something like bcrypt
      // User authentication tokens - JWT's 
      // Add Input validation and rate limiting?? 
      app.post('/api/login', async (req, res, next) => {
        // incoming: user, password
        // outgoing: id, firstName, lastName, , error
        // TODO: Return Business id also 
        
        // Init. error var 
        var error = '';
        const { user, password } = req.body;
       
        // Connect to database 
        const db = client.db("inventory_tracker");
      
        try {
          // In users collection, find the username and password record that matches the incoming user and password  
          const results = await db.collection('users').find({username:user, password:password}).toArray();
      
          // instantiate variables to store the results found in the database that we want to send back(id, fn, and ln)
          var id = -1;
          var fn = '';
          var ln = '';
      
          // if results found, obtain from array and store in the init. variables 
          if( results.length > 0 ) {
            id = results[0]._id;
            fn = results[0].firstName;
            ln = results[0].lastName;
            
            // Return what we just stored in our vars, id, fn, ln 
            var ret = { _id:id, firstName:fn, lastName:ln, error:''};
            return res.status(200).json(ret);
          }
      
          // User not found 
          var ret = { error: "User not found/incorrect username or password" };
          return res.status(401).json(ret);
      
        } 
      
        catch (error) {
          console.error("Error during login:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      
      });






// TODO: REMOVE (Currently to be used as reference)
app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
	
  const { userId, card } = req.body;

  const newCard = {Card:card,UserId:userId};
  var error = '';

  try
  {
    const db = client.db("COP4331Cards");
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }

  cardList.push( card );

  var ret = { error: error };
  res.status(200).json(ret);
});


// TODO: REMOVE (Currently to be used as reference)
app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();
  
  const db = client.db("COP4331Cards");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

