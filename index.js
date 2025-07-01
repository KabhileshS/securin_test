const express=require('express');
const port=3000
const app=express()
const cors=require('cors')
app.use(express.json())
app.use(cors())
const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://kabhilesh14:kabhilesh14@cluster0.psjy1hg.mongodb.net/securin', {})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

const model=require('./model')

app.get("/api/recipes",async (req,res)=>{
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    const startIndex=(page-1)*limit;
    const recipe=await model.find({}, { _id: 0 }).skip(startIndex).limit(limit);
    // console.log(page+limit);
    res.json(recipe.sort((a,b)=> a.rating<b.rating?1:-1))
})

app.get("/api/count",(req,res)=>{
    const recipe= model.find()
    
})


app.get("/api/search",async (req,res)=>{
    const calories = req.query.calories;
    const title = req.query.title;
    const rating = req.query.rating;
    const total_time = req.query.total_time ;

    let query = {};

    if (calories) {
        const calorieLimit = parseInt(calories.replace(/[^0-9]/g, ''));
        if (calories.includes("<=")) {
            query['nutrients.calories'] = { $lte: calorieLimit + " kcal" };
        } else if (calories.includes(">=")) {
            query['nutrients.calories'] = { $gte: calorieLimit + " kcal" };
        } else if (calories.includes(">")) {
            query['nutrients.calories'] = { $gt: calorieLimit + " kcal" };
        } else if (calories.includes("<")) {
            query['nutrients.calories'] = { $lt: calorieLimit + " kcal" };
        } else {
            query['nutrients.calories'] = calorieLimit + " kcal";
        }
    }

    if (title) {
        query.title = { $regex: title, $options: 'i' }; 
    }
    if (total_time) {
        const timeLimit = parseInt(total_time.replace(/[^0-9]/g, ''));
        if (total_time.includes("<=")) {
            query.total_time = { $lte: timeLimit };
        } else if (total_time.includes(">=")) {
            query.total_time = { $gte: timeLimit };
        }  else if (total_time.includes("<")) {
            query.total_time = { $lt: timeLimit };
        } else if (total_time.includes(">")) {
            query.total_time = { $gt: timeLimit };
        }  else {
            query.total_time = timeLimit;
        } 
    }

    if (rating) {
        if(rating.includes("<=")){
            const ratingLimit = parseFloat(rating.replace(/[^0-9]/g, ''));
            query.rating = { $lte: ratingLimit };
        }
        else if(rating.includes(">=")){
            const ratingLimit = parseFloat(rating.replace(/[^0-9]/g, ''));
            query.rating = { $gte: ratingLimit };
        }
        else if(rating.includes("<")){
            const ratingLimit = parseFloat(rating.replace(/[^0-9]/g, ''));
            query.rating = { $lt: ratingLimit };
        }
        else if(rating.includes(">")){
            const ratingLimit = parseFloat(rating.replace(/[^0-9]/g, ''));
            query.rating = { $gt: ratingLimit };
        }
        else{
            const ratingLimit = parseFloat(rating.replace(/[^0-9]/g, ''));
            query.rating = ratingLimit ;
        }
    }

    const recipes = await model.find(query,{ _id: 0 });


    res.json(recipes);
})


app.listen(port,()=>{
    console.log("Running successfully")
})









// app.get("/api/search", async (req, res) => { http://localhost:3000/api/search?rating=4&calories=%3E=127
//     const calories = req.query.calories;
//     const title = req.query.title;
//     const rating = req.query.rating;

//     // Initialize the query object
//     let query = {};

//     // Filter by calories if provided
//     if (calories) {
//         const calorieLimit = parseInt(calories.replace(/[^0-9]/g, '')); // Extract numeric value
//         query.calories = { $lte: calorieLimit }; // Less than or equal to
//     }

//     // Filter by title if provided
//     if (title) {
//         query.title = { $regex: title, $options: 'i' }; // Case insensitive search
//     }

//     // Filter by rating if provided
//     if (rating) {
//         const ratingLimit = parseFloat(rating.replace(/[^0-9.]/g, '')); // Extract numeric value
//         query.rating = { $gte: ratingLimit }; // Greater than or equal to
//     }

//     // Fetch filtered recipes from the database
//     const recipes = await model.find(query);

//     // Return the filtered recipes
//     res.json(recipes);
// });
