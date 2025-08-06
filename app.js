const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs', ejsMate);


const port=3000;
app.listen(port,()=>{
    console.log(`app is listening at ${port}`);
})



app.get('/', (req, res) => {
    res.render('home', {
        title: 'University Management System',
        path: req.path,
        user: req.user || null,
        features: [
            {
                icon: '#fa-user-graduate',
                title: 'Student Management',
                description: 'Comprehensive student records and progress tracking'
            },
            {
                icon: '#fa-chalkboard-teacher',
                title: 'Faculty Portal',
                description: 'Tools for faculty to manage courses and student interactions'
            },
            {
                icon: '#fa-book',
                title: 'Course Management',
                description: 'Complete control over curriculum and course offerings'
            }
        ]
    });
});