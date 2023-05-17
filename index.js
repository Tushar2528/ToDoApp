// Require the express module, specify port,require path to specify relative path, require parser to convert data to desired format


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 8000;


//Require the DB and configure 



const db = require('./config/mongoose');
const Todo = require('./models/todo');


// Fire up the express app
const app = express();



// Set the view engine as ejs
app.set('view engine', 'ejs');

//Link the path of views folder to current directory
app.set('views', path.join(__dirname, 'views'));

//Use parser to convert data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());

//Use static to link the .css, .js files(in the assets folder) to the home.ejs file
app.use(express.static('assets'));




/* Array to use if databse is not required in the project

var todolist = [
    {
        description : "Go to gym",
        category : "Excersise",
        date : "20/11/2023"
    },
    {
        description : "Learn atleast 3 instruments",
        category : "Personal",
        date : "20/11/2023"
    },
    {
        description : "Complete the projects",
        category : "Work",
        date : "20/11/2023"
    }
];

*/






// **************************Rendering home.ejs file on the web**************************************



app.get('/', function(req, res){

    Todo.find({})
    .then(function(todos){
        return res.render('home',{
            title : "My Page",
            todolist : todos,
        });
    });

});



// Sample file to render on a nested URL

app.get('/practice', function(req, res){
    return res.render('practice');
});


// ****************Handling adding a single task at once with MongoDB*************************



app.post('/add_todo', function(req, res) {
    if (req.body.action === 'add') {

        Todo.create({
            description : req.body.description,
            category : req.body.category,
            date : req.body.date,
        })
        .then(function(newTodo){
            console.log("****************", newTodo);
            return res.redirect('back');
        })
        .catch(function(err){
            console.log('Error in creating  a new Todo!!');
            return;
        });
      


    // *******************************Handle add task without using DB*******************************




    //   const newTodo = {
    //     description: req.body.description,
    //     category: req.body.category,
    //     date: req.body.date,
    //   };
  
    //   todolist.push(newTodo);

 
    } 
    
    
    else if (req.body.action === 'delete') {


      // ********************************Handle delete all tasks at once using the DB***************************


      Todo.deleteMany({})
      .then(function(){
        console.log("Deleted list Successfully!!");
        return res.redirect('/');
      });
  
      
    }
  });
  

// **************************Handling deletion of one task at a time***************************************



app.get('/delete-item/', function(req, res){

    // get ID from the query in checkbox
    let id = req.query.id;


    //find the todo with the id in db and delete it

    Todo.findByIdAndDelete(id)
    .then(function(){
        return res.redirect('back');
    })
    .catch(function(err){
        console.log('Error in deleting the todo item');
        return;
    });






    //****************************Handling deletion of one task at a time without using DB**************************

    // let des = req.query.description;

    // let itemIndex = todolist.findIndex(item => item.description == des);

    // if (itemIndex != -1){
    //     todolist.splice(itemIndex, 1);
    // }

    // return res.redirect('back');


});




// Firing the express listener
app.listen(port,function(err){
    if (err){
        console.log("there is an error");
    }
    console.log("Server is up and running!");
})