const express = require("express");
const teacher_Routes = require("./routes/teacher_routes");
const student_Routes = require("./routes/student_routes");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const path = require('path');
const cookies = require('cookie-parser');

const app = express();
const port = 8081;

//Connection to mongodb  
mongoose.connect(
	"mongodb+srv://demofortechhub:aKaL7L713Vb3Kqia@tester.tfpiuqv.mongodb.net/?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("databse connected successfully."));

//view engine
app.set('view engine', 'ejs');

app.use(cookies());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/views/images', express.static('./views/images'));


//routes
app.use('/teacher', teacher_Routes);
app.use('/student', student_Routes);



//main route
app.get('/', (req, res) => {
	if (req.cookies.userCookie = 'true') {
		res.render('teacher_student');

	}
	else {
		res.redirect("/teacher/login");
	}

})

app.listen(port, () => {
	console.log("server is running");
})
