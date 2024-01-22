const express = require("express");
const router = express.Router();
const teacher_main = require("../main/teacher_main");


router.get('/login',teacher_main.teacher_login_functionality);

router.post('/login',teacher_main.teacher_authenticate_functionality);

router.get('/students', teacher_main.teacher_get_added_student);

router.post('/add', teacher_main.teacher_post_student);

router.get('/getallstudents',teacher_main.teacher_get_all_student);

router.post('/updatestudent/:id',teacher_main.teacher_update_student);

router.get('/updatestudent/:id',teacher_main.teacher_get_update_student);

router.get('/deletestudent/:id',teacher_main.teacher_delete_student);

router.get('/logout',teacher_main.teacher_logout_functionality);

module.exports = router;
