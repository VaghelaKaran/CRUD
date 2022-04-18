var express = require('express');
var router = express.Router();
var multer=require('multer');
var db = require('../db');
var uuid = require('uuid');


router.get('/', function(req, res, next) {

  var query = 'select * from employee';
  db.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.render('index', {Employees: rows});
  })
});

router.get('/AddEmp', function(req, res, next) {
  res.render('Add');
});

router.get('/Cancel', function(req, res, next) {
  res.render('index');
});




router.post('/submit', function(req, res) {
  if (!req.files) {
    res.send("No file upload")
 } else {
     var file = req.files.image //
     console.log(file);
     if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
      var imageName = file.name
      console.log(imageName)
      var uuidname = uuid.v1(); // this is used for unique file name
      var imgsrc = 'http://127.0.0.1:3000/images/' + uuidname + file.name
  }
 }
 
  var Name = req.body.Name;
  var Email = req.body.Email;
  var Mobile_No = req.body.Mobile_No;
  var Profile = imgsrc;
  // console.log(pic);
  console.log(Name);
  console.log(Email);
  console.log(Mobile_No);

      var sql = `INSERT INTO employee (Name, Email, Mobile_No,Profile) VALUES ("${Name}", "${Email}", "${Mobile_No}","${Profile}")`;
         db.query(sql, function(err, result) {
              if (err) throw err;
              file.mv('public/images/' + uuidname + file.name)
                 console.log('record inserted');
               res.redirect('/');
  });
        
});


 
router.get('/edit-form/:EId', function(req, res, next) {
  var EId  = req.params.EId;
  console.log(req.params)
  var sql = `SELECT * FROM employee WHERE EId=${EId}`;
  db.query(sql, function(err, rows, fields) {
      res.render('Edit', { Employee: rows[0]});
      console.log(rows[0].Name);
  });
});

router.post('/edit/:EId', function(req, res, next) {
  
  if (!req.files) {
    res.send("No file upload")
 } else {
     var file = req.files.image //
     console.log(file);
     if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
      var imageName = file.name
      console.log(imageName)
      var uuidname = uuid.v1(); // this is used for unique file name
      var imgsrc = 'http://127.0.0.1:3000/images/' + uuidname + file.name
  }
 }
  var Name = req.body.Name;
  var Email = req.body.Email;
  var Mobile_No = req.body.Mobile_No;
  var Profile = imgsrc;
  // console.log(Profile)

  var EId  = req.params.EId ;
  var sql = `UPDATE employee SET Name="${Name}", Email="${Email}", Mobile_No="${Mobile_No}" , Profile="${Profile}" WHERE EId=${EId}`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    file.mv('public/images/' + uuidname + file.name)
    console.log('record updated!');
    res.redirect('/');
  });
});

router.get('/delete/:EId', function(req, res){
  var EId = req.params.EId;
  console.log(EId);
  var sql = `DELETE FROM employee WHERE EId=${EId}`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record deleted!');
    res.redirect('/');
  });
});
module.exports = router;