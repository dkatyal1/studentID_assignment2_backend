var express = require('express');
var app = express();
var Employee = require('./dbUtil');
var bodyParser = require('body-parser'); 
var cors = require("cors"); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
/*app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
 });
 */

app.delete('/api/vi/employees/:id',async (req,res) => {
	console.log("Inside Delete");
	console.log( req.params.id);
    try{
       const emp = await Employee.deleteMany( {"Id": req.params.id})
      if ((await emp.deletedCount) === 0) 
        return res.status(404).send()
        res.status(200).send(emp)
    }catch(e){
        res.status(500).send(e.message)
    }
})

app.post('/api/vi/employees', async (req,res) => {
	console.log(req.body);
    const emp = new Employee(req.body); 
	try{
        await emp.save()
        res.status(201).send(emp)
    }catch(e){
        res.status(400).send(e.message)
    }
})


app.get('/api/vi/employees', async (req, res) => {
  // console.log("Got a GET request for /list_user");
  console.log("inside all");
   try{
        const emps = await Employee.find({})
        if ((await emps.count) === 0) 
        return res.send(emps)
        res.send(emps)
    }catch(e){
        res.send(emps)
    }
})


app.get('/api/vi/employees/:id',async (req,res) => {
    console.log(req.params.id);	
	console.log("inside get");
    try{
        const emp = await Employee.find( {"Id": req.params.id})
        if ((await emp.count) === 0) 
        return res.status(404).send()
        res.status(200).send(emp)
    }catch(e){
        res.status(500).send(e.message)
    }
})

app.put('/api/vi/employees/:id',async (req,res) => {    
	console.log("inside put");
	console.log(req.body);
	console.log(req.params.id);	
    try{
        const emp = await Employee.updateMany( {"Id": req.params.id},{ $set: req.body}, { new: true, runValidators: true })
        if ((await emp.matchedCount) === 0) 
        return res.status(404).send("No Match Count.")
        res.status(200).send(emp)
    }catch(e){
        res.status(500).send(e.message)
    }
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})