const express = require('express');
const router = express.Router();
const student_main = require('../main/student_main');


router.get('/checkresult',student_main.check_result_get);

router.post('/checkresult',student_main.check_result_post);

module.exports = router;