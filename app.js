const express = require("express");
const path = require("path"); 
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance'); //Datastore name ContactDance 
}
const port = 8000;

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema); // Schema name Contact

// For serving static files
app.use('/static', express.static('static')) 
app.use(express.urlencoded())


app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res)=>{ 
    res.status(200).render('contact.pug');
})


app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.redirect("/")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});