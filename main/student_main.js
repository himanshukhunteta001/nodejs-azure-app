const Student = require('../models/Student');

//Student result check functionality
const check_result_get = (req, res) => {
    try {
        res.render('student_login');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }


};

const check_result_post = async (req, res) => {
    try {
        const { rollNumber, dob, marks } = req.body;
        const student = await Student.findOne({ rollNumber, dob });

        if (student) {
            console.log(student);
            // res.render('student_result', { individual: student });
            if (student.marks >= 33) {
                res.render('student_result', { individual: student, message: 'Congratulation! you have cleared the exam.' });
            }
            else {
                res.render('student_result', { individual: student, message: 'You have been failed. Better luck next time.' });
            }
        }
        else {

            res.render('student_login', { message: "Invalid Roll Number or Date of Birth, Please try again." });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    check_result_post,
    check_result_get,
}