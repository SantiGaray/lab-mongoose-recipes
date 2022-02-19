const mongoose = require('mongoose');
require('dotenv').config(); //require('dotenv/config')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.6fts6.mongodb.net/recipe-app`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    Recipe.deleteMany() // Before adding any recipes to the database, let's remove all existing ones
    .then(() => {
      Recipe.insertMany(data)
      /*.then((recipe) => {
      data.forEach((recipe) => {console.log(recipe.title);})
      })*/
      .then(() => {
        Recipe.findOneAndUpdate(
          {title: "Rigatoni alla Genovese"}, 
          {$set: {duration: 100}},
          { new: true }
        )
        .then((response) => {console.log(response)})
        .then(() => {
          Recipe.deleteOne({title:"Carrot Cake"})
          .then((response) => {console.log(response)})
        })
      })
    })
  })
   





// Recipe.create({
//         title: "Asado",
//         level: "Easy Peasy",
//         ingredients: [
//           "vacio",
//           "molleja",
//           "entraña",
//           "costillar",
//           "matambrito",
//           "provoleta",
//           "chorizo",
//           "morcilla"  
//         ],
//         cuisine: "Argentinian",
//         dishType: "main_course",
//         image:
//           "https://rinconrecetas.com/wp-content/uploads/2014/10/parrilla.jpg",
//         duration: 120,
//         creator: "Gaucho",
//       });