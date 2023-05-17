const mongoose = require('mongoose');


//Defining the schema in the DB
const todo_schema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }
});

// Defining what would be the name of the array/list in the database
const Todo = mongoose.model('Todo', todo_schema);


//exporting the module
module.exports = Todo;
