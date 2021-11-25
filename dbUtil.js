// getting-started.js

const mongoose = require('mongoose');
const assert = require('assert');


main().catch(err => console.log(err));	

async function main() {
  await mongoose.connect('mongodb://localhost:27017/studentid_assignment2');
}
const employeeSchema = new mongoose.Schema({
   Id: { type: String, required: [true, 'Id required'] } 
  ,firstname: { type: String, required: [true, 'firstname required'] } 
  ,lastname: { type: String, required: [true, 'lastname required'] } 
  ,emailid: { type: String, required: [true, 'emailid required'] ,   validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!.'Please fill a valid email address'`
    }, } 
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee