const express  = require("express");
const router = express.Router();
const studentController = require("../controllers/studentsController");

//home page to view all details
router.get('/',studentController.view);

//add user details
router.get('/addusers',studentController.addusers);
router.post('/addusers',studentController.save);

//edit user details
router.get('/edituser/:id',studentController.edituser);
router.post('/edituser/:id',studentController.edit);

//delete records
router.get('/deleteuser/:id',studentController.deleteuser);

module.exports=router;