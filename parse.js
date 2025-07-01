const express=require('express');
const port=3000
const app=express()
app.use(express.json())

const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://kabhilesh14:kabhilesh14@cluster0.psjy1hg.mongodb.net/securin', {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));


const jsonObject = require('./US_recipes_null.json');

const model=require('./model')

for(var i in jsonObject){
    
    const {cuisine,title,rating,prep_time,cook_time,total_time,description,nutrients,serves} = jsonObject[i];
    // console.log(cuisine);
    const recipe=new model({
        cuisine: cuisine,
        title: title,
        rating: rating,
        prep_time:prep_time,
        cook_time:cook_time,
        total_time:total_time,
        description:description,
        nutrients: nutrients,
        serves:serves
    })
    try{
        recipe.save();
        console.log("added ",i);
    }
    catch(e){
        console.error(e);
    }

}
console.log("finished ")
