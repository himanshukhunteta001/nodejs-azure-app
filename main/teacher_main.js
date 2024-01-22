const config = require("../config/config");


const Student = require("../models/Student");

//Login functionality for the teacher using cookie
const teacher_login_functionality = (req, res) => {
    try {
        res.render('login');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}

const teacher_authenticate_functionality = async (req, res) => {
    const { username, password } = req.body;
    try {

        if (username == config.username && password == config.password) {
        
            res.cookie('userCookie', 'true');
            const findstudent = await Student.find();
            res.render('getStudent', { students: findstudent,success_message:"Login Successfull!" });

        }
        else {
            res.render('login', { message: "Invalid username or password, Please try again." })
        }
    }

    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};

//Logout Functionality of the teacher

const teacher_logout_functionality = async (req, res) => {
    try {
        if (req.cookies.userCookie == 'true') {
            res.clearCookie('userCookie');
            res.render('teacher_student');
        }
        else {
            res.redirect("back");
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};


//Add the new student data functionality

const teacher_get_added_student = (req, res) => {
    try {
        if (req.cookies.userCookie == 'true') {
            res.render('addingStudent',{success_message:''});
        }
        else {
            res.render('teacher_student');
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}

const teacher_post_student = async (req, res) => {
    const { name, rollNumber, dob, marks } = req.body;
    try {
        const existing_student = await Student.findOne({ rollNumber });
        if (existing_student) {
            return res.render('addingStudent', { message: "Roll Number is already exist"  });
        }
        await Student.create(req.body);
        const allStudents = await Student.find();
        return res.redirect('/teacher/getallstudents');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');

    }
};

//Get all students from the database

const teacher_get_all_student = async (req, res) => {
    try {
        if (req.cookies.userCookie == 'true') {
            const allStudents = await Student.find();
            res.render('getStudent', { students: allStudents });
        }
        else {
            res.render('teacher_student');
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};

//Update student data

const teacher_get_update_student = async (req, res) => {
    try {
        if (req.cookies.userCookie == 'true') {
            const student = await Student.findById(req.params.id)
            res.render('update', { student: student });
        }
        else {
            res.render('teacher_student');
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }

};

const teacher_update_student = async (req, res) => {
    const { name, rollNumber, dob, marks } = req.body;  
    try {
        const student = await Student.findById(req.params.id)
        const existing_student = await Student.findOne({ rollNumber, _id: { $ne: student }  });
        if (existing_student) {
            return res.render('update', { student: student, message: "Roll Number is already exist" });

        }
        await Student.findByIdAndUpdate(student, req.body, { new: true });
        const students = await Student.find(); 
        console.log(req.body);
        return res.redirect('/teacher/getallstudents');

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};



//Delete student data 

const teacher_delete_student = async (req, res) => {
    try {
        if (req.cookies.userCookie == 'true') {
            const student = await Student.findByIdAndDelete(req.params.id)
            res.redirect('/teacher/getallstudents');
        }
        else {
            res.render('teacher_student');
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    teacher_login_functionality,
    teacher_authenticate_functionality,
    teacher_get_added_student,
    teacher_post_student,
    teacher_get_all_student,
    teacher_update_student,
    teacher_get_update_student,
    teacher_delete_student,
    teacher_logout_functionality,

};