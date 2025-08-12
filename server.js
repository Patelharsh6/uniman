const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const { title } = require("process");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs', ejsMate);


const port=3000;
app.listen(port,()=>{
    console.log(`app is listening at ${port}`);
})



app.get('/', (req, res) => {
    res.render('home',{title:"harsh"});
});